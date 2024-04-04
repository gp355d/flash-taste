<template>
  <nav class="navbar navbar-expand-lg navbar-light shadow-sm bg-white" aria-label="Offcanvas navbar large">
    <div class="container-fluid">
      <a class="navbar-brand" href="../pages/index.html">
        <img src="../assets/logo4-1.svg" alt="logo" width="80">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2"
        aria-controls="offcanvasNavbar2">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar2"
        aria-labelledby="offcanvasNavbar2Label" data-bs-target="#offcanvasExample">
        <div class="offcanvas-header">
          <img src="../assets/logo4-1.svg" alt="offcanvas-logo" width="80px">
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" data-bs-dismiss="offcanvas">
          <ul class="navbar-nav ms-auto d-lg-flex align-items-center d-block">
            <li class="nav-item">
              <RouterLink class="nav-link me-lg-2 mb-3 mb-lg-0 text-center" aria-current="page" to="/products">產品列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link me-lg-2 mb-3 mb-lg-0 text-center" to="/about">關於我們</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link me-lg-2 mb-3 mb-lg-0 text-center" to="/blog">專欄文章</RouterLink>
            </li>
            <li class="nav-item">
              <div class="">
                <div v-if="num > 0" class=" text-center carts">
                  <RouterLink class="nav-link me-lg-2 mb-md-0" to="/cart">
                    <div class="d-flex justify-content-center">
                      <span class="d-block d-lg-none">購物車列表</span>
                      <span class="bi bi-cart position-relative end-0">
                      <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">{{ num }}</span>
                      </span>

                    </div>
                  </RouterLink>
                </div>
                <div v-else class=" text-center carts">
                  <RouterLink to="/cart" class="nav-link me-lg-2 mb-lg-0 position-relative end-0 text-center">
                    購物車列表
                    <span class="bi bi-cart"></span>
                  </RouterLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ['num', 'cartIitem']

}
</script>
<style scoped>
.navbar {
  position: fixed;
  /* Fixed position */
  width: 100%;
  /* Full width */
  top: 0;
  /* Stick to the top */
  z-index: 3;
  /* Ensure header appears above banner */
}
.carts :hover {
  color: #000000cc !important;
}
</style>
