import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'ru-RU',
  title: 'Createya Docs',
  description: 'Документация Createya API — REST + MCP. Все нейросети через один ключ. Без VPN. В рублях.',

  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: "https://docs.createya.ai" },
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0c0e12' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Createya Docs' }],
    ['meta', { property: 'og:image', content: 'https://docs.createya.ai/og-default.jpg' }],
    ['script', {}, `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108620039','ym');ym(108620039,'init',{ssr:true,webvisor:true,clickmap:true,trackLinks:true});`],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Createya Docs',

    nav: [
      { text: 'Quickstart', link: '/quickstart' },
      { text: 'API', link: '/api/rest' },
      { text: 'Модели', link: '/models/' },
      { text: 'createya.ai →', link: 'https://createya.ai' },
    ],

    sidebar: [
      {
        text: 'Начало работы',
        items: [
          { text: 'Обзор', link: '/' },
          { text: 'Quickstart за 60 секунд', link: '/quickstart' },
          { text: 'Авторизация', link: '/authentication' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'REST API Reference', link: '/api/rest' },
        ],
      },
      {
        text: 'Модели',
        link: '/models/',
        collapsed: false,
        items: [
          { text: 'Все модели', link: '/models/' },
          { text: 'Nano Banana 2 (T2I)', link: '/models/nano-banana-2' },
          { text: 'Nano Banana 2 Edit', link: '/models/nano-banana-2-edit' },
          { text: 'Nano Banana Pro', link: '/models/nano-banana-pro' },
          { text: 'GPT Image 2 (T2I)', link: '/models/gpt-image-2' },
          { text: 'GPT Image 2 Edit', link: '/models/gpt-image-2-edit' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Createya-ai/createya-mcp' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m4.6 7.4l-1.7 8c-.1.5-.5.7-1 .4l-3-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3 5.5-5c.3-.2-.1-.3-.4-.1L7.4 13.1l-2.9-.9c-.5-.2-.5-.6 0-.8l11.5-4.4c.5-.2.9.1.6.4z"/></svg>' }, link: 'https://t.me/createya_bot' },
      { icon: 'mastodon', link: 'mailto:support@createya.ai', ariaLabel: 'Email support' },
    ],

    footer: {
      message: 'Сделано для AI-агентов всего мира · MIT License',
      copyright: '© 2026 Createya · <a href="https://createya.ai">createya.ai</a>',
    },

    search: { provider: 'local' },

    editLink: {
      pattern: 'https://github.com/Createya-ai/createya-docs/edit/main/:path',
      text: 'Предложить правку',
    },

    docFooter: {
      prev: '← Назад',
      next: 'Дальше →',
    },

    outline: { label: 'На странице' },
    lastUpdatedText: 'Обновлено',
    darkModeSwitchLabel: 'Тема',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Наверх',
  },
});
