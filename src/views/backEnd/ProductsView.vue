<template>
  <div class="row">
    <h2>商品管理</h2>
    <div class="text-end mt-4">
        <button class="btn btn-primary" @click="openModal('new')">
          建立新的商品
        </button>
      </div>
      <div class="table-responsive mb-3">
        <table class="table mt-4">
          <thead>
            <tr>
              <th class="text-nowrap">
                分類
              </th>
              <th class="text-nowrap">商品名稱</th>
              <th class="text-nowrap">
                原價
              </th>
              <th class="text-nowrap">
                售價
              </th>
              <th class="text-nowrap">
                上架狀態
              </th>
              <th class="text-nowrap">
                操作行為
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="'id' + item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
              <td class="text-end">{{ $filters.currency(item.price) }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">已上架</span>
                <span v-else>未上架</span>
              </td>
              <td class="text-nowrap">
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit',item)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="delProductModal(item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationCom  :page-info="page" @get-products="getProducts" />
      <ProductModal ref="userProductModal"  @get-products="getProducts" :temp-product ="tempProduct" :is-new="isNew" @update-data="updateProduct" @create-img="createImages" />
      <DeleteProductModal ref="userDeleteModal"  @get-products="getProducts" :temp-product ="tempProduct" @delete-data="deleteProduct" />
  </div>
</template>
<script>
import ProductModal from '../../components/ProductModalView.vue'
import PaginationCom from '../../components/PaginationCom.vue'
import DeleteProductModal from '../../components/DeleteProductModal.vue'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      tempProduct: {
        imagesUrl: []
      },
      products: [],
      checkUserStatus: '',
      isNew: false,
      page: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products
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
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempProduct = { imagesUrl: [] }
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = []
        }
        this.isNew = false
      }
      this.$refs.userProductModal.open()
    },
    delProductModal (item) {
      this.tempProduct = { ...item }
      this.$refs.userDeleteModal.open()
    },
    deleteProduct () {
      this.axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs.userDeleteModal.close()
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
    updateProduct () {
      let url = ''
      let method = 'post'
      if (this.isNew) {
        url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product`
      } else {
        url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      const newData = {
        data: this.tempProduct
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
          this.$refs.userProductModal.close()
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
    createImages () {
      this.tempProduct.imagesUrl.push('')
    }
  },
  components: {
    ProductModal,
    PaginationCom,
    DeleteProductModal
  },
  mounted () {
    this.getProducts()
  }
}
</script>
