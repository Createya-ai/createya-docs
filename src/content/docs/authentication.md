---
title: Авторизация
description: API-ключи Createya, Bearer-заголовок, OAuth для Claude.ai, ротация и безопасность.
sidebar:
  order: 3
---

## API-ключи

Createya использует **Bearer-токены** в заголовке `Authorization`. Формат ключа:

```
crya_sk_live_<32 hex>
```

| Префикс | Назначение |
|---|---|
| `crya_sk_live_` | Production-ключ. Кредиты списываются с workspace, к которому привязан ключ. |

> Тестовые ключи (`crya_sk_test_`) пока не выдаются публично. Для тестирования используй обычный `live`-ключ — на старте у workspace есть 100 бесплатных кредитов.

## Получить ключ

1. Зарегистрируйся на [createya.ai](https://createya.ai)
2. Открой [createya.ai/settings/api-keys](https://createya.ai/settings/api-keys)
3. **Create new key** → дай имя (например `prod-bot`, `staging-frontend`)
4. **Скопируй ключ** — он показывается **один раз**. Сохрани в env vars или secret manager.

## Использование

### REST

```bash
curl https://api.createya.ai/v1/balance \
  -H "Authorization: Bearer crya_sk_live_..."
```

### MCP

#### OAuth (Claude.ai, Claude Desktop)

Ключ вводится **один раз** на странице авторизации Createya, Claude/Claude Desktop хранит токен сам.

#### Bearer (Cursor, Cline, Windsurf, Codex, OpenCode)

В файле конфига MCP-клиента:

```json
{
  "mcpServers": {
    "createya": {
      "url": "https://api.createya.ai/mcp",
      "headers": {
        "Authorization": "Bearer crya_sk_live_..."
      }
    }
  }
}
```

Подробные конфиги — на странице [MCP Integration](/mcp/overview/).

## Безопасность

- **Один ключ — один сервис.** Если у тебя bot + бэкенд + cron-jobs — дай каждому отдельный ключ. Удобнее ротировать и audit'ить.
- **Не клади в git.** Используй `.env`, `.env.local`, secret manager (Doppler, 1Password Secrets), GitHub Secrets для CI.
- **Хеширование на сервере.** Createya хранит ключи через bcrypt, raw-значение не извлекается.
- **Workspace isolation.** Ключ привязан к одному workspace, не может тратить кредиты с других.

## Ротация

Если ключ скомпрометирован:

1. Открой [createya.ai/settings/api-keys](https://createya.ai/settings/api-keys)
2. У старого ключа нажми **Revoke** — он перестанет работать мгновенно
3. **Create new key** — обнови `.env` в своих сервисах

## Rate limits

Сейчас лимиты применяются **на уровне ключа**:

- До 10 параллельных async-задач
- До 60 запросов в минуту на REST endpoint'ы
- Превышение → `429 Too Many Requests` с `Retry-After` в заголовках

Для повышения лимитов в B2B-сценарии — пиши на [support@createya.ai](mailto:support@createya.ai).
