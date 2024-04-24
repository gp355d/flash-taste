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
    </div>
  </div>
    <div class="container">
      <Loading v-model:active="isLoading" />
      <div class="row justify-content-center p-3">
        <div class="col-md-8 shadow-sm bg-white p-3">
          <h3 class="ps-2 text-primary mb-5">購物車清單</h3>
          <template v-if="carts.carts?.length">
            <div class="table-responsive mb-3">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th class="text-nowrap" scope="col"></th>
                  <th class="text-nowrap" scope="col">產品圖片</th>
                  <th class="text-nowrap" scope="col">產品名稱</th>
                  <th class="text-nowrap" scope="col">產品售價</th>
                  <th class="text-nowrap" width="150">數量</th>
                  <th class="text-nowrap" scope="col">總價</th>
                </tr>
              </thead>
              <tbody v-for="cart in carts.carts" :key="cart.id + 'cart'">
                <tr>
                  <td class="text-center">
                    <a class="text-black" href="#"><span class="trash bi bi-trash"
                        @click.prevent="deleteCart(cart.id)"></span></a>
                  </td>
                  <td width="90">
                    <img :src="cart.product.imageUrl" :alt="`商品圖片-${cart.id}`" class="img-fluid rounded-3 object-fit-cover">
                  </td>
                  <td class="text-nowrap">{{ cart.product.title }}</td>
                  <td>{{ $filters.currency(cart.product.price) }}</td>
                  <td class="text-nowrap">
                    <div class="input-group flex-nowrap">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-success" type="button" :disabled="cart.qty === 1"
                          @click.prevent="cart.qty--; changeToCart(cart, cart.qty)" style="
                          border-top-right-radius: 0;
                          border-bottom-right-radius: 0;
                      ">-</button>
                      </div>
                      <input type="text" class="form-control text-center" value="1" readonly v-model="cart.qty"
                        :disabled="isLoadingStatus.cartLoading === cart.id" style="width: 80px;">
                      <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button"
                          @click.prevent="cart.qty++; changeToCart(cart, cart.qty)" style="
                          border-top-left-radius: 0;
                          border-bottom-left-radius: 0;
                      ">+</button>
                        <span>{{ cart.product.unit }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {{ $filters.currency(cart.product.price * cart.qty) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <router-link to="/products" class="d-inline-flex align-items-center text-decoration-none">
          <span class="material-icons">keyboard_return</span>
          回產品列表
        </router-link>
        <div class="row justify-content-end" v-if="carts.carts?.length > 0">
        <div class="col-md-8 mb-3">
          <div class="d-flex justify-content-end align-items-center">
            <span class="fs-5 me-3">總金額</span>
            <span class="fs-4 fw-bold text-end text-danger">{{ $filters.currency(carts.total) }}</span>
          </div>
        </div>
        <div class="col-md-8 d-flex justify-content-end" v-if="carts.carts?.length">
          <RouterLink to="/order" class="btn btn-primary">確認訂單</RouterLink>
        </div>
      </div>
          </template>
          <template v-else>
            <p class="text-center h4 mb-3">目前購物車為空的狀態喔!，再去選購吧~</p>
            <div class="text-center">
              <router-link class="w-25 btn btn-primary" to="/products">購物去</router-link>
            </div>
          </template>
        </div>

      </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import CartStore from '@/stores/CartStore'
import StatusStore from '@/stores/StatusStore'
import Loading from 'vue-loading-overlay'
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
    ...mapState(CartStore, ['carts', 'isLoading']),
    ...mapState(StatusStore, ['isLoading'])
  },
  components: {
    Loading
  },
  mounted () {
    this.getCarts()
  }
}
</script>
<style lang="scss">
  .trash:hover{
    color: #33691e !important;
  }
</style>
