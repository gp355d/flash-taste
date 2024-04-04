<template>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6">
          <swiper :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" :navigation="true"
            class="mySwiper-big">
            <swiper-slide v-for="(image, i) in product.imagesUrl" :key="i">
              <img class="object-fit-cover img-fluid" :src="image" />
            </swiper-slide>
          </swiper>
          <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
            :watchSlidesProgress="true" :modules="modules" class="small-img align-items-center">
            <swiper-slide v-for="(image, i) in product.imagesUrl" :key="i">
              <img class="object-fit-cover img-fluid h-100" :src="image" />
            </swiper-slide>
          </swiper>
      </div>
      <div class="col-md-6">
        <div class="d-flex flex-column justify-content-center">
          <div>
            <div class="d-flex align-items-center mb-1">
              <h3 class="h3 text-nowrap me-2 mb-0 fw-bold">{{ product.title }}</h3>
              <div class="d-flex mb-md-0 align-items-center text-decoration-none" @click.prevent="() => addToFavorite(product.id)" style="cursor: pointer;">
                <span v-if="favoriteList.id.indexOf(product.id) === -1" class="bi bi-heart fs-3"></span>
                <span v-else class="bi bi-heart-fill fs-3 text-primary"></span>
              </div>
            </div><span class="badge bg-primary mb-1">{{ product.category }}</span>
            <div v-html="product.description"></div>
            <div class="d-flex flex-column">
              <div class="align-self-end">
                <div class="text-decoration-line-through fs-5"><span class="me-2">原價</span><span>{{ $filters.currency(product.origin_price) }}</span></div>
                <div class="fs-5 mb-2 fw-bold text-danger"><span class="me-2">特價</span><span>{{ $filters.currency(product.price) }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <h4 class="mb-4">商品介紹:</h4>
        <div v-html="product.content"></div>
        <div class="d-flex justify-content-end mb-2">
                <select class="form-select me-2" name="qty" v-model.number="Itemnum">
                  <option :value="num" v-for="num in 5" :key="num + '0'">{{ num }}{{ product.unit }}</option>
                </select>
                <button type="button" class="btn btn-primary me-3 me-md-0 text-nowrap" :disabled="isLoadingStatus.ItemId === product.id"  @click="() => addToCart(product.id, Itemnum)">
        加入購物車</button>
              </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-md-12">
        <div class="row d-flex justify-content-center">
          <div class="col-md-9">
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <h2 class="text-center mb-5">相關產品</h2>
      <div class="col-md-12">
        <div class="swiper-container">
          <swiper :slidesPerView="3"
            :spaceBetween="24"
            :modules="modules"
            :pagination="true"
            navigation
            :breakpoints="{
              320: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              768: {
              slidesPerView: 2,
              spaceBetween: 24
            },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              }
            }">
            <swiper-slide v-for="item in random" :key="item.id">
              <div class="card mb-3 rounded-top">
                  <router-link class="text-decoration-none" :to="`/product/${item.id}`">
                    <a class="product d-block rounded-top">
                      <img class="product-img img-fluid object-fit-cover w-100" :src="item.imageUrl" style="height: 300px;">
                    </a>
                    <div class="card-body p-2">
                      <h5 class="card-title fs-4 mb-1">{{ item.title }}</h5>
                      <p class="text-truncate" v-html="item.description"></p>
                      <!-- <p class="fw-normal fs-6 mb-2"><span class="d-block" style="height: 48px;line-height:1.2;vertical-align: middle;">{{ item.description.replace(/<[^>]*>|<\/[^>]*>/gm, "") }}</span></p> -->
                      <div class="d-flex align-items-end mb-5">
                        <span class="text-danger fs-4">{{ $filters.currency(item.price) }}</span>
                        <del class="text-black">{{ $filters.currency(item.origin_price) }}</del>
                      </div>
                    </div>
                  </router-link>
                </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import { Navigation, Thumbs, FreeMode } from 'swiper'
import { mapActions, mapState } from 'pinia'
import CartStore from '@/stores/CartStore'
import ProductStore from '@/stores/ProductStore'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default {
  data () {
    return {
      product: {
        price: 0,
        origin_price: 0
      },
      productsAll: [],
      Itemnum: 1,
      thumbsSwiper: null,
      modules: [FreeMode, Navigation, Thumbs]
    }
  },
  methods: {
    getProductSingle () {
      const { productId } = this.$route.params
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${productId}`)
        .then((res) => {
          this.product = res.data.product
          loader.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategory () {
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
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
    render (id) {
      this.$router.push(`/product/${id}`)
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    ...mapActions(CartStore, ['addToCart']),
    ...mapActions(ProductStore, ['addToFavorite', 'getProductAllData', 'getid'])
  },
  mounted () {
    this.getProductSingle()
    this.getCategory()
    this.getProductAllData()
    this.getid()
  },
  computed: {
    random () {
      return this.productsAll.filter((item) =>
        this.product.id !== item.id && item.category === this.product.category)
    },
    ...mapState(ProductStore, ['favoriteList']),
    ...mapState(CartStore, ['isLoadingStatus'])
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler () {
        if (this.$route.params.productId) {
          this.getProductSingle()
        }
      }
    },
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

.mySwiper-big .swiper-slide img,
.mySwiper .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 商品大圖切換外框 */
.mySwiper-big {
  width: 100%;
  height: 400px;
}

.mySwiper-big .swiper-slide {
  background-size: cover;
  background-position: center;
}
.small-img {
  // height: 140px;
  // box-sizing: border-box;
  padding: 10px 0;
}
.small-img .swiper-slide {
  width: 25%;
  background-size: cover;
  background-position: center;
  height: auto;
  opacity: 0.4;
}

.small-img .swiper-slide-thumb-active {
  opacity: 1;
}
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
