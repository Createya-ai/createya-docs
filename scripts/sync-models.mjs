#!/usr/bin/env node
/**
 * sync-models.mjs
 *
 * Тянет актуальный каталог моделей из api.createya.ai/v1/models, сшивает с
 * данными из knowledge_base (через REST к Supabase) и генерит per-model
 * MDX страницы в src/content/docs/models/<slug>.mdx.
 *
 * Запускается:
 *   - Локально: `npm run sync:models` (нужен env CREATEYA_API_KEY)
 *   - В GHA: каждый понедельник (cron) + by webhook от админки
 *
 * После CRE-337 (анонимный /v1/models) ключ будет не нужен.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const API_BASE = process.env.CREATEYA_API_BASE || 'https://api.createya.ai';
const API_KEY = process.env.CREATEYA_API_KEY || '';
const MODELS_DIR = 'models';

// KB-published модели с слоганами + категорией для главных карточек.
// Можно переехать на запрос к knowledge_base через Supabase REST,
// пока — захардкожено (соответствует sitemap.xml на 2026-04-29).
const KB_OVERRIDES = {
  'gpt-image-2-0': { tagline: 'Первая AI, которая думает перед тем как нарисовать', kbUrl: 'https://createya.ai/knowledge/gpt-image-2-0' },
  'nano-banana-2': { tagline: 'Faster. Sharper. Smarter.', kbUrl: 'https://createya.ai/knowledge/nano-banana-2' },
  'kling-image-o3': { tagline: 'Think. Compose. Create.', kbUrl: 'https://createya.ai/knowledge/kling-image-o3' },
  'flux-2': { tagline: 'See More. Create Better.', kbUrl: 'https://createya.ai/knowledge/flux-2' },
  'flux-kontext': { tagline: 'Edit. Refine. Perfect.', kbUrl: 'https://createya.ai/knowledge/flux-kontext' },
  'higgsfield-soul': { tagline: 'Shot, Not Generated.', kbUrl: 'https://createya.ai/knowledge/higgsfield-soul' },
  'midjourney': { tagline: 'Art Beyond Imagination.', kbUrl: 'https://createya.ai/knowledge/midjourney' },
  'gpt-image': { tagline: 'Say It. See It.', kbUrl: 'https://createya.ai/knowledge/gpt-image' },
  'grok-imagine': { tagline: 'Imagine Without Limits.', kbUrl: 'https://createya.ai/knowledge/grok-imagine' },
  'runway-gen4': { tagline: 'From Still to Motion.', kbUrl: 'https://createya.ai/knowledge/runway-gen4' },
  'sora-2': { tagline: 'Imagine. Describe. Watch.', kbUrl: 'https://createya.ai/knowledge/sora-2' },
  'veo': { tagline: 'Think Film. Generate Film.', kbUrl: 'https://createya.ai/knowledge/veo' },
  'veo-fast': { tagline: 'Same Vision. Five Times Faster.', kbUrl: 'https://createya.ai/knowledge/veo-fast' },
  'kling-video-o3': { tagline: 'Reference. Clone. Direct.', kbUrl: 'https://createya.ai/knowledge/kling-video-o3' },
  'kling-video-v3': { tagline: 'Direct. Cut. Create.', kbUrl: 'https://createya.ai/knowledge/kling-video-v3' },
  'kling-video-4k': { tagline: 'Кино-качество в каждом кадре', kbUrl: 'https://createya.ai/knowledge/kling-video-4k' },
  'happy-horse': { tagline: 'Видео №1 в мире. Со звуком. За 10 секунд.', kbUrl: 'https://createya.ai/knowledge/happy-horse' },
  'seedance-2-0': { tagline: 'Кино из одного промпта — звук, кадры, движение', kbUrl: 'https://createya.ai/knowledge/seedance-2-0' },
  'seedance': { tagline: 'Move. Dance. Create.', kbUrl: 'https://createya.ai/knowledge/seedance' },
};

// SEO long-tail keywords под каждое семейство (генерим в meta description)
const SEO_KEYWORDS = {
  flux: 'Flux 2 API на русском, генерация изображений Flux, Flux Kontext редактирование',
  'nano-banana': 'Nano Banana 2 API, быстрая генерация изображений',
  'gpt-image': 'GPT Image 2.0 OpenAI API, генерация картинок DALL-E',
  sora: 'Sora 2 API, OpenAI Sora генерация видео в России',
  veo: 'Veo 3.1 Google API, генерация видео Veo',
  'kling-video': 'Kling Video API, китайская видео-нейросеть',
  seedance: 'Seedance ByteDance API, генерация видео',
  midjourney: 'Midjourney API, художественная генерация изображений',
  'runway-gen4': 'Runway Gen-4 API, кинематограф AI',
  default: 'AI генерация изображений, AI генерация видео, без VPN, в рублях',
};

async function fetchModels() {
  const headers = { 'Accept': 'application/json' };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

  const r = await fetch(`${API_BASE}/v1/models`, { headers });
  if (r.status === 401) {
    console.warn('⚠ /v1/models requires auth (CRE-337 not fully deployed yet).');
    console.warn('⚠ Skipping model page generation — site will build without per-model pages.');
    console.warn('⚠ После открытия публичного /v1/models или с CREATEYA_API_KEY в secrets — модели подтянутся.');
    return null;
  }
  if (!r.ok) {
    throw new Error(`Failed to fetch /v1/models: ${r.status} ${await r.text()}`);
  }
  const json = await r.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}

function familyOf(model) {
  // Family slug = ai_models.slug (group key). В response из gateway это поле может
  // называться 'family' или 'group' — поддерживаем оба.
  return model.family || model.group || model.id?.split('-')[0] || 'unknown';
}

function generateMdx(slug, model, kb) {
  const familyKey = familyOf(model);
  const seo = SEO_KEYWORDS[familyKey] || SEO_KEYWORDS.default;
  const tagline = kb?.tagline ?? model.name ?? slug;
  const description = `${tagline}. Генерация через Createya API — без VPN, оплата в рублях. ${seo}.`;

  const typicalCredits = model.pricing?.typical_price ?? model.pricing?.base_credits ?? model.credits_per_request;
  const pricingDesc = model.pricing?.human_description ?? model.pricing?.description ?? '';
  const pricing = typicalCredits
    ? `**Стоимость:** ${typicalCredits} кредитов / запрос${pricingDesc ? ` (${pricingDesc})` : ''}.`
    : '';

  return `---
title: ${model.name ?? slug}
description: ${description}
sidebar:
  label: ${model.name ?? slug}
---

# ${model.name ?? slug}

${tagline ? `> ${tagline}` : ''}

${pricing}

**Family slug:** \`${familyKey}\` · **Output:** ${model.output_type ?? 'image'} · **Mode:** ${model.mode ?? 'sync'}

${kb?.kbUrl ? `📚 [Полный обзор модели на createya.ai](${kb.kbUrl})` : ''}

## Быстрый старт

### curl

\`\`\`bash
curl -X POST https://api.createya.ai/v1/run \\
  -H "Authorization: Bearer \$CREATEYA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${slug}",
    "input": {
      "prompt": "your prompt"
    }
  }'
\`\`\`

### Python

\`\`\`python
import os, requests
KEY = os.environ["CREATEYA_API_KEY"]
r = requests.post(
    "https://api.createya.ai/v1/run",
    headers={"Authorization": f"Bearer {KEY}"},
    json={"model": "${slug}", "input": {"prompt": "your prompt"}}
)
print(r.json())
\`\`\`

### Node.js

\`\`\`javascript
const r = await fetch("https://api.createya.ai/v1/run", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.CREATEYA_API_KEY}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "${slug}",
    input: { prompt: "your prompt" }
  })
});
console.log(await r.json());
\`\`\`

## Параметры

${renderSchema(model.parameters_schema)}

## Похожие модели

См. [полный каталог](/models/) или [createya.ai/knowledge](https://createya.ai/knowledge).

## Через MCP

\`\`\`
createya:run_model({
  model: "${slug}",
  input: { prompt: "your prompt" }
})
\`\`\`

См. [MCP Integration](/mcp/overview/) для подключения к Claude / Cursor / Cline.
`;
}

function renderSchema(schema) {
  if (!schema || !Array.isArray(schema)) return 'См. [GET /v1/models](/api/models/) для актуального списка параметров.';

  const lines = ['| Параметр | Тип | Required | Описание |', '|---|---|---|---|'];
  for (const p of schema) {
    const req = p.isRequired ? '✓' : '';
    const type = p.type ?? '?';
    const desc = (p.description ?? p.label ?? '').replace(/\|/g, '\\|');
    lines.push(`| \`${p.key}\` | ${type} | ${req} | ${desc} |`);
  }
  return lines.join('\n');
}

async function ensureMinimumIndex() {
  // Если /models пустой — создаём заглушку чтобы Astro не падал на autogenerate
  if (!existsSync(MODELS_DIR)) await mkdir(MODELS_DIR, { recursive: true });
  const stub = `---
title: Каталог моделей
description: Полный каталог AI-моделей Createya — image и video генерация через единый API.
sidebar:
  label: Все модели
---

# Каталог моделей

> ⚠️ Per-model страницы автоматически генерируются раз в неделю из live \`/v1/models\` каталога.
> Сейчас идёт миграция API на публичный режим (CRE-337) — после её завершения этот раздел заполнится.

Пока — актуальный каталог через REST:

\`\`\`bash
curl https://api.createya.ai/v1/models \\
  -H "Authorization: Bearer crya_sk_live_..." | jq
\`\`\`

Или через MCP:

\`\`\`
createya:list_models()
\`\`\`

## Главные семейства моделей (image)

- **FLUX** — Flux 2, Flux Kontext (топ-фотореализм)
- **Nano Banana** — быстрая универсальная генерация
- **GPT Image** — OpenAI flagship
- **Kling Image** — photorealism + люди
- **Higgsfield Soul** — кинематограф
- **Midjourney** — художественный стиль
- **Runway Gen-4** — кинопродакшн

## Главные семейства моделей (video)

- **Sora 2** — OpenAI flagship
- **Veo 3.1** / **Veo 3.1 Fast** — Google flagship
- **Kling Video** — O3 / V3 / 4K (китайская топ-модель)
- **Seedance 2.0** — ByteDance
- **Happy Horse 1.0** — Alibaba
- **Hailuo 2.3** — MiniMax

Подробное описание каждой — [createya.ai/knowledge](https://createya.ai/knowledge).
`;
  await writeFile(path.join(MODELS_DIR, 'index.md'), stub, 'utf8');
}

async function main() {
  const models = await fetchModels();

  // Если API закрыт — генерим только заглушку
  if (!models) {
    await ensureMinimumIndex();
    console.log('\nDone. Models index stub created (API закрыт пока).');
    return;
  }

  const filtered = models.filter(m => ['image', 'video'].includes(m.output_type));

  if (!existsSync(MODELS_DIR)) await mkdir(MODELS_DIR, { recursive: true });

  console.log(`Generating ${filtered.length} model pages...`);
  for (const model of filtered) {
    const slug = model.id || model.slug;
    if (!slug) continue;
    const kb = KB_OVERRIDES[slug] ?? null;
    const mdx = generateMdx(slug, model, kb);
    const filePath = path.join(MODELS_DIR, `${slug}.mdx`);
    await writeFile(filePath, mdx, 'utf8');
    console.log(`  ✓ ${slug}`);
  }

  await ensureMinimumIndex();
  console.log(`\nDone. ${filtered.length} model pages in ${MODELS_DIR}/`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
