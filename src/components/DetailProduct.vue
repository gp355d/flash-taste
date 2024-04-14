<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="exampleModal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.imageUrl">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
              <p>商品描述：{{ tempProduct.description }}</p>
              <p>商品內容：{{ tempProduct.content }}</p>
              <div class="h5" v-if="tempProduct.price === tempProduct.origin_price">{{ tempProduct.origin_price }} 元</div>
              <template v-else>
                <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
              </template>

              <div>
                <div class="input-group">
                  <select class="form-select" name="" id="" v-model="qty">
                    <option v-for="i in 10" :value="i" :key="i">{{ i }}</option>
                  </select>
                  <button type="button" class="btn btn-primary"
                    @click="$emit('add-to-cart', tempProduct.id, qty)">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
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
      qty: 1,
      modal: ''
    }
  },
  props: ['tempProduct'],
  template: '#userProductModal',
  mounted () {
    this.modal = new Modal(this.$refs.exampleModal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  watch: {
    tempProduct () {
      this.qty = 1
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    closeModal () {
      this.modal.hide()
    }
  }
}
</script>
