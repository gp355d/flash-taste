<template>
  <div class="wrapper">
    <div class="min-vh-100">
      <NavCom :num="cartNum" :cartIitem="carts"></NavCom>
        <router-view />
    </div>
  </div>
  <footer class="footer">
    <div class="container">
      <nav
        class="navbar navbar-expand-lg navbar-light d-lg-flex justify-content-center justify-content-lg-between flex-lg-row d-block flex-column">
        <a class="navbar-brand d-block text-center text-white me-0" href="#">
          <img src="../../assets/logo4-1.svg" alt="logo" width="80">
        </a>
        <div class="text-center d-block justify-content-center align-items-center pb-md-0" id="navbarNav">
          <ul class="navbar-nav d-block d-lg-flex align-items-center list-unstyled mb-0">
            <li class="nav-item"><RouterLink class="nav-link me-lg-2 mb-3 mb-lg-0" to="/products">產品列表</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link me-lg-2 mb-3 mb-lg-0" to="/about">關於我們</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link me-lg-2 mb-3 mb-lg-0" to="/blog">專欄文章</RouterLink></li>
          </ul>
        </div>
        <p class="text-center fs-6 m-0 d-lg-block nav-link text-primary">Copyright ©鮮品茗茶.</p>
      </nav>
    </div>
  </footer>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import CartStore from '@/stores/CartStore'
import NavCom from '@/components/NavbarViewCom.vue'
export default {
  computed: {
    ...mapState(CartStore, ['cartNum', 'total', 'carts'])
  },
  methods: {
    ...mapActions(CartStore, ['getCarts'])
  },
  components: {
    NavCom
  },
  mounted () {
    this.getCarts()
  }
}
</script>
<style>
body{
 margin-top: 54px;
}
</style>
