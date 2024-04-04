<template>
<div class="position-relative"
        style="background-image: url('https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-repeat: no-repeat;background-position: center;height: 300px;">
        <div class="px-lg-5 py-lg-2 px-4 py-3 position-absolute top-50 start-50 translate-middle" style="background:rgba(255, 255, 255, 0.6);border-radius:24px;">
          <h1>專欄文章</h1>
        </div>
      </div>
      <div class="content">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-8">
              <div class="content">
                <div class="mb-5 d-flex flex-column justify-content-end" v-for="article in articleList" :key="article.id">
                  <img class="object-fit-cover img-fluid mb-3 rounded-3"
                    :src="article.image"
                    :alt="'img'+`${article.id}`">
                    <h3 class="fs-4 fw-bold mb-2">{{ article.title }}</h3>
                    <div>
                      <i class="bi bi-calendar me-3"><span class="mb-3 ms-1">{{ $filters.date(article.create_at)}}</span></i>
                      <i class="bi bi-tag me-2 text-primary" v-for="tag in article.tag" :key="tag"><span>{{ tag }}</span></i>
                    </div>
                  <p class="mb-0 text-truncate" style="height: 80px;" v-html="article.description"></p>
                  <div class="d-flex justify-content-end">
                    <RouterLink class="btn btn-primary" :to="`/blog/${article.id}`">閱讀更多</RouterLink>
                  </div>
                </div>
              </div>
              <PaginationCom :page-info="page" @get-products="getArticle" />
            </div>
            <div class="col-lg-4 d-none d-lg-block border-start border-primary border-2">
              <h3 class="fw-normal mb-4">Tags</h3>
              <div class="mb-3 text-primary">
                <span class="bi bi-tag me-2" v-for="(tag,i) in tagsArrays" :key="i">{{ tag }}</span>
              </div>
              <div>
                <h3 class="fw-normal mb-4">近期文章</h3>
                <ul class="list-unstyled text-primary">
                    <template v-for="(article,key) in articleList" :key="article.id">
                    <li v-if="key < 3"><RouterLink class="text-primary text-decoration-none" :to="`/blog/${article.id}`">{{ article.title }}</RouterLink></li>
                  </template>
                  </ul>
              </div>
            </div>
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
          const tagsArray = []
          this.articleList.forEach(article => {
            const tags = article.tag
            tagsArray.push(tags)
          })
          tagsArray.forEach(tags => {
            tags.forEach(tag => {
              this.tagsArrays.push(tag)
            })
          })
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
