import { defineStore } from 'pinia'
const statusStore = defineStore('status', {
  state: () => {
    return {
      isLoading: false
    }
  }
})
export default statusStore
