<template>
  <div class="container">
    <div class="pt-4 pb-3 mb-3">
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
          <div class="timeline-pointer text-center step-3">
            <p>購物完成</p>
          </div>
        </div>
      </div>
      <router-link to="/cart" class="d-inline-flex align-items-center text-decoration-none">
        <span class="material-icons">keyboard_return</span>
        購物車清單
      </router-link>
    </div>
    <div class="order-details p-4">
      <h4>訂單明細</h4>
      <div class="order-item">
        <div class="row">
          <div class="col-md-6">
            <div class="p-2 shadow-sm h-100">
              <h3 class="text-center fw-bold text-primary">訂單項目</h3>
              <template v-if="cartNum > 0">
                <div class="row g-0 mb-3" v-for="item in carts.carts" :key="item.id">
                  <div class="col-md-4">
                    <img class="img-fluid object-fit-cover h-100"
                      :src="item.product.imageUrl"
                      :alt="`Order-Img-${item.id}`">
                  </div>
                  <div class="col-md-8 d-flex justify-content-center flex-md-column border border-1 p-2">
                    <div class="">
                      <div class="fs-5 fs-md-4">
                        <div class="d-flex">
                          <p>{{item.product.title}}</p>
                          <p>X{{ item.qty }}</p>
                          <span class="ms-2">{{item.unit}}</span>
                        </div>
                        <div class="d-flex">
                          <span>售價</span>
                          <span>{{ $filters.currency(item.product.price) }}</span>
                        </div>
                        <template v-if="discountStatus">
                          <div class="d-flex justify-content-between text-success" v-if="item.final_total!==item.total">
                            <small>折扣價</small>
                            <small>{{ $filters.currency(item.final_total) }}</small>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="coupon">優惠碼：</label>
                  <div class="input-group mb-3">
                     <input type="text" class="form-control" id="coupon" aria-label="Example text with button addon"
                      aria-describedby="button-addon1" v-model="couponCode">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" @click.prevent="() => sendCoupon(couponCode)">套用優惠碼</button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center">
                  <h2>目前無資料</h2>
                </div>
              </template>
              <div class="row">
                <div class="fs-5">
                  <template v-if="discountStatus">
                    <span class="d-block fw-bold text-success">已套用優惠券</span>
                    <div class="d-flex justify-content-between">
                    <span>原價:</span>
                    <span class="text-success">{{ $filters.currency(total) }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>折扣價:</span>
                    <span class="text-success">{{ discount }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>總計:</span>
                    <span>{{ $filters.currency(final_total) }}</span>
                  </div>
                  </template>
                  <template v-else>
                    <div class="d-flex justify-content-between" v-if="cartNum > 0">
                      <span>總計:</span>
                      <span class="text-danger">{{ $filters.currency(total) }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <VForm class="col-md-6" ref="form" v-slot="{ errors }" @submit="sendOrder">
            <div class="p-2">
              <h3 class="text-center fw-bold text-primary">訂單資訊</h3>
              <div class="mb-3">
                <span class="text-danger me-1">*</span>
                <label for="customer-name" class="form-label">姓名</label>
                <VField id="customer-name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                     placeholder="請輸入姓名" rules="required"  v-model="form.name"></VField>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
               <div class="mb-3">
                <span class="text-danger me-1">*</span>
                <label for="customer-emall" class="form-label">Email</label>
                <VField name="email" type="email" class="form-control" id="customer-emall" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="form.email"/>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <span class="text-danger me-1">*</span>
                <label for="customer-phone" class="form-label">電話</label>
                <VField name="電話" type="tel" class="form-control" id="customer-phone" :class="{ 'is-invalid': errors['電話'] }" placeholder="0912345678" rules="required|min:8|max:10"  v-model="form.phone"/>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <span class="text-danger me-1">*</span>
                <label for="customer-address" class="form-label">地址</label>
                <VField name="地址" type="text" class="form-control" id="customer-address" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"  v-model="form.address"/>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
               <span class="text-danger me-1">*</span>
              <label for="customer-pay" class="form-label">付款方式</label>
              <VField name="付款方式" class="form-select mb-3" id="customer-pay" aria-label="Default select example"  :class="{ 'is-invalid': errors['付款方式'] }" rules="required" v-model="form.region" as="select">
                <option value="" disabled>請選擇</option>
                <option value="1">超商繳費</option>
                  <option value="2">ATM轉帳</option>
                  <option value="3">信用卡</option>
                  <option value="4">銀行轉帳</option>
                </VField>
                <error-message name="付款方式" class="invalid-feedback"></error-message>
              <div class="mb-3">
                <label for="customer-note" class="form-label">備註</label>
                <VField name="留言" class="form-control" id="customer-note" rows="3" v-model="form.msg" as="textarea"></VField>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-danger" :disabled="form.email === '' || form.name === '' || form.phone === '' || form.address === '' || final_total === 0">送出訂單</button>
              </div>
            </div>
          </VForm>
        </div>
      </div>
      <!-- <div class="row">
          <div class="d-flex justify-content-between fs-5">
            <span>總和</span>
            <span>$300</span>
          </div>
        </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import CartStore from '@/stores/CartStore'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      couponCode: '',
      discountStatus: false,
      // final_totals: 0,
      discount: 0,
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        msg: '',
        region: ''
      }
    }
  },
  methods: {
    ...mapActions(CartStore, ['getCarts']),
    sendCoupon (code) {
      const coupon = {
        code
      }
      this.$http.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/coupon`, { data: coupon })
        .then((res) => {
          this.discountStatus = res.data.success
          // this.final_totals = Math.round(res.data.data.final_total)
          this.discount = Math.round(this.final_total - this.total)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '已套用優惠券',
            showConfirmButton: false,
            timer: 1500
          })
          this.couponCode = ''
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          return 0
        })
    },
    sendOrder () {
      const data = {
        user: {
          name: this.form.name,
          email: this.form.email,
          tel: this.form.phone,
          address: this.form.address
        },
        message: this.form.msg
      }
      // this.$refs.form.resetForm()
      this.axios.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/order`, { data })
        .then((res) => {
          const loader = this.$loading.show()
          console.log(res.data)
          // alert(res.data.message)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs.form.resetForm()
          this.getCarts()
          loader.hide()
          this.$router.push(`/complete/${res.data.orderId}`)
        })
        .catch((err) => {
          // alert(err.response.data)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        // console.log(err.data);
        })
    }
  },
  computed: {
    ...mapState(CartStore, ['carts', 'total', 'cartNum', 'final_total'])
  },
  mounted () {
    this.getCarts()
  }
}
</script>
<style lang="scss">
.order-details {
  border: 1px solid #dee2e6;
  border-radius: 15px;
  margin-bottom: 20px;
}

.order-details h4 {
  margin-bottom: 20px;
}

.order-item {
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.order-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>
