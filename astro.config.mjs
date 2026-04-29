import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://docs.createya.ai',

  integrations: [
    starlight({
      title: 'Createya Docs',
      description: 'Документация Createya API — REST + MCP. Все нейросети через один ключ.',

      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: false,
      },

      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Createya-ai/createya-mcp' },
        { icon: 'telegram', label: 'Telegram', href: 'https://t.me/createya_bot' },
        { icon: 'email', label: 'Email', href: 'mailto:support@createya.ai' },
      ],

      defaultLocale: 'ru',
      locales: {
        ru: { label: 'Русский', lang: 'ru' },
        en: { label: 'English', lang: 'en' },
      },

      customCss: [
        './src/styles/brand.css',
        './src/styles/tailwind.css',
      ],

      head: [
        // Meta theme color match брендовому background
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0c0e12' } },
        // Open Graph default
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Createya Docs' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.createya.ai/og-default.jpg' } },
        // Yandex.Metrika (тот же ID что на createya.ai)
        {
          tag: 'script',
          content: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108620039','ym');ym(108620039,'init',{ssr:true,webvisor:true,clickmap:true,trackLinks:true});`,
        },
      ],

      sidebar: [
        {
          label: 'Getting Started',
          translations: { ru: 'Начало работы' },
          items: [
            { slug: 'index' },
            { slug: 'quickstart' },
            { slug: 'authentication' },
          ],
        },
        {
          label: 'API Reference',
          translations: { ru: 'API Reference' },
          items: [
            { slug: 'api/rest' },
            { slug: 'api/run' },
            { slug: 'api/models' },
            { slug: 'api/runs' },
            { slug: 'api/balance' },
            { slug: 'api/uploads' },
            { slug: 'api/errors' },
          ],
        },
        {
          label: 'MCP Integration',
          translations: { ru: 'MCP интеграция' },
          items: [
            { slug: 'mcp/overview' },
            { slug: 'mcp/claude-desktop' },
            { slug: 'mcp/claude-code' },
            { slug: 'mcp/cursor' },
            { slug: 'mcp/cline' },
            { slug: 'mcp/windsurf' },
            { slug: 'mcp/codex' },
          ],
        },
        {
          label: 'Models',
          translations: { ru: 'Модели' },
          autogenerate: { directory: 'models' },
          collapsed: false,
        },
        {
          label: 'Use Cases',
          translations: { ru: 'Сценарии' },
          autogenerate: { directory: 'use-cases' },
          collapsed: true,
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
