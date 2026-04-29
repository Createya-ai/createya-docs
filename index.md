---
layout: home
title: Createya Docs
description: Все нейросети мира через один API. Без VPN. Оплата в рублях. 100 кредитов бесплатно.

hero:
  name: Createya Docs
  text: Мир нейросетей без границ.
  tagline: Все нейросети через один API. Без VPN. Оплата в рублях. 100 кредитов бесплатно при регистрации.
  image:
    src: /favicon.svg
    alt: Createya
  actions:
    - theme: brand
      text: Начать за 60 секунд
      link: /quickstart
    - theme: alt
      text: Каталог моделей
      link: /models/
    - theme: alt
      text: Получить ключ →
      link: https://createya.ai/settings/api-keys

features:
  - icon: 📡
    title: REST API
    details: Стандартный HTTP — POST /v1/run с { model, input }. Примеры на curl, Python, Node.js, Go.
    link: /api/rest
    linkText: Документация
  - icon: 🤖
    title: MCP-сервер
    details: Подключи Createya к Claude, Cursor, Cline, Windsurf, Codex или своему агенту через MCP протокол.
    link: /quickstart
    linkText: Quickstart
  - icon: 🛡️
    title: Без VPN
    details: Серверы доступны напрямую. Поддерживается оплата картами РФ, СБП и Т-Pay.
  - icon: 🎁
    title: 100 кредитов
    details: Бесплатно при регистрации. Хватит протестировать все основные модели.
    link: https://createya.ai
    linkText: Зарегистрироваться
---

## Популярные сценарии

| Сценарий | Подходящие модели | Подробнее |
|---|---|---|
| 🎨 **Генерация изображений** | FLUX 2, Nano Banana 2, GPT Image 2, Midjourney, Recraft, Ideogram | [text-to-image →](/models/) |
| 🎬 **Анимация фотографий** | Kling Video, Runway Gen-4, Veo 3.1, Hailuo | [image-to-video →](/models/) |
| 📱 **Контент для соцсетей** | Reels / Shorts / TikTok creatives | [Все модели →](/models/) |
| 📺 **Маркетинговая реклама** | Креативы за минуты, не недели | [Все модели →](/models/) |

## Быстрый пример

### curl — первая генерация
```bash
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

### Python — client за 5 строк
```python
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

- 📖 [60-секундный quickstart](/quickstart) — от нулевой регистрации до первой картинки
- 🔑 [Авторизация](/authentication) — формат `crya_sk_live_*`, OAuth для Claude.ai
- 📡 [REST API Reference](/api/rest) — полная спецификация эндпоинтов
- 🎨 [Каталог моделей](/models/) — image + video + auto-sync
