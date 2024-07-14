import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // c'est comme les datas d'un composant vue
  state: () => ({
    count: 0
  }),

  // c'est comme les computed d'un composant vue
  getters: {
    doubleCount() {
      return this.count * 2
    }
  },
  // c'est comme les methods d'un composant vue
  actions: {
    increment() {
      this.count++
    }
  }
})
