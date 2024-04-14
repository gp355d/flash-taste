<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="fs-3 mb-2">{{ article.title }}</h1>
        <div class="mb-3">
          <i class="bi bi-calendar me-3"><span class="mb-2 ms-1">{{ $filters.date(article.create_at) }}</span></i>
          <i class="bi bi-tag" v-for="tag in article.tag" :key="tag.id"><span class="mb-2 me-2">{{ tag }}</span></i>
          <span class="text-dark">By {{ article.author }}</span>
        </div>
        <img :src="article.image" :alt="article.title"  class="w-100 img-fluid object-fit-cover mb-5" />
        <template v-if="article.images">
          <img :src="article.images[1]" :alt="article.title" class="img-fluid object-fit-cover mb-5" />
        </template>
        <div class="fs-5" v-html="article.content">
        </div>
        <img v-if="article.images" :src="article.images[2]" :alt="article.title" class="w-100 img-fluid object-fit-cover mb-5" />
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      article: []
    }
  },
  methods: {
    getArticleSingle () {
      const loader = this.$loading.show()
      const { id } = this.$route.params
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/article/${id}`)
        .then((res) => {
          this.article = res.data.article
          this.article.content = res.data.article.content
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
  mounted () {
    this.getArticleSingle()
  }
}
</script>
