import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const cNote = defineNoteConfig({
  dir: 'c',
  link: '/c/',
  sidebar: 'auto',
})

const javaNote = defineNoteConfig({
  dir: 'java',
  link: '/java/',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: '笔记',
  link: '/',
  notes: [cNote, javaNote],
})
