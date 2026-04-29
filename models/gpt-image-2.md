---
title: openai/gpt-image-2
description: openai/gpt-image-2. Генерация через Createya API — без VPN, оплата в рублях. AI генерация изображений, AI генерация видео, без VPN, в рублях.
sidebar:
  label: openai/gpt-image-2
---

# openai/gpt-image-2

> openai/gpt-image-2

**Стоимость:** 2 кредитов / запрос (× num_images; image_size: square→20x, square_2k→44x, square_hd→23x, portrait_3_4→16x, landscape_4_3→16x, portrait_9_16→12x, landscape_16_9→12x, portrait_3_4_2k→49x, portrait_3_4_hd→28x, landscape_4_3_2k→49x, landscape_4_3_hd→28x, portrait_9_16_2k→24x, portrait_9_16_4k→42x, portrait_9_16_hd→17x, landscape_16_9_2k→24x, landscape_16_9_4k→42x, landscape_16_9_hd→17x; quality: low→0.11x, high→1x, medium→0.31x).

**Family slug:** `gpt` · **Output:** image · **Mode:** sync



## Быстрый старт

### curl

```bash
curl -X POST https://api.createya.ai/v1/run \
  -H "Authorization: Bearer $CREATEYA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "input": {
      "prompt": "your prompt"
    }
  }'
```

### Python

```python
import os, requests
KEY = os.environ["CREATEYA_API_KEY"]
r = requests.post(
    "https://api.createya.ai/v1/run",
    headers={"Authorization": f"Bearer {KEY}"},
    json={"model": "gpt-image-2", "input": {"prompt": "your prompt"}}
)
print(r.json())
```

### Node.js

```javascript
const r = await fetch("https://api.createya.ai/v1/run", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.CREATEYA_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-image-2",
    input: { prompt: "your prompt" }
  })
});
console.log(await r.json());
```

## Параметры

| Параметр | Тип | Required | Описание |
|---|---|---|---|
| `image_size` | enum |  | Размер генерируемого изображения. Используйте «auto» для определения на основе входных изображений. |
| `quality` | enum |  | Качество генерируемого изображения |
| `num_images` | integer |  | Количество изображений для генерации |
| `output_format` | enum |  | Формат вывода изображений |
| `width` | integer |  | Ширина изображения в пикселях |
| `height` | integer |  | Высота изображения в пикселях |

## Похожие модели

См. [полный каталог](/models/) или [createya.ai/knowledge](https://createya.ai/knowledge).

## Через MCP

```
createya:run_model({
  model: "gpt-image-2",
  input: { prompt: "your prompt" }
})
```

См. [MCP Integration](/mcp/overview/) для подключения к Claude / Cursor / Cline.
