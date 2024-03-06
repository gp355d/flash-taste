<template>
<div  ref="orderModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>訂單細節</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4">
            <h3>用戶資料</h3>
            <table class="table">
              <tbody v-if="tempOrder.user">
                <tr>
                  <th style="width: 100px">姓名</th>
                  <td>{{ tempOrder.user.name }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ tempOrder.user.email }}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{ tempOrder.user.tel }}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{ tempOrder.user.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-8">
            <h3>訂單細節</h3>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 100px">訂單編號</th>
                  <td>{{ tempOrder.id }}</td>
                </tr>
                <tr>
                  <th>下單時間</th>
                  <td>{{ $filters.date(tempOrder.create_at) }}</td>
                </tr>
                <tr>
                  <th>付款時間</th>
                  <td>
                    <span v-if="tempOrder.paid_date">
                      {{ $filters.date(tempOrder.paid_date) }}
                    </span>
                    <span v-else></span>
                  </td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="tempOrder.is_paid"/>
                      <label class="form-check-label" for="flexCheckDefault">
                        <span class="text-success" v-if="tempOrder.is_paid">已付款</span>
                        <span class="text-muted" v-else>未付款</span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>總金額</th>
                  <td>
                    {{ $filters.currency(tempOrder.total) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>選購商品</h3>
            <table class="table">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr v-for="item in tempOrder.products" :key="item.id">
                  <th>
                    {{ item.product?.title }}
                  </th>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td class="text-end">
                    {{ item.final_Total }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="d-flex justify-content-between">
              <span class="fw-bold">付款狀態</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="close">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click.prevent="() =>changestatus(tempOrder)">
          修改付款狀態
        </button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-order'],
  data () {
    return {
      orderModal: ''
    }
  },
  methods: {
    open () {
      this.orderModal.show()
    },
    close () {
      this.orderModal.hide()
      this.$emit('getProducts')
    },
    changestatus (tempOrder) {
      this.$emit('changeStatus', tempOrder)
    }
  },
  mounted () {
    this.orderModal = new Modal(this.$refs.orderModal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
