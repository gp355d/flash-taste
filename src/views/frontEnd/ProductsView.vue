<template>
  <div class="row">
      <h2>這是產品列表</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">圖片</th>
            <th scope="col">名稱</th>
            <th scope="col">價格</th>
            <th scope="col">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="products in products" :key="products.id">
            <td><img :src="products.imageUrl" alt="" class="img-fluid" width="150"></td>
            <td>{{ products.title }}</td>
            <td>{{ products.origin_price }}</td>
            <td><button type="button" class="btn btn-primary" @click="more(products.id)">詳細介紹</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  <!-- <pre>{{ products }}</pre> -->
</template>
<script>
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    more (id) {
      this.$router.push(`/product/${id}`)
    }
  },
  mounted () {
    const loader = this.$loading.show()
    this.axios.get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products`)
      .then((res) => {
        console.log(res.data)
        this.products = res.data.products
        loader.hide()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
