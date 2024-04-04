import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default defineStore('Product', {
  state: () => ({
    favoriteList: {
      id: [],
      list: []
    },
    categories: [],
    category: '',
    products: []
  }),
  actions: {
    setCategory (category = '') {
      this.category = category
    },
    createCategories () {
      if (this.products.length !== 0) {
        const catregoryList = this.products.map((items) => items.category)
        this.categories = [...new Set(catregoryList)]
      }
    },
    addToFavorite (id) {
      const favoriteId = this.favoriteList.id.indexOf(id)
      if (favoriteId === -1) {
        this.favoriteList.id.push(id)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '已收藏',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        this.favoriteList.id.splice(favoriteId, 1)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '取消收藏',
          showConfirmButton: false,
          timer: 1500
        })
      }
      localStorage.setItem('favoriteId', JSON.stringify(this.favoriteList.id))
      this.getProductAllData()
    },
    getid () {
      this.favoriteList.id = JSON.parse(localStorage.getItem('favoriteId')) || []
    },
    getProductAllData () {
      axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products/all`)
        .then((res) => {
          const { products } = res.data
          this.products = products
          this.createCategories()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
})
