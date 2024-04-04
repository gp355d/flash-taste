<template>
  <div class="modal fade" ref="articleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <v-form v-slot="{ errors }">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <v-field type="text" name="標題" class="form-control" id="title" v-model="tempArticles.title" placeholder="請輸入標題"
                  :class="{ 'is-invalid': errors['標題'] }" rules="required"></v-field>
                  <error-message name="標題" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">文章圖片</label>
                  <v-field type="text" name="文章圖片" class="form-control" id="image" v-model="tempArticles.image" placeholder="請輸入圖片連結"
                  :class="{ 'is-invalid': errors['文章圖片'] }" rules="required"></v-field>
                  <img v-if="tempArticles.image" class="img-fluid" :src="tempArticles.image" :alt="tempArticles.image">
                  <error-message name="文章圖片" class="invalid-feedback"></error-message>
                  <h3>新增多圖</h3>
              <div class="mb-2" v-if="Array.isArray(tempArticles.images)">
                <div class="mb-3" v-for="(img,key) in tempArticles.images" :key="key + 123">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control"
                        placeholder="請輸入圖片連結" v-model="tempArticles.images[key]">
                <img class="img-fluid" :src="img" :alt="img">

                </div>
                  <button type="button" class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages"  v-if="tempArticles.images.length === 0 || tempArticles.images[tempArticles.images.length-1]">
                    新增圖片
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="tempArticles.images.pop()">
                    刪除圖片
                  </button>
              </div>
                </div>
                <div class="mb-3">
                  <label for="author" class="form-label">作者</label>
                  <v-field type="text" name="作者" class="form-control" id="author" v-model="tempArticles.author" placeholder="請輸入標題"
                  :class="{ 'is-invalid': errors['作者'] }" rules="required"></v-field>
                  <error-message name="作者" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="create_at">文章建立日期</label>
                  <input type="date" name="文章建立日期" class="form-control" id="create_at" v-model="create_at"/>
                </div>
              </v-form>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3" v-if="Array.isArray(tempArticles.tag)">
                <div class="col-md-2 mb-1" v-for="(label, key) in tempArticles.tag" :key="key">
                  <div class="input-group input-group-sm">
                    <v-field type="text" name="標籤" class="form-control form-control" id="tag" v-model="tempArticles.tag[key]"
                      placeholder="請輸入標籤"></v-field>
                    <button type="button" class="btn btn-outline-danger" @click="() => tempArticles.tag.splice(key, 1)">
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 mb-1">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" type="button"
                    @click="() => tempArticles.tag.push('')" v-if="tempArticles.tag.length === 0 || tempArticles.tag[tempArticles.tag.length-1]">
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <ckeditor type="text" class="form-control" id="description" :editor="editor" :config="editorConfig" v-model="tempArticles.description"
                  placeholder="請輸入文章描述"></ckeditor>
              </div>
              <div class="mb-3">
              <ckeditor type="text" class="form-control" :editor="editor" :config="editorConfig" v-model="tempArticles.content"></ckeditor>
              </div>
              <div class="mb-3">
                <span>上架狀態</span>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="tempArticles.isPublic" id="isPublic" />
                  <label class="form-check-label" for="isPublic">
                    <span v-if="tempArticles.isPublic">已上架</span>
                    <span v-else>未上架</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="close">
            取消
          </button>
          <button type="button" class="btn btn-primary"  @click="updateArticle">
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

export default {
  props: ['tempArticle', 'isNew'],
  data () {
    return {
      articleModal: '',
      tempArticles: {},
      create_at: '',
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
  methods: {
    open () {
      this.articleModal.show()
    },
    close () {
      this.articleModal.hide()
      this.$emit('getProducts')
    },
    updateArticle () {
      this.$emit('updateData')
    },
    createImages () {
      this.$emit('createImg')
    }
  },
  watch: {
    tempArticle () {
      this.tempArticles = this.tempArticle
      if (!this.tempArticles.images) {
        this.tempArticles.images = []
      }
      if (!this.tempArticles.image) {
        this.tempArticles.image = ''
      }
      [this.create_at] = new Date(this.tempArticles.create_at * 1000)
        .toISOString()
        .split('T')
    },
    create_at () {
      this.tempArticles.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  mounted () {
    this.articleModal = new Modal(this.$refs.articleModal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
