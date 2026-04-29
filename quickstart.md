---
title: Quickstart за 60 секунд
description: Регистрация, ключ, первый POST — и готовая картинка за минуту.
sidebar:
  order: 2
---

## 1. Зарегистрируйся

[createya.ai](https://createya.ai) → email или Telegram. На старте начисляется **100 кредитов** бесплатно.

## 2. Получи API-ключ

[createya.ai/settings/api-keys](https://createya.ai/settings/api-keys) → **Create new key**.

Формат ключа: `crya_sk_live_<32hex>`. Показывается **один раз** — сохрани в свой secret manager.

```bash
export CREATEYA_API_KEY="crya_sk_live_abc123..."
```

## 3. Выбери путь

### 🤖 Если ты строишь AI-агента → MCP

Подключи [`https://api.createya.ai/mcp`](/mcp/overview/) к Claude, Cursor, Cline, Windsurf или Codex. Подробные инструкции для каждого клиента — в разделе [MCP Integration](/mcp/overview/).

### 💻 Если ты пишешь свой код → REST

```bash title="curl"
curl -X POST https://api.createya.ai/v1/run \
  -H "Authorization: Bearer $CREATEYA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-2",
    "input": {
      "prompt": "кот на луне в стиле Studio Ghibli",
      "aspect_ratio": "16:9"
    }
  }'
```

**Ответ:**

```json
{
  "run_id": "run_01HZX...",
  "status": "completed",
  "output": {
    "urls": ["https://cdn-new.createya.ai/image/.../abc123.png"]
  }
}
```

## 4. Async-задачи (видео и музыка)

Видео-модели возвращают `202 Accepted` с `run_id`. Опрашивай статус каждые 10 секунд:

```bash
curl https://api.createya.ai/v1/runs/$RUN_ID \
  -H "Authorization: Bearer $CREATEYA_API_KEY"
```

Когда статус становится `completed` — `output.url` содержит готовое видео.

## Что дальше

- [Авторизация](/authentication/) — детали про ключи и rate limits
- [REST API Reference](/api/rest/) — полная спецификация
- [Каталог моделей](/models/) — что можно генерить
- [MCP Integration](/mcp/overview/) — для AI-агентов
