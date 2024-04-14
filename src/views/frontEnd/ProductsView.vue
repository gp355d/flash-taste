<template>
      <div class="position-relative mb-3" style="background-image: url('https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-repeat: no-repeat;background-position: center;height: 300px;">
        <div class="px-lg-5 py-lg-2 px-4 py-3 position-absolute top-50 start-50 translate-middle" style="background:rgba(255, 255, 255, 0.6);border-radius:24px;">
          <h1>產品列表</h1>
        </div>
    </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 mb-md-0 mb-2">
            <ul class="list-group">
              <li class="list-group-item mb-2">產品類別</li>
              <li class="list-group-item p-0 border-0 mb-2">
                <a href="#" class="list-group-item " :class="{ active: category === '' }" @click.prevent="setCategory('')">全部商品</a>
              </li>
              <li class="list-group-item p-0 border-0 mb-2" v-for="(item,i) in categories" :key="item+i">
                <a href="#" class="list-group-item  list-group-item-action" :class="{ active: category === item }" @click.prevent="setCategory(item)">{{ item }}</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9">
            <div class="row gx-2">
              <div class="col-md-4" v-for="products in products" :key="products.id">
                <div class="card mb-3">
                  <div class="fw-bold text-primary">
                      <a class="product d-block rounded-top" @click="more(products.id)" style="cursor: pointer;">
                        <img :src="products.imageUrl" class="product-img card-img-top object-fit-cover" :alt="`product-img-${products.id}`" height="200"  @click="more(products.id)">
                      </a>
                      <div class="p-3">
                        <div class="d-flex flex-column justify-content-start">
                          <span class="badge bg-primary mb-1" style="width: 40px;">{{ products.category }}</span>
                          <div class="d-flex align-items-center justify-content-between">
                            <h5 class="card-title fs-4 mb-0">{{ products.title }}</h5>
                            <a class="d-block" href="#" @click.prevent="() => addToFavorite(products.id)">
                              <i class="bi bi-heart fs-5" style="cursor: pointer;"  v-if="favoriteList.id.indexOf(products.id) === -1"></i>
                              <i v-else class="bi bi-heart-fill fs-5"></i>
                            </a>
                          </div>
                          <span class="fw-normal d-block text-truncate" style="height: 48px; vertical-align: middle;">{{ products.description.replace(/<[^>]*>|<\/[^>]*>/gm, "") }}</span>
                          <div class="d-flex align-items-end" v-if="products.price !== products.origin_price">
                            <span class="fs-4 text-danger fw-bold me-2">{{ $filters.currency(products.price) }}</span>
                            <del class="fs-6 text-black fw-normal">{{ $filters.currency(products.origin_price) }}</del>
                          </div>
                          <span class="fs-3 text-danger fw-normal" v-else>{{ $filters.currency(products.origin_price) }}</span>
                          <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary fw-normal" :disabled="isLoadingStatus.ItemId===products.id" @click.prevent="addToCart(products.id)"> 加入購物車</button>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <PaginationCom :page-info="page" @get-products="getProducts" />
          </div>
        </div>
      </div>
</template>
<script>
import PaginationCom from '../../components/PaginationCom.vue'
import { mapActions, mapState } from 'pinia'
import CartStore from '@/stores/CartStore'
import ProductStore from '@/stores/ProductStore'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      products: [],
      page: {}
    }
  },
  watch: {
    category () {
      this.getProducts()
    }
  },
  methods: {
    getProducts (page = 1) {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products/?page=${page}&category=${this.category}`)
        .then((res) => {
          this.products = res.data.products
          this.page = res.data.pagination
          loader.hide()
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    more (id) {
      this.$router.push(`/product/${id}`)
    },
    ...mapActions(CartStore, ['addToCart']),
    ...mapActions(ProductStore, ['getid', 'addToFavorite', 'setCategory', 'getProductAllData'])
  },
  mounted () {
    this.getProducts()
    this.getProductAllData()
    this.getid()
  },
  computed: {
    ...mapState(ProductStore, ['favoriteList', 'categories', 'category']),
    ...mapState(CartStore, ['isLoadingStatus'])

  },
  components: {
    PaginationCom
  }
}
</script>
<style>
.product{
  overflow:hidden;
}
.product-img{
  transform: scale(1.1);
}
.product-img:hover{
  transform:scale(1.2,1.2);
  transition:all 0.5s ease 0s;
}
</style>
