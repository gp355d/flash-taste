<template>
    <div class="container">
      <div class="pt-4 pb-3">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-9 col-md-7 timeline">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3 col-md-5">
              <div class="timeline-pointer text-center step-1 active">
                <p>購物清單確認</p>
              </div>
            </div>
            <div class="col-6 col-md-2">
              <div class="timeline-pointer text-center step-2 active">
                <p>填寫訂單</p>
              </div>
            </div>
            <div class="col-3 col-md-5">
              <div class="timeline-pointer text-center step-3 active">
                <p>購物完成</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center px-3">
        <div class="col-md-8 bg-white p-3 shadow-sm">
          <h3 class="text-primary mb-5">訂單已成立</h3>
        </div>
      </div>
      <div class="row justify-content-center px-3">
          <div class="col-md-8 bg-white p-3 shadow-sm">
            <h4 class="mb-2">購買品項</h4>
            <div class="row mb-3 justify-content-center align-items-center" v-for="item in order.products" :key="item.id">
              <div class="col-3">
                <img :src="item.product.imageUrl"
                  :alt="item.product.title" class="img-fluid">
              </div>
              <div class="col-6 text-center">
                <span>{{ item.product.title }}</span>
                <span>X{{ item.qty }}</span>
              </div>
              <div class="col-3 text-end">
                <span class="me-2">{{ $filters.currency(item.product.price) }}</span>
              </div>
              <div class="row pt-3">
                <hr class="w-100 col-md-9 border-2 border-top">
              </div>
            </div>
            <div class="accordion mb-3" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    查看詳細資訊
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample">
                  <div class="p-3">
                    <p>顧客姓名:{{ order.user.name }}</p>
                    <p>顧客地址:{{ order.user.address }}</p>
                    <p>聯絡電話:{{ order.user.tel }}</p>
                    <p>訂單編號:{{ order.id }}</p>
                    <p>訂單狀態:{{ order.is_paid ? '付款完成' : '尚未付款' }}</p>
                    <p class="fs-5">總金額:<strong class="text-danger"> {{  $filters.currency(order.total) }}</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-primary" @click.prevent="() => pay()" v-if="order.is_paid!==true">前往付款</button>
              <div v-else></div>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      order: {
        total: 0,
        products: [],
        user: {}
      }
    }
  },
  methods: {
    getOrder () {
      const orderId = this.$route.params.order_id
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/order/${orderId}`)
        .then((res) => {
          const { order } = res.data
          this.order = order
          loader.hide()
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
    pay () {
      const orderId = this.$route.params.order_id
      const loader = this.$loading.show()
      this.$http.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/pay/${orderId}`)
        .then((res) => {
          this.getOrder()
          loader.hide()
          this.$router.push('/pay')
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
<style scoped>
  .wrapper{
    background-color: rgb(40, 66, 66);
  }
</style>
