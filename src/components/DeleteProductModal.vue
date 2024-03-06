<template>
 <div id="delProductModal" ref="deleteProduct" class="modal fade" tabindex="-1"
  aria-labelledby="delProductModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除{{status}}</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <template v-if="id===2">
          <strong class="text-danger">{{tempProduct.id}}</strong> {{status}}(刪除後將無法恢復)。
        </template>
        <template v-else>
          <strong class="text-danger">{{tempProduct.title}}</strong> {{status}}(刪除後將無法恢復)。
        </template>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="close">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">
          確認刪除
        </button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  data () {
    return {
      status: ''
    }
  },
  props: ['tempProduct', 'id'],
  methods: {
    deleteProduct () {
      this.$emit('deleteData')
    },
    open () {
      this.delProductModal.show()
    },
    close () {
      this.delProductModal.hide()
      this.$emit('getProducts')
    }
  },
  // watch: {
  //   tempProduct () {
  //     this.tempProducts = this.tempProduct
  //   }
  // },
  mounted () {
    this.delProductModal = new Modal(this.$refs.deleteProduct, {
      keyboard: false,
      backdrop: 'static'
    })
    if (this.id === 1) {
      this.status = '商品'
    } else if (this.id === 2) {
      this.status = '訂單'
    } else if (this.id === 3) {
      this.status = '優惠券'
    } else if (this.id === 4) {
      this.status = '文章'
    }
  }
}
</script>
