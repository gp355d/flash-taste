<template>
  <div class="container">
    <div class="row">
      <h2>文章管理</h2>
      <div class="py-0">
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="() => openModal('new')">
          建立新的文章
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mt-4">
          <thead>
            <tr>
              <th class="text-nowrap">標題</th>
              <th>作者</th>
              <th>描述</th>
              <th>建立時間</th>
              <th class="text-nowrap">上架狀態</th>
              <th class="text-nowrap">操作行為</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="articles in articles" :key="articles.id">
              <td class="text-nowrap">{{ articles.title }}</td>
              <td class="text-nowrap">{{ articles.author }}</td>
              <td><span class="text-truncate d-inline-block" style="width:100px">{{ articles.description }}</span></td>
              <td class="text-nowrap">{{ $filters.date(articles.create_at) }}</td>
              <td>
                <span v-if="articles.isPublic">已上架</span>
                <span v-else>未上架</span>
              </td>
              <td class="text-nowrap">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="() => getArticlesingle(articles.id)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="() => delArticleModal(articles)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ArticleModal ref="articleModal" @get-products="getArticle" :temp-article="tempArticle" :is-new="isNew" @update-data="updateArticle" @create-img="createImages"></ArticleModal>
      <DeleteProductModal ref="userDeleteModal"  @get-products="getArticle" :temp-product ="tempArticle" @delete-data="deleteArticle" :id=4></DeleteProductModal>
      <PaginationCom :page-info="page" @get-products="getArticle"></PaginationCom>
    </div>
    </div>
  </div>
</template>
<script>
import ArticleModal from '../../components/ArticleModalView.vue'
import DeleteProductModal from '../../components/DeleteProductModal.vue'
import PaginationCom from '../../components/PaginationCom.vue'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      articles: [],
      articlesingle: [],
      page: {},
      isNew: false,
      tempArticle: {}
    }
  },
  methods: {
    getArticle (page = 1) {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/articles/?page=${page}`)
        .then((res) => {
          this.articles = res.data.articles
          this.page = res.data.pagination
          loader.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getArticlesingle (articleId) {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/article/${articleId}`)
        .then((res) => {
          this.articlesingle = res.data.article
          this.isNew = false
          this.openModal('edit', this.articlesingle)
          loader.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempArticle = {
          title: '預設標題',
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
          content: '預設內容',
          images: []
        }
        this.isNew = true
      } else if (status === 'edit') {
        this.tempArticle = { ...item }
        if (!Array.isArray(this.tempArticle.images)) {
          this.tempArticle.images = []
        }
        this.isNew = false
      }
      this.$refs.articleModal.open()
    },
    delArticleModal (item) {
      this.tempArticle = { ...item }
      this.$refs.userDeleteModal.open()
    },
    deleteArticle () {
      this.axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/article/${this.tempArticle.id}`)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getArticle()
          this.$refs.userDeleteModal.close()
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    updateArticle () {
      let url = ''
      let method = 'post'
      if (this.isNew) {
        url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/article`
      } else {
        url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/article/${this.tempArticle.id}`
        method = 'put'
      }
      const newData = {
        data: this.tempArticle
      }
      this.axios[method](url, newData)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs.articleModal.close()
          this.getArticle()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    createImages () {
      this.tempArticle.images.push('')
    }
  },
  components: {
    ArticleModal,
    DeleteProductModal,
    PaginationCom
  },
  mounted () {
    this.getArticle()
  }
}
</script>
