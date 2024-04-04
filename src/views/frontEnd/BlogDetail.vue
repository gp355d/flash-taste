<template>
  <div class="container p-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>{{ article.title }}</h1>
        <div>
          <i class="bi bi-calendar me-3"><span class="mb-2 ms-1">{{ $filters.date(article.create_at) }}</span></i>
          <i class="bi bi-tag" v-for="tag in article.tag" :key="tag.id"><span class="mb-2 me-2">{{ tag }}</span></i>
          <span class="text-dark">By {{ article.author }}</span>
        </div>
        <img :src="article.image" :alt="article.title"  class="img-fluid object-fit-cover mb-5" />
        <img v-if="article.images" :src="article.images" :alt="article.title" class="img-fluid object-fit-cover mb-5" />
        <div v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
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
          alert(err.response.data.message)
          console.log(err.data)
        })
    }
  },
  mounted () {
    this.getArticleSingle()
  }
}
</script>
