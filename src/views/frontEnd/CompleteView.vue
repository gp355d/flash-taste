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
        <router-link to="/products" class="d-inline-flex align-items-center text-decoration-none">
          <span class="material-icons">keyboard_return</span>
          回商品列表
        </router-link>
      </div>
    </div>
      <div class="order-summary p-4">
        <h4>訂單成立</h4>
        <p class="mb-4">您已經完成本次購物，當確認訂購資訊無誤及付款完成後，我們將立即出貨，感謝您訂購商品</p>
        <div class="row mb-2">
          <div class="col-md-6">
            <div class="row mb-4">
              <p class="h3 fw-normal mb-4">商品明細:</p>
              <div class="col-md-12">
                <ul class="list-unstyled">
                  <li class="row mb-3 g-0 border" v-for="item in order.products" :key="item.id">
                    <div class="col-md-7">
                      <img :src="item.product.imageUrl"
                        :alt="item.product.title" class="img-fluid">
                    </div>
                    <div class="col-md-5 d-flex flex-row flex-column justify-content-md-center p-3">
                      <span class="d-block fs-3 fs-md-4">{{ item.product.title }}</span>
                      <div class="d-flex fs-4 fs-md-5">
                        <span class="me-2">{{ $filters.currency(item.product.price) }}</span>
                        <span>X{{ item.qty }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- <pre>{{ order.user }}</pre> -->
          </div>
          <div class="col-md-6">
            <p class="h3 fw-normal mb-4">顧客資訊:</p>
            <p>姓名:{{ order.user.name }}</p>
            <p>地址:{{ order.user.address }}</p>
            <p>電話:{{ order.user.tel }}</p>
            <p>訂單編號:{{ order.id }}</p>
            <p>訂單狀態:{{ order.is_paid ? '付款完成' : '尚未付款' }}</p>
          </div>
        </div>
        <div class="row">
            <div class="col-md-8">
              <p class="h2 fw-normal">總金額:<strong class="text-danger"> {{  $filters.currency(order.total) }}</strong></p>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" @click.prevent="() => pay()" v-if="order.is_paid!==true">前往付款</button>
            <div v-else></div>
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
          console.log(this.order)
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
<style>
.order-summary {
  border: 1px solid #dee2e6;
  border-radius: 15px;
  margin-bottom: 20px;
}

.order-summary h4 {
  margin-bottom: 20px;
}

</style>
