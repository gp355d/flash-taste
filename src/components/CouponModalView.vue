<template>
    <div class="modal fade" ref="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <v-form ref="form" v-slot="{ errors }">
          <div class="mb-3">
            <label for="title">標題</label>
            <v-field type="text" name="標題" class="form-control" id="title" v-model="tempCoupons.title" placeholder="請輸入標題"
            :class="{ 'is-invalid': errors['標題'] }" rules="required"></v-field>
            <error-message name="標題" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <v-field type="text" name="優惠碼" class="form-control" id="coupon_code" v-model="tempCoupons.code" placeholder="請輸入優惠碼"
            :class="{ 'is-invalid': errors['優惠碼'] }" rules="required"></v-field>
            <error-message name="優惠碼" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date"
                   v-model="due_date" min="">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <v-field type="number" name="折扣百分比" min="0" max="100" class="form-control" id="price"
                   v-model.number="tempCoupons.percent" placeholder="請輸入折扣百分比" :class="{ 'is-invalid': errors['折扣百分比'] }" rules="required"></v-field>
            <error-message name="折扣百分比" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <span>啟用狀態</span>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox"
                     :true-value="1"
                     :false-value="0"
                     v-model="tempCoupons.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                <span v-if="tempCoupons.is_enabled">已啟用</span>
                <span v-else>未啟用</span>
              </label>
            </div>
          </div>
        </v-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
          <button type="button" class="btn btn-primary" @click="() => changestatus(tempCoupons)"
                  > {{ isNew ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['tempCoupon', 'isNew'],
  data () {
    return {
      couponModal: '',
      tempCoupons: {},
      due_date: ''
    }
  },
  methods: {
    open () {
      this.couponModal.show()
    },
    close () {
      this.couponModal.hide()
      this.$emit('getProducts')
    },
    changestatus (tempCoupons) {
      this.$emit('updateCoupon', tempCoupons)
    }
  },
  watch: {
    tempCoupon () {
      this.tempCoupons = this.tempCoupon
      const dateAndTime = new Date(this.tempCoupons.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000)
      // 取得今天的日期物件
      const today = new Date()
      // 設定最小日期為本周的周日
      const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      // 轉換日期為ISO格式 (yyyy-mm-dd)
      const minDateISO = minDate.toISOString().split('T')[0]
      // 設定最小和最大日期
      const dateInput = document.getElementById('due_date')
      dateInput.min = minDateISO
    }
  },
  mounted () {
    this.couponModal = new Modal(this.$refs.couponModal, {
      keyboard: false,
      backdrop: 'static'
    })
  }

}
</script>
