# Deploy setup — docs.createya.ai

Одноразовая настройка инфраструктуры для деплоя docs. Применяется **руками** при первом запуске. После этого деплой идёт через GHA `deploy.yml`.

## 1. DNS (Yandex Cloud)

```bash
# A-record docs.createya.ai → 158.160.200.216 (PROD frontend VM)
yc dns zone add-records \
  --name createya \
  --record "docs A 300 158.160.200.216"

# Проверка
dig docs.createya.ai +short
# должно вернуть: 158.160.200.216
```

## 2. Nginx config

```bash
# На локальной машине
scp deploy/nginx-docs.createya.ai.conf createya@158.160.200.216:/tmp/

# На PROD VM
ssh createya@158.160.200.216 << 'EOF'
sudo mv /tmp/nginx-docs.createya.ai.conf /etc/nginx/sites-available/docs.createya.ai
sudo ln -sf /etc/nginx/sites-available/docs.createya.ai /etc/nginx/sites-enabled/
sudo mkdir -p /var/www/docs.createya.ai
sudo chown -R createya:createya /var/www/docs.createya.ai
sudo nginx -t
EOF
```

## 3. Let's Encrypt сертификат

```bash
ssh createya@158.160.200.216 << 'EOF'
sudo certbot --nginx -d docs.createya.ai \
  --non-interactive --agree-tos \
  -m support@createya.ai \
  --redirect
EOF
```

## 4. GitHub Secrets

В `github.com/Createya-ai/createya-docs/settings/secrets/actions` добавить:

| Secret | Значение | Зачем |
|---|---|---|
| `SSH_PRIVATE_KEY_PROD_VM` | приватный ключ для SSH к `createya@158.160.200.216` | rsync деплой |
| `CREATEYA_API_KEY` | `crya_sk_live_...` (sync-bot ключ) | для GET /v1/models в sync-models скрипте; после CRE-337 деплоя — можно убрать |

## 5. Проверка после первого деплоя

После того как GHA запустился и rsync положил статику:

```bash
curl -I https://docs.createya.ai/
# → HTTP/2 200, Content-Type: text/html

curl https://docs.createya.ai/sitemap-index.xml | head -20
# → должно быть валидный XML с URL'ами

curl https://docs.createya.ai/robots.txt
# → User-agent: * Allow: /
```

## 6. Search Console / Yandex Webmaster

После того как docs.createya.ai задеплоен:

1. Yandex Webmaster: добавить сайт `https://docs.createya.ai`, верифицировать через DNS TXT
2. Google Search Console: добавить property, sitemap = `https://docs.createya.ai/sitemap-index.xml`
3. Bing Webmaster Tools: то же самое

Ускоряет индексацию на 1-2 порядка.
