# Createya Docs

Публичная документация Createya API — [docs.createya.ai](https://docs.createya.ai).

Стек: **Astro Starlight** + Tailwind. Static build → деплой на PROD VM nginx.

## Локальная разработка

```bash
npm install
npm run dev
# → http://localhost:4321
```

## Структура

```
src/content/docs/
├── index.mdx                 # Hero + overview
├── quickstart.md             # 60-секундный старт
├── authentication.md         # API ключи, Bearer
├── api/
│   ├── rest.md               # Reference overview
│   ├── run.md                # POST /v1/run
│   ├── models.md             # GET /v1/models
│   └── ...
├── mcp/
│   ├── overview.md           # Обзор MCP
│   ├── claude-desktop.md
│   ├── cursor.md
│   └── ...
├── models/                   # ★ AUTO-GEN еженедельно из /v1/models
│   ├── flux-2.mdx
│   ├── sora-2.mdx
│   └── ... (все image+video)
└── use-cases/
    ├── text-to-image.md
    ├── image-to-video.md
    └── ...
```

## Auto-sync моделей

Каждый понедельник 09:00 UTC GitHub Action:

1. Дёргает `GET https://api.createya.ai/v1/models`
2. Запускает `scripts/sync-models.mjs`
3. Генерит `src/content/docs/models/<slug>.mdx` для каждой image+video модели
4. Коммитит изменения если что-то поменялось
5. Билдит сайт
6. Rsync на PROD VM

Триггер по запросу: GitHub Actions → **Build & deploy docs.createya.ai** → **Run workflow**.

## Deploy

PROD VM `158.160.200.216`:
- nginx serve `/var/www/docs.createya.ai/` на `docs.createya.ai`
- Let's Encrypt сертификат через certbot
- Static files (~50MB built site)

## Бренд

- Тёмная тема (как `createya.ai`)
- Цвет: `hsl(189 95% 43%)` ≈ #0ec0d8 (cyan)
- Background: `hsl(220 20% 6%)` ≈ #0c0e12

## Лицензия

MIT — см. [LICENSE](LICENSE).
