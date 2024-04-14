<template>
<div class="position-relative"
        style="background-image: url('https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-repeat: no-repeat;background-position: center;height: 300px;">
        <div class="px-lg-5 py-lg-2 px-4 py-3 position-absolute top-50 start-50 translate-middle" style="background:rgba(255, 255, 255, 0.6);border-radius:24px;">
          <h1>專欄文章</h1>
        </div>
      </div>
      <div class="content">
        <div class="container py-5">
          <div class="row mb-5">
            <div class="col-lg-6 mb-lg-0 mb-3">
              <RouterLink :to="`/blog/${articleList[2]?.id}`">
                <div class="position-relative" :style="{ 'background-image': 'url(' + articleList[0]?.image + ')'}" style="height: 500px;;background-size: cover;background-repeat: no-repeat;background-position: center;">
                    <h3 class="w-100 text-center fs-4 fw-bold position-absolute bottom-0 start-50 translate-middle text-white">{{articleList[2]?.title }}</h3>
                </div>
              </RouterLink>
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
              <div class="row mb-3">
                <RouterLink class="d-flex text-decoration-none" :to="`/blog/${articleList[2]?.id}`">
                  <div class="col-lg-7 col-6 d-flex align-items-center">
                    <div class="row p-3">
                        <h4>{{ articleList[4]?.title }}</h4>
                        <p class="text-multiline">{{articleList[4]?.description.replace(/<[^>]*>|<\/[^>]*>/gm, "")}}</p>
                    </div>
                  </div>
                  <div class="col-lg-5 col-6">
                    <img class="img-fluid object-fit-cover" :src="articleList[4]?.image" :alt="articleList[4]?.title" >
                  </div>
                </RouterLink>
              </div>
              <div class="row">
                <RouterLink class="d-flex text-decoration-none" :to="`/blog/${articleList[0]?.id}`">
                  <div class="col-lg-7 col-6 d-flex align-items-center">
                    <div class="row p-3">
                        <h4>{{ articleList[0]?.title }}</h4>
                        <p class="text-multiline">{{articleList[0]?.description.replace(/<[^>]*>|<\/[^>]*>/gm, "")}}</p>
                    </div>
                  </div>
                  <div class="col-lg-5 col-6">
                    <img class="img-fluid object-fit-cover" :src="articleList[0]?.image" :alt="articleList[0]?.title">
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 mb-3" v-for="article in articleList" :key="article.id">
              <div class="card h-100">
                <div class="d-flex flex-column justify-content-end">
                  <img class="object-fit-cover img-fluid"
                    :src="article.image"
                    :alt="'img'+`${article.id}`" style="height: 300px;">
                    <div class="p-3">
                      <h3 class="fs-4 fw-bold mb-2" style="height: 60px;">{{ article.title }}</h3>
                      <div>
                        <i class="bi bi-calendar me-3"><span class="mb-3 ms-1">{{ $filters.date(article.create_at)}}</span></i>
                        <i class="bi bi-tag me-2 text-primary" v-for="tag in article.tag" :key="tag"><span>{{ tag }}</span></i>
                      </div>
                    <p class="text-multiline" v-html='article.description.replace(/<[^>]*>|<\/[^>]*>/gm, "")'></p>
                    <div class="d-flex justify-content-end">
                      <RouterLink class="btn btn-primary" :to="`/blog/${article.id}`">閱讀更多</RouterLink>
                    </div>
                    </div>
                </div>
              </div>
            </div>
            <PaginationCom :page-info="page" @get-products="getArticle" />
          </div>
        </div>

      </div>
</template>
<script>
import PaginationCom from '../../components/PaginationCom.vue'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      articleList: [],
      page: {},
      tagsArrays: []
    }
  },
  methods: {
    getArticle () {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/articles`)
        .then((res) => {
          this.articleList = res.data.articles
          this.page = res.data.pagination
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
    }
  },
  components: {
    PaginationCom
  },
  mounted () {
    this.getArticle()
  }
}
</script>
<style>
.text-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
