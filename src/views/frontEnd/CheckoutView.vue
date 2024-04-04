<template>
    <h2>這是結帳頁</h2>
    <div class="container">
      <div class="mt-4">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in products" :key="item.id">
              <td style="width: 200px">
                <div style="height: 100px; background-size: cover; background-position: center"
                  :style="{ 'backgroundImage':`url(${item.imageUrl})` }"></div>
              </td>
              <td>
                {{ item.title }}
              </td>
              <td>
                <div class="h5" v-if="item.price===item.origin_price">{{ item.origin_price }} 元</div>
                <template v-else>
                  <del class="h6">原價 {{ item.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ item.price }} 元</div>
                </template>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-secondary" :disabled="isLoadingStatus.ItemId === item.id"
                    @click="getProduct(item.id)">
                    <i class="fa fa-spinner fa-pulse" v-if="isLoadingStatus.ItemId === item.id"></i>
                    查看更多
                  </button>
                  <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                    :disabled="isLoadingStatus.ItemId === item.id">
                    <i class="fa fa-spinner fa-pulse" v-if="isLoadingStatus.ItemId === item.id"></i>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 購物車列表 -->
        <div class="text-end">
          <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts" :disabled="!cart.final_total">清空購物車</button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 200px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="cart in cart.carts" :key="cart.id+'cart'">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCart(cart.id)">
                    <i class="fas fa-spinner fa-pulse" v-if="isLoadingStatus.loadingItem"></i>
                    x
                  </button>
                </td>
                <td>
                  {{ cart.product.title }}
                  <div class="text-success" v-if="cart.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <button type="button" class="btn btn-primary" @click.prevent="cart.qty++;changeToCart(cart,cart.qty)">+</button>
                      <input min="1" type="number" class="form-control" v-model="cart.qty"
                        :disabled="isLoadingStatus.cartLoading === cart.id" readonly>
                        <button type="button" class="btn btn-primary" :disabled="cart.qty === 1"  @click.prevent="cart.qty--;changeToCart(cart,cart.qty)">-</button>
                      <span class="input-group-text" id="basic-addon2">{{ cart.product.unit }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total!==cart.total" class="text-success">折扣價：</small>
                  ${{ cart.final_total }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot v-if="cart.length!==0">
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">${{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">${{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="my-5 row justify-content-center">
        <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField id="email" name="email" type="email" class="form-control"
                     :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="form.email"
                    ></VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                     placeholder="請輸入姓名" rules="required"  v-model="form.name"></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                     placeholder="請輸入電話" rules="required|min:8|max:10"  v-model="form.tel"></VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                     placeholder="請輸入地址" rules="required"  v-model="form.address"></VField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <VField name="留言" id="message" class="form-control" cols="30" rows="10"  v-model="form.msg" as="textarea"></VField>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger" :disabled="form.email === '' || form.name === '' || form.tel === '' || form.address === '' || cart.final_total === 0"
                    >送出訂單</button>
          </div>
        </VForm>
    </div>
    <DetailProduct ref="userProductModal" :temp-product="product" @add-to-cart="addToCart" />
  </div>

</template>
<script>
import DetailProduct from '../../components/DetailProduct.vue'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      products: [],
      product: {},
      cart: {},
      isLoadingStatus: {
        isLoading: false,
        cartLoading: ''
      },
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        msg: ''
      }
    }
  },
  methods: {
    getProducts () {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products`)
        .then((res) => {
          this.products = res.data.products
          loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
          console.log(err.data)
        })
    },
    getProduct (productId) {
      const loader = this.$loading.show()
      this.isLoadingStatus.ItemId = productId
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${productId}`)
        .then((res) => {
          this.product = res.data.product
          loader.hide()
          this.isLoadingStatus.ItemId = ''
          this.$refs.userProductModal.openModal()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    addToCart (productId, qty = 1) {
      const cart = {
        data: {
          product_id: productId,
          qty
        }
      }
      const loader = this.$loading.show()
      this.isLoadingStatus.ItemId = productId
      this.axios.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`, cart)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
          this.isLoadingStatus.ItemId = ''
          this.$refs.userProductModal.closeModal()
          loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    getCarts () {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`)
        .then((res) => {
          this.cart = res.data.data
          loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    changeToCart (item, qty = 1) {
      const order = {
        data: {
          product_id: item.product_id,
          qty
        }
      }
      this.isLoadingStatus.cartLoading = item.id
      this.axios.put(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${item.id}`, order)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
          this.isLoadingStatus.cartLoading = ''
          this.$refs.userProductModal.closeModal()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteCart (cartId) {
      const loader = this.$loading.show()
      this.axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${cartId}`)
        .then((res) => {
          loader.hide()
          alert('該商品' + res.data.message)
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteAllCarts () {
      const loader = this.$loading.show()
      this.axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/carts`)
        .then((res) => {
          alert('購物車列表' + res.data.message)
          this.getCarts()
          loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    sendOrder () {
      const data = {
        user: {
          name: this.form.name,
          email: this.form.email,
          tel: this.form.tel,
          address: this.form.address
        },
        message: this.form.msg
      }
      this.axios.post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/order`, { data })
        .then((res) => {
          const loader = this.$loading.show()
          console.log(res.data)
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.getCarts()
          loader.hide()
        })
        .catch((err) => {
          alert(err.response.data)
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getCarts()
  },
  components: {
    DetailProduct
  }
}
</script>
