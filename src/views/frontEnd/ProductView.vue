<template>
  <div class="container">
    <div class="row">
      <h2>這是單一產品</h2>
      <div class="col-md-6">
        <img :src="product.imageUrl" alt="" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>{{ product.title }}</h2>
        <span class="badge rounded-pill bg-primary mb-2">{{product.category}}</span>
        <p>{{product.content}}</p>
      </div>
    </div>

  </div>
</template>
<script>
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      product: {}
    }
  },
  mounted () {
    const { productId } = this.$route.params
    const loader = this.$loading.show()
    this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${productId}`)
      .then((res) => {
        this.product = res.data.product
        loader.hide()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
