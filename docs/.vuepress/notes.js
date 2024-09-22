import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const cNote = defineNoteConfig({
  dir: 'C编程',
  link: '/c/',
  sidebar: 'auto',
})

const javaNote = defineNoteConfig({
  dir: 'Java编程',
  link: '/java/',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: '笔记',
  link: '/',
  notes: [cNote, javaNote],
})
