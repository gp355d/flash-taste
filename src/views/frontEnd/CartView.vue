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
          <div class="timeline-pointer text-center step-2">
            <p>填寫訂單</p>
          </div>
        </div>
        <div class="col-3 col-md-5">
          <div class="timeline-pointer text-center step-3">
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
  <div class="cart-list container p-4">
    <h4>購物車清單</h4>
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <template v-if="carts.carts?.length > 0">
          <div class="row border border-1 mb-2" v-for="cart in carts.carts" :key="cart.id + 'cart'">
            <div class="col-lg-2 align-self-center text-center">
              <img
                :src="cart.product.imageUrl"
                :alt="`商品圖片-${cart.id}`" class="img-fluid rounded-3">
            </div>
            <div class="col-lg-10  d-flex flex-md-column justify-content-center">
              <div class="row">
                <div class="col-md-3 align-self-center">
                  <h5 class="mb-0"> {{ cart.product.title }}</h5>
                </div>
                <div class="col-md-9">
                  <div class="row">
                    <div class="col-md-3 align-self-center">
                      <p class="mb-0"> {{ $filters.currency(cart.product.price) }}</p>
                    </div>
                    <div class="col-md-6 align-self-center">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-outline-success" type="button" :disabled="cart.qty === 1"
                            @click.prevent="cart.qty--; changeToCart(cart, cart.qty)">-</button>
                        </div>
                        <input type="text" class="form-control text-center" value="1" readonly v-model="cart.qty"
                          :disabled="isLoadingStatus.cartLoading === cart.id">
                        <div class="input-group-append">
                          <button class="btn btn-outline-success" type="button"
                            @click.prevent="cart.qty++; changeToCart(cart, cart.qty)">+</button>
                          <span>{{ cart.product.unit }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center">
                      <p class="mb-0 text-end">
                        {{ $filters.currency(cart.product.price * cart.qty) }}
                      </p>
                    </div>
                    <div class="col-md-1 d-flex align-items-center justify-content-between">
                      <a class="d-none d-md-block text-black" href="#"><span class="trash bi bi-trash fs-2" @click.prevent="deleteCart(cart.id)"></span></a>
                      <button type="button" class="w-100 d-md-none d-block btn btn-primary" @click.prevent="deleteCart(cart.id)">刪除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <p class="text-center h4 mb-3">目前購物車清單為空的狀態喔!，再去選購吧~</p>
            <div class="text-center">
              <RouterLink class="w-25 btn btn-primary" to="/products">購物去</RouterLink>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="row" v-if="carts.carts?.length > 0">
      <div class="col-12 mb-6">
        <div class="d-flex justify-content-end align-items-center">
          <span class="fs-4 me-6">總金額</span>
          <span class="fs-5 text-end text-danger">{{ $filters.currency(carts.total) }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="col-12 d-flex justify-content-end" v-if="carts.carts?.length">
      <RouterLink to="/order" class="btn btn-primary">確認訂單</RouterLink>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import CartStore from '@/stores/CartStore'
export default {
  data () {
    return {
      isLoadingStatus: {
        isLoading: false,
        cartLoading: ''
      }
    }
  },
  methods: {
    ...mapActions(CartStore, ['getCarts', 'changeToCart', 'deleteCart'])

  },
  computed: {
    ...mapState(CartStore, ['carts'])
  },
  mounted () {
    this.getCarts()
  }
}
</script>
<style lang="scss">
.cart-container {
  max-height: 400px;
  /* 固定容器的最大高度 */
  overflow-x: hidden;
  /* 添加垂直卷軸 */
}

.cart-list {
  border: 1px solid #dee2e6;
  border-radius: 15px;
  margin-bottom: 10px;
}

.cart-list .row {
  padding: 10px;
}

@media (min-width: 992px) {
  .cart-container {
    overflow-y: auto;
    /* 在PC板時超過高度才顯示滾動條 */
    overflow-x: hidden;
    /* 取消PC板的横向滚动条 */
  }
}
.trash:hover{
  color: #33691e !important;
}
</style>
