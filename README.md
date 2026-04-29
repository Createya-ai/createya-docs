# Createya Docs

Публичная документация Createya API — [docs.createya.ai](https://docs.createya.ai).

Стек: **VitePress** (Vue ecosystem). Static build → деплой на PROD VM nginx.

## Локальная разработка

```bash
npm install
npm run dev   # → http://localhost:5173
npm run build # → ./.vitepress/dist/
```

## Структура

```
.
├── index.md                  # Hero
├── quickstart.md             # 60-секундный старт
├── authentication.md         # API ключи, Bearer
├── api/rest.md               # REST API reference
├── models/                   # ★ AUTO-GEN еженедельно
├── .vitepress/
│   ├── config.mjs            # Sidebar, nav, brand
│   └── theme/brand.css       # Цвета createya.ai
├── .github/workflows/
│   └── deploy.yml            # Build + sync + rsync на PROD VM
└── scripts/sync-models.mjs   # /v1/models → md pages
```

## Auto-sync моделей

Каждый понедельник 09:00 UTC GitHub Action:
1. Дёргает `GET https://api.createya.ai/v1/models`
2. Генерит `models/<slug>.md` для каждой image+video модели
3. Билдит сайт → rsync на PROD VM

Триггер по запросу: GitHub Actions → **Build & deploy docs.createya.ai** → **Run workflow**.

## License

MIT
