import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default defineStore('Cart', {
  state: () => ({
    carts: [],
    cartNum: 0,
    total: 0,
    finalTotal: 0
  }),
  actions: {
    getCarts () {
      // const loader = this.$loading.show()
      axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`)
        .then((res) => {
        // this.isLoadingStatus.isLoading = false;
          const { data } = res.data
          this.carts = data
          this.cartNum = data.carts.length
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
          console.log(this.cartNum)
          // loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
        // console.log(err.data);
        })
    },
    addToCart (productId, qty = 1) {
      // console.log(qty, productId)
      const cart = {
        data: {
          product_id: productId,
          qty
        }
      }
      // const loader = this.$loading.show()
      // this.isLoadingStatus.ItemId = productId
      axios.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`, cart)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          // console.log(res.data);
          this.getCarts()
          // this.isLoadingStatus.ItemId = ''
          // this.$refs.userProductModal.closeModal()
          // loader.hide()
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response,
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
    },
    changeToCart (item, qty = 1) {
      // const loader = this.$loading.show()
      const order = {
        data: {
          product_id: item.product_id,
          qty
        }
      }
      // this.isLoadingStatus.cartLoading = item.id
      axios.put(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${item.id}`, order)
        .then((res) => {
          // alert(res.data.message)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCarts()
          // this.isLoadingStatus.cartLoading = ''
          // loader.hide()
          // this.$refs.userProductModal.closeModal()
        })
        .catch((err) => {
          alert(err.response.data.message)
        // console.log(err.data);
        })
    },
    deleteCart (cartId) {
      // const loader = this.$loading.show()
      axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${cartId}`)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `該商品${res.data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
          this.loadingItem = ''
          this.getCarts()
        }).catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.loadingItem = ''
        })
    },
    deleteAllCarts () {
      // const loader = this.$loading.show()
      axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/carts`)
        .then((res) => {
          alert('購物車列表' + res.data.message)
          this.getCarts()
          // loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
          // console.log(err.data);
        })
    }
  }
})
