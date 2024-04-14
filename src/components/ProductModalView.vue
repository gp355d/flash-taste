<template>
<div  ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="this.isNew">新增商品</span>
            <span v-else>編輯商品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4" >
              <h3>主要圖片</h3>
              <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
              <img v-if="tempProduct.imageUrl" class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.imageUrl">
              <input type="file" class="form-control" @change="uploadFile" ref="files"/>
              <img v-if="tempProduct.imgPreviewURL" class="img-fluid" :src="tempProduct.imgPreviewURL">
              <button class="btn btn-primary text-white" type="button" @click.prevent="upload" :disabled="!this.file">確認上傳</button>
              <h3>新增多圖</h3>
              <div class="mb-2" v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-3" v-for="(img,key) in tempProduct.imagesUrl" :key="key + 123">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control"
                        placeholder="請輸入圖片連結" v-model="tempProducts.imagesUrl[key]">
                <img class="img-fluid" :src="img" :alt="img">

                </div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages"  v-if="tempProduct.imagesUrl.length === 0 || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]">
                    新增圖片
                  </button>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProducts.imagesUrl.pop()">
                    刪除圖片
                  </button>
              </div>

            </div>
            <VForm class="col-sm-8" v-slot="{ errors }" ref="form">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <VField id="title" name="標題" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProducts.title" :class="{ 'is-invalid': errors['標題'] }" rules="required">
                  </VField>
                  <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <VField id="category" name="分類" type="text" class="form-control"
                              placeholder="請輸入分類" v-model="tempProducts.category" :class="{ 'is-invalid': errors['分類'] }" rules="required" />
                              <ErrorMessage name="分類" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <VField id="unit" name="單位" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProducts.unit" :class="{ 'is-invalid': errors['單位'] }" rules="required" />
                      <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <VField id="origin_price"  name="原價" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProducts.origin_price" :class="{ 'is-invalid': errors['原價'] }" rules="required" />
                        <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <VField id="price" name="售價" type="number" min="0" class="form-control"
                              placeholder="請輸入售價" v-model.number="tempProducts.price" :class="{ 'is-invalid': errors['售價'] }" rules="required"/>
                              <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <hr>
                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <ckeditor id="description" type="text" class="form-control"
                              placeholder="請輸入產品描述" :editor="editor" v-model="tempProducts.description" :config="editorConfig">
                    </ckeditor>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <ckeditor id="description" type="text" class="form-control"
                              placeholder="請輸入說明內容" :editor="editor" :config="editorConfig" v-model="tempProducts.content">
                    </ckeditor>
                  </div>
                  <div class="mb-3">
                    <span>上架狀態</span>
                    <div class="form-check form-switch">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                              :true-value="1" :false-value="0" v-model="tempProducts.is_enabled">
                      <label class="form-check-label" for="is_enabled">
                        <span v-if="tempProducts.is_enabled">已上架</span>
                        <span v-else>未上架</span>
                      </label>
                    </div>
                  </div>
              </div>

            </VForm>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="close">
            取消
          </button>
          <button type="submit" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  props: ['tempProduct', 'isNew'],
  data () {
    return {
      productModal: '',
      delProductModal: '',
      file: '',
      tempProducts: {},
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'undo',
          'redo']
      }
    }
  },
  watch: {
    tempProduct () {
      this.tempProducts = this.tempProduct
      if (!this.tempProduct.imagesUrl) {
        this.tempProducts.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProducts.imageUrl = ''
      }
    }
  },
  methods: {
    open () {
      this.productModal.show()
    },
    close () {
      this.productModal.hide()
      this.$emit('getProducts')
    },
    updateProduct () {
      this.$emit('updateData')
    },
    createImages () {
      this.$emit('createImg')
    },
    uploadFile (e) {
      const [file] = e.target.files
      this.file = file
      if (file) {
        this.tempProducts.imgPreviewURL = window.URL.createObjectURL(file)
      }
    },
    upload () {
      const uploadedFile = this.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const apiurl = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/upload`
      this.axios.post(apiurl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.data.success) {
            this.tempProducts.imageUrl = res.data.imageUrl
            this.tempProducts.imgPreviewURL = ''
          }
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
    this.productModal = new Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: 'static',
      focus: false
    })
  }
}
</script>
<style>
.ck.ck-balloon-panel{
  z-index: 1055 !important;
}
</style>
