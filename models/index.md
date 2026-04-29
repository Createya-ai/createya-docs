---
title: Каталог моделей
description: Полный каталог AI-моделей Createya — image и video через единый API.
---

# Каталог моделей

Per-model страницы автоматически генерируются раз в неделю из live `/v1/models` каталога.
Сейчас идёт миграция API на публичный режим — после её завершения этот раздел заполнится.

Пока актуальный каталог:

```bash
curl https://api.createya.ai/v1/models \
  -H "Authorization: Bearer crya_sk_live_..." | jq
```

## Главные семейства image

- **FLUX** — Flux 2, Flux Kontext (топ-фотореализм)
- **Nano Banana** — быстрая универсальная генерация
- **GPT Image** — OpenAI flagship
- **Kling Image** — photorealism + люди
- **Higgsfield Soul** — кинематограф
- **Midjourney** — художественный стиль
- **Runway Gen-4** — кинопродакшн

## Главные семейства video

- **Sora 2** — OpenAI flagship
- **Veo 3.1** / **Veo 3.1 Fast** — Google flagship
- **Kling Video** — O3 / V3 / 4K
- **Seedance 2.0** — ByteDance
- **Happy Horse 1.0** — Alibaba
- **Hailuo 2.3** — MiniMax

Подробнее на [createya.ai/knowledge](https://createya.ai/knowledge).
