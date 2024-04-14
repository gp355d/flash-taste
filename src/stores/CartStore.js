import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
import StatusStore from './StatusStore'
const status = StatusStore()
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default defineStore('Cart', {
  state: () => ({
    carts: [],
    cartNum: 0,
    total: 0,
    finalTotal: 0,
    isLoadingStatus: {
      ItemId: ''
    },
    isLoading: false,
    loadingItem: ''
  }),
  actions: {
    getCarts () {
      status.isLoading = true
      axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`)
        .then((res) => {
          const { data } = res.data
          this.carts = data
          this.cartNum = data.carts.length
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
          status.isLoading = false
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    addToCart (productId, qty = 1) {
      const cart = {
        data: {
          product_id: productId,
          qty
        }
      }
      this.isLoadingStatus.ItemId = productId
      axios.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`, cart)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCarts()
          this.isLoadingStatus.ItemId = ''
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    changeToCart (item, qty = 1) {
      const order = {
        data: {
          product_id: item.product_id,
          qty
        }
      }
      axios.put(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${item.id}`, order)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteCart (cartId) {
      Swal.fire({
        title: '確認是否要刪除?',
        text: '此動作將無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#46633D',
        cancelButtonText: '取消',
        confirmButtonText: '確認刪除'
      }).then((result) => {
        if (result.isConfirmed) {
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
        }
      })
    },
    deleteAllCarts () {
      axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/carts`)
        .then((res) => {
          alert('購物車列表' + res.data.message)
          this.getCarts()
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
})
