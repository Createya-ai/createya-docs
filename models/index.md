---
title: Каталог моделей
description: Все image-модели Createya — генерация через единый API. Цены, slug, примеры.
---

# Каталог моделей

> Этот каталог автоматически синхронизируется раз в неделю с live-эндпоинтом [`/v1/models`](https://api.createya.ai/v1/models).

## Image-модели (5 публичных)

| Модель | Slug для `model:` | Цена | Подробнее |
|---|---|---|---|
| **Nano Banana 2** (T2I) | `nano-banana-2` | 10 кр / запрос | [→](/models/nano-banana-2) |
| **Nano Banana 2 Edit** (I2I) | `nano-banana-2-edit` | 10 кр / запрос | [→](/models/nano-banana-2-edit) |
| **Nano Banana Pro** (T2I) | `nano-banana-pro` | 18 кр / запрос | [→](/models/nano-banana-pro) |
| **GPT Image 2** (T2I) | `gpt-image-2` | 2 кр / запрос | [→](/models/gpt-image-2) |
| **GPT Image 2 Edit** (I2I) | `gpt-image-2-edit` | 2 кр / запрос | [→](/models/gpt-image-2-edit) |

## Video-модели

В работе — открытие публичного доступа к флагманам:
- **Sora 2** (OpenAI flagship)
- **Veo 3.1** / Veo 3.1 Fast (Google)
- **Kling Video O3 / V3 / 4K** (китайская топ-модель)
- **Seedance 2.0** (ByteDance)
- **Happy Horse 1.0** (Alibaba)
- **Hailuo 2.3** (MiniMax)

После открытия они появятся здесь автоматически на следующем понедельном sync.

## Coming soon в image

После открытия публичного доступа: **FLUX 2 Pro** / Flux Kontext, **Kling Image O3**, **Higgsfield Soul**, **Midjourney**, **Runway Gen-4**, **Recraft V3**, **Ideogram V3**, **Imagen 4 Ultra**, **Seedream V5**, **Wan 2.7 Pro**, **Grok Imagine** и др.

## Запрос актуального каталога через API

```bash
curl https://api.createya.ai/v1/models | jq '.data[] | { id, name, output_type, credits_per_request, pricing }'
```

Через MCP:
```
createya:list_models()
```

## Маркетинговые описания моделей

Полный обзор каждой модели с примерами и видеодемо — на сайте: [**createya.ai/knowledge**](https://createya.ai/knowledge).
