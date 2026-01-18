/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home' },
  {
    text: '笔记',
    icon: 'solar:notebook-bold',
    items: [
      { text: 'C 编程', link: '/c/' },
      { text: 'Java 编程', link: '/java/' },
    ],
  },
])
