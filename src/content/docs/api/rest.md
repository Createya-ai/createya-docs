---
title: REST API Reference
description: Полная спецификация Createya REST API — POST /v1/run, GET /v1/models, async polling, ошибки.
sidebar:
  order: 1
---

## Endpoints

| Метод | URL | Что делает |
|---|---|---|
| `GET` | [`/v1/models`](/api/models/) | Каталог моделей с `parameters_schema` |
| `POST` | [`/v1/run`](/api/run/) | Запустить генерацию |
| `GET` | [`/v1/runs/{run_id}`](/api/runs/) | Статус async-задачи |
| `GET` | [`/v1/balance`](/api/balance/) | Баланс кредитов |
| `POST` | [`/v1/uploads`](/api/uploads/) | Загрузить картинку/видео в CDN для image-to-image |
| `GET` | `/v1/openapi.json` | OpenAPI 3.1 спека для автогенерации SDK |

**Base URL:** `https://api.createya.ai`
**Auth:** `Authorization: Bearer crya_sk_live_...`
**Content-Type:** `application/json`

## Sync vs async

В зависимости от модели генерация бывает синхронной или асинхронной:

| Категория | Mode | Поведение |
|---|---|---|
| Image, короткий текст | `sync` | `POST /v1/run` ждёт результат, возвращает `status: "completed"` сразу |
| Video, длинная музыка | `async` | `POST /v1/run` возвращает `202 Accepted` с `run_id`. Polling через `/v1/runs/{id}` |

Mode конкретной модели — в `mode` поле каталога `/v1/models`.

## Стандартный response shape

```json
{
  "run_id": "run_01HZX...",
  "status": "queued | processing | completed | failed",
  "output": {
    "urls": ["https://cdn-new.createya.ai/..."],
    "url": "https://cdn-new.createya.ai/...",
    "text": "..."
  },
  "error": {
    "code": "model_not_found",
    "message": "..."
  }
}
```

`output.urls[]` — для моделей с массивом результатов (например 4 варианта картинки).
`output.url` — одиночный output (одно видео).
`output.text` — текстовые модели.

## OpenAPI 3.1

Машиночитаемая спека для автогенерации Python/TS/Java/Ruby SDK:

```bash
curl https://api.createya.ai/v1/openapi.json
```

## Машиночитаемые ресурсы

- `https://api.createya.ai/llms.txt` — карта API для AI-агентов (стандарт llmstxt.org)
- `https://api.createya.ai/v1/openapi.json` — OpenAPI 3.1
- `https://api.createya.ai/.well-known/mcp` — MCP server descriptor

## Дальше

- [POST /v1/run](/api/run/) — запуск генерации с примерами на curl/Python/Node.js/Go
- [GET /v1/models](/api/models/) — каталог
- [Коды ошибок](/api/errors/) — полный список + что делать
