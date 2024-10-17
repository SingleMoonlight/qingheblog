import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home'},
  { text: '标签', link: '/tags/', icon: 'mdi:tag' },
  { text: '分类', link: '/categories/', icon: 'dashicons:category' },
  { text: '归档', link: '/archives/', icon: 'ph:file-archive-fill' },
  {
    text: '笔记',
    icon: 'solar:notebook-bold',
    items: [
      { text: 'C 编程', link: '/c/', activeMatch: '^/c/', },
      { text: 'Java 编程', link: '/java/', activeMatch: '^/java/', },
    ],
  },
])
