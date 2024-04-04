<template>
  <h2>優惠券管理</h2>
  <div class="py-0">
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="() => openModal('new')">
          建立新的優惠券
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mt-4 mb-3">
        <thead>
        <tr>
          <th>名稱</th>
          <th class="text-nowrap">折扣百分比</th>
          <th>到期日</th>
          <th class="text-nowrap">啟用狀態</th>
          <th>操作行為</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in couponList" :key="i">
          <td class="text-nowrap">{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td class="text-nowrap">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="() => openModal('edit', item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="() => deleteCouponModal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
        </tbody>
        </table>
      </div>
      <CouponModalCom ref="couponModal" @get-products="getCoupon" :temp-coupon="tempCoupon" :is-new="isNew" @update-coupon="updateCoupon" />
      <DeleteProductModal ref="deleteProductmodal" @get-products="getCoupon" :temp-product="tempCoupon" @delete-data="deleteCoupon" :id=3 />
      <PaginationCom :page-info="page" @get-products="getCoupon" />
    </div>
</template>
<script>
import CouponModalCom from '../../components/CouponModalView.vue'
import DeleteProductModal from '../../components/DeleteProductModal.vue'
import PaginationCom from '../../components/PaginationCom.vue'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      couponList: [],
      page: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false
    }
  },
  methods: {
    getCoupon (page = 1) {
      const loader = this.$loading.show()
      this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/coupons/?page=${page}`)
        .then((res) => {
          this.couponList = res.data.coupons
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
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 1
        }
        this.isNew = true
      } else if (status === 'edit') {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      this.$refs.couponModal.open()
    },
    updateCoupon (tempCoupon) {
      if (tempCoupon.percent > 100 || tempCoupon.percent <= 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: '折扣百分比不能為負值或100以上',
          showConfirmButton: false,
          timer: 1500
        })
        return 0
      }
      let method = 'post'
      let data = tempCoupon
      let url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/coupon`
      if (!this.isNew) {
        url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/coupon/${this.tempCoupon.id}`
        method = 'put'
        data = this.tempCoupon
      }

      this.axios[method](url, { data })
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs.couponModal.close()
          this.getCoupon()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteCouponModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.deleteProductmodal.open()
    },
    deleteCoupon () {
      this.axios.delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/coupon/${this.tempCoupon.id}`)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCoupon()
          this.$refs.deleteProductmodal.close()
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
  components: {
    CouponModalCom,
    DeleteProductModal,
    PaginationCom
  },
  mounted () {
    this.getCoupon()
  }
}
</script>
