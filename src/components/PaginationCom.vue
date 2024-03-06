<template>
<nav aria-label="Page navigation" class="d-flex justify-content-center">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':!pageInfo.has_pre }"><a class="page-link" href="#" @click.prevent="getProduct(pageInfo.current_page - 1)"><span aria-hidden="true">&laquo;</span></a></li>
    <li class="page-item" v-for="(page,i) in pageInfo.total_pages" :key="'page'+ i" :class="{'active':page === pageInfo.current_page}"><span class="page-link" v-if="page === pageInfo.current_page">{{page}}</span>
    <a class="page-link" href="#" v-else  @click.prevent="getProduct(page)">{{page}}</a></li>
    <li class="page-item" :class="{'disabled':!pageInfo.has_next }"><a class="page-link" href="#" @click.prevent="getProduct(pageInfo.current_page + 1)"><span aria-hidden="true">&raquo;</span></a></li>
  </ul>
</nav>
</template>
<script>
export default {
  props: ['pageInfo'],
  methods: {
    getProduct (page) {
      this.$emit('getProducts', page)
    }
  }
}
</script>
