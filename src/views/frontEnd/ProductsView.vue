<template>
  <!-- <div class="row"> -->
      <!-- <h2>這是產品列表</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">圖片</th>
            <th scope="col">名稱</th>
            <th scope="col">價格</th>
            <th scope="col">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="products in products" :key="products.id">
            <td><img :src="products.imageUrl" alt="" class="img-fluid" width="150"></td>
            <td>{{ products.title }}</td>
            <td>{{ products.origin_price }}</td>
            <td><button type="button" class="btn btn-primary" @click="more(products.id)">詳細介紹</button></td>
          </tr>
        </tbody>
      </table> -->
      <div class="position-relative mb-3" style="background-image: url('https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-repeat: no-repeat;background-position: center;height: 300px;">
        <div class="px-lg-5 py-lg-2 px-4 py-3 position-absolute top-50 start-50 translate-middle" style="background:rgba(255, 255, 255, 0.6);border-radius:24px;">
          <h1>產品列表</h1>
        </div>
      <!-- <div class="d-flex flex-column justify-content-center align-items-center px-5 py-2" style="background:rgba(255, 255, 255, 0.6);border-radius:24px;" data-v-d685d90f="">
        <img src="/public/logo3.svg" alt="logo" width="260" height="160" class="img-fluid" data-v-d685d90f="">
        <h3 class="fs-1 fs-lg-1 fw-lg-bold text-center mb-4" data-v-d685d90f="">療癒一杯，感受生活的美好</h3>
        <h1 class="fs-2 fs-lg-3 text-center text-gray-dark mb-8" data-v-d685d90f="">尋找心靈的寧靜之旅</h1>
        <a href="#/products" class="btn btn-primary fs-lg-5 px-5 py-3 px-lg-6" data-v-d685d90f="">立即探索</a>
      </div> -->

    </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 mb-md-0 mb-2">
            <ul class="list-group shadow-sm">
              <li class="list-group-item">產品類別</li>
              <li class="list-group-item">
                <a href="#" class="list-group-item " :class="{ active: category === '' }" @click.prevent="setCategory('')">全部商品</a>
              </li>
              <li class="list-group-item" v-for="(item,i) in categories" :key="item+i">
                <a href="#" class="list-group-item  list-group-item-action" :class="{ active: category === item }" @click.prevent="setCategory(item)">{{ item }}</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9">
            <div class="row gx-2">
              <div class="col-md-4" v-for="products in products" :key="products.id">
                <div class="card mb-3">
                  <div class="fw-bold text-primary">
                    <div class="">
                      <a class="product d-block mb-2 rounded-top" @click="more(products.id)" style="cursor: pointer;">
                        <img :src="products.imageUrl" class="product-img card-img-top object-fit-cover mb-2 " :alt="`product-img-${products.id}`" height="200"  @click="more(products.id)">
                      </a>
                      <div class="p-2">
                        <span class="badge bg-primary mb-2">{{products.category}}</span>
                        <div class="d-flex align-items-center justify-content-between">
                          <h5 class="card-title fs-4 fw-bold mb-0">{{ products.title }}</h5>
                          <a class="d-block" href="#" @click.prevent="() => addToFavorite(products.id)">
                            <!-- <span class="material-icons fs-2" style="cursor: pointer;">favorite_border</span> -->
                            <i class="bi bi-heart fs-2" style="cursor: pointer;"  v-if="favoriteList.id.indexOf(products.id) === -1"></i>
                            <i v-else class="bi bi-heart-fill fs-2"></i>
                          </a>
                        </div>
                        <span class="fw-normal d-block text-truncate" style="height: 48px; vertical-align: middle;">{{ products.description.replace(/<[^>]*>|<\/[^>]*>/gm, "") }}</span>
                        <div class="fs-5 fw-bold d-flex  align-items-center" v-if="products.price !== products.origin_price">
                          <span class="fs-2 text-danger fw-bold">{{ $filters.currency(products.price) }}</span>
                          <del class="fs-5 fw-bold text-black">{{ $filters.currency(products.origin_price) }}</del>
                        </div>
                        <span class="fs-2 text-danger fw-bold" v-else>{{ $filters.currency(products.origin_price) }}</span>
                      </div>
                    </div>
                    <div class="d-grid gap-2 mx-auto col-8 mb-2">
                      <a class="btn btn-outline-primary fw-normal" @click.prevent="addToCart(products.id)"> 加入購物車</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <PaginationCom :page-info="page" @get-products="getProducts"></PaginationCom>
          </div>
        </div>
      </div>
    <!-- </div> -->
  <!-- <pre>{{ products }}</pre> -->
</template>
<script>
import PaginationCom from '../../components/PaginationCom.vue'
import { mapActions, mapState } from 'pinia'
import CartStore from '@/stores/CartStore'
import ProductStore from '@/stores/ProductStore'
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
          //   this.getOrders()
          //   alert(res.data.message)
          //   this.$refs.customerorderModal.close()
        })
        .catch((err) => {
          console.log(err)
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
    ...mapState(ProductStore, ['favoriteList', 'categories', 'category'])
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
