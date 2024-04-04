<template>
  <div class="row">
    <h2>訂單管理</h2>
    <div class="table-responsive">
      <table class="table mt-4 mb-3">
        <thead>
          <tr>
            <th class="text-nowrap">
              購買時間
            </th>
            <th class="text-nowrap">
              Email
            </th>
            <th class="text-nowrap">
              購買款項
            </th>
            <th class="text-nowrap">
              應付金額
            </th>
            <th class="text-nowrap">
              付款狀態
            </th>
            <th class="text-nowrap">
              操作行為
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in orderList" :key="item.id">
            <tr>
              <td>{{ $filters.date(item.create_at) }}</td>
              <td ><span v-if="item.user"> {{ item.user.email }}</span></td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量 :{{ product.qty }}
                  :{{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td class="text-end">{{ $filters.currency(item.total) }}</td>
              <td>
                <span class="text-success" v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </td>
              <td class="text-nowrap">
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(item)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="delProductModal(item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
      <OrderModalView ref="customerorderModal" @get-products="getOrders" :temp-order="tempOrder" @change-status="updatePaid" />
      <DeleteModalView ref="deleteProductmodal" @get-products="getOrders" :temp-product="tempOrder"  @delete-data="deleteOrder" :id=2 />
      <PaginationCom :page-info="page" @get-products="getOrders" />
  </div>
</template>
<script>
import OrderModalView from '../../components/OrderModalView.vue'
import DeleteModalView from '../../components/DeleteProductModal.vue'
import PaginationCom from '../../components/PaginationCom.vue'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      orderList: [],
      isNew: false,
      tempOrder: {},
      page: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/orders/?page=${page}`)
        .then((res) => {
          this.orderList = res.data.orders
          this.page = res.data.pagination
          loader.hide()
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.isNew = false
      this.$refs.customerorderModal.open()
    },
    delProductModal (item) {
      this.tempOrder = { ...item }
      this.$refs.deleteProductmodal.open()
    },
    deleteOrder () {
      this.axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/order/${this.tempOrder.id}`)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getOrders()
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
      this.$refs.deleteProductmodal.close()
    },
    updatePaid (item) {
      if (item.is_paid) {
        const paidDate = Math.floor(new Date() / 1000)
        item.paid_date = paidDate
      } else {
        item.paid_date = ''
      }
      const data = {
        is_paid: item.is_paid,
        paid_date: item.paid_date
      }
      this.axios.put(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/order/${item.id}`, { data })
        .then((res) => {
          this.getOrders()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs.customerorderModal.close()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  components: {
    OrderModalView,
    DeleteModalView,
    PaginationCom
  },
  mounted () {
    this.getOrders()
  }
}
</script>
