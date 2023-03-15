import { createPinia, defineStore } from 'pinia'

const pinia = createPinia()
export default pinia

export const counterStore = defineStore('counter', {
  state: () => {
    return {
      name: 'counter',
      count: 0,
    }
  },
  getters: {
    doublePlusOne(state) {
      return state.count * 2 + 1
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
