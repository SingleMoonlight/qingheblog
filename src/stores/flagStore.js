import { defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', {
    state: () => ({
        flag: true,
    }),
})
