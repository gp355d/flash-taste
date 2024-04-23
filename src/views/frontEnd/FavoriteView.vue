<template>
  <div class="container">
    <div class="row justify-content-center  p-3">
      <div class="col-md-8 bg-white shadow-sm">
        <Loading v-model:active="isLoading" />
        <div class="p-3">
          <div class="row">
            <h3 class="text-primary mb-5 fw-bold p-0">已收藏產品</h3>
          </div>
          <template v-if="favoriteList.list.length > 0">
          <div class="row border-1 border-bottom pb-2" v-for="list in favoriteList.list" :key="list.id">
              <div class="col-2 d-flex flex-column justify-content-center align-items-center">
                <a href="#">
                  <span class="material-icons fs-2" @click.prevent="() => addToFavorite(list.id)">delete</span>
                </a>
              </div>
              <div class="col-4 d-flex flex-column justify-content-center">
                <router-link :to="`/product/${list.id}`"><img class="img-fluid object-fit-cover" :src="list.imageUrl" :key="list.id"></router-link>
              </div>
              <div class="col-md col p-2 d-flex flex-column justify-content-center">
                <div class="row">
                  <div class="col-12 d-flex fs-md-5 fs-6 mb-2">
                    <router-link class="text-decoration-none" :to="`/product/${list.id}`"><span class="mb-0">{{ list.title }}</span></router-link>
                    <span class="fw-bold text-danger ms-auto">{{ $filters.currency(list.price) }}</span>
                  </div>
                  <div class="col-12 d-flex justify-content-end">
                    <button class="btn btn-outline-primary" :disabled="isLoadingStatus.ItemId===list.id"
                      @click.prevent="addToCart(list.id)"> 加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
            </template>
            <template v-else>
            <p class="text-center h4 mb-3">目前收藏為空的狀態喔!，再去收藏吧~</p>
            <div class="text-center">
              <router-link class="w-25 btn btn-primary" to="/products">收藏去</router-link>
            </div>
          </template>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import ProductStore from '@/stores/ProductStore'
import CartStore from '@/stores/CartStore'
import StatusStore from '@/stores/StatusStore'
import Loading from 'vue-loading-overlay'
export default {
  computed: {
    ...mapState(ProductStore, ['tempProducts', 'favoriteList', 'isLoading']),
    ...mapState(CartStore, ['addToCart', 'isLoadingStatus']),
    ...mapState(StatusStore, ['isLoading'])
  },
  methods: {
    ...mapActions(ProductStore, ['getProductAllData', 'addToFavorite', 'getid']),
    getFollow () {
      this.getProductAllData()
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.getFollow()
  }
}
</script>
