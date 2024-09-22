import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '标签', link: '/tags/' },
  { text: '分类', link: '/categories/' },
  { text: '归档', link: '/archives/' },
  {
    text: '笔记',
    items: [
      { text: 'C编程', link: '/c/', activeMatch: '^/c/', },
      { text: 'Java编程', link: '/java/', activeMatch: '^/java/', },
    ],
  },
])
