---
title: Createya Docs
description: Все нейросети мира через один API. Без VPN. Оплата в рублях. 100 кредитов бесплатно.
template: splash
hero:
  tagline: Все нейросети мира через один API. Без VPN. Оплата в рублях.
  image:
    alt: Createya — мир нейросетей без границ
    file: ../../assets/logo-dark.svg
  actions:
    - text: Начать за 60 секунд
      link: /quickstart/
      icon: rocket
      variant: primary
    - text: Каталог моделей
      link: /models/
      icon: external
    - text: Получить ключ
      link: https://createya.ai/settings/api-keys
      icon: external
      variant: secondary
---

import { Card, CardGrid, LinkCard } from '@astrojs/starlight/components';

## Что такое Createya

**Createya** — AI-платформа, объединяющая 100+ нейросетей (FLUX, Sora 2, Veo 3.1, Kling, Runway, Midjourney, Suno) в едином API. Разработчики получают **один Bearer-токен** и обращаются к любой модели — без отдельных подписок, без зарубежных карт, без VPN.

<CardGrid>
  <Card title="REST API" icon="seti:json">
    Стандартный HTTP — `POST /v1/run` с `{ model, input }`. Примеры на curl, Python, Node.js, Go.
  </Card>
  <Card title="MCP-сервер" icon="puzzle">
    Подключи Createya к Claude, Cursor, Cline, Windsurf, Codex или своему агенту через MCP протокол.
  </Card>
  <Card title="Без VPN" icon="approve-check">
    Серверы доступны напрямую. Поддерживается оплата картами РФ, СБП и Т-Pay.
  </Card>
  <Card title="100 кредитов" icon="rocket">
    Бесплатно при регистрации. Хватит протестировать все основные модели.
  </Card>
</CardGrid>

## Популярные сценарии

<CardGrid>
  <LinkCard
    title="Генерация изображений"
    href="/use-cases/text-to-image/"
    description="FLUX, Nano Banana, Midjourney, Recraft через один POST-запрос."
  />
  <LinkCard
    title="Анимация фотографий"
    href="/use-cases/image-to-video/"
    description="Превращение статичной картинки в видео через Kling, Runway, Veo."
  />
  <LinkCard
    title="Контент для соцсетей"
    href="/use-cases/social-content/"
    description="Reels, шортсы, клипы для Instagram, TikTok, YouTube Shorts."
  />
  <LinkCard
    title="Маркетинговая реклама"
    href="/use-cases/marketing-ads/"
    description="Креативы для рекламных кампаний за минуты, не недели."
  />
</CardGrid>

## Быстрый пример

```bash title="curl: первая генерация"
curl -X POST https://api.createya.ai/v1/run \
  -H "Authorization: Bearer crya_sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-2",
    "input": {
      "prompt": "кот на луне в стиле Studio Ghibli",
      "aspect_ratio": "16:9"
    }
  }'
```

```python title="Python: client за 5 строк"
import os, requests

KEY = os.environ["CREATEYA_API_KEY"]
r = requests.post(
    "https://api.createya.ai/v1/run",
    headers={"Authorization": f"Bearer {KEY}"},
    json={"model": "nano-banana-2", "input": {"prompt": "кот на луне"}}
)
print(r.json()["output"]["urls"][0])
```

## Дальше

- 📖 [60-секундный quickstart](/quickstart/) — от нулевой регистрации до первой картинки
- 🔑 [Авторизация](/authentication/) — формат `crya_sk_live_*`, OAuth для Claude.ai
- 📡 [REST API Reference](/api/rest/) — полная спецификация эндпоинтов
- 🤖 [MCP Integration](/mcp/overview/) — Claude / Cursor / Cline / Windsurf / Codex
- 🎨 [Каталог моделей](/models/) — image + video, со SEO-страницами под каждую
