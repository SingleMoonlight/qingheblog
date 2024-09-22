import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export const copyright = 
  '© ' +
  new Date().getFullYear() +
  ' ' +
  '<a href=https://ifback.com/ target=_blank>ifback.com</a>' +
  ' ' +
  '豫公网安备 ' +
  '<a href=https://www.beian.gov.cn/ target=_blank>41152402000212号</a>' +
  ' ' +
  '豫ICP备 ' +
  '<a href=https://beian.miit.gov.cn/ target=_blank>2021014629号-2</a>'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '青何博客',
  description: '向阳花木易为春',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  bundler: viteBundler(),

  theme: plumeTheme({
    blog: {
      postList: false,
      tagsLink: '/tags/',
      categoriesLink: '/categories/',
      archivesLink: '/archives/',
    },
    
    autoFrontmatter: false,

    footer: {
      message: '',
      copyright: copyright,
    },

    hostname: 'https://blog.ifback.com',

    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      // shiki: {
      //   languages: ['shell', 'bash', 'typescript', 'javascript'],
      //   twoslash: true,
      // },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      comment: {
        provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
        comment: true,
        repo: 'SingleMoonlight/qingheblog',
        repoId: 'R_kgDOMxqdhg',
        category: 'Announcements',
        categoryId: 'DIC_kwDOMxqdhs4CirgI',
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'top',
      },
    },
  }),
})
