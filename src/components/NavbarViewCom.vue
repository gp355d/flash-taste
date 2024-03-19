<template>
  <nav class="navbar navbar-expand-lg navbar-light shadow-sm bg-white" aria-label="Offcanvas navbar large">
    <div class="container-fluid">
      <a class="navbar-brand" href="../pages/index.html">
        <img src="../assets/logo4-1.svg" alt="" width="80">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2"
        aria-controls="offcanvasNavbar2">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar2"
        aria-labelledby="offcanvasNavbar2Label" data-bs-target="#offcanvasExample">
        <div class="offcanvas-header">
          <!-- <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5> -->
          <img src="../assets/logo4-1.svg" alt="" width="80px">
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
                    <span class="bi bi-cart position-relative end-0">
                    <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">{{ num
                    }}</span>
                    </span>
                  </RouterLink>
                </div>
                <div v-else class=" text-center carts">
                  <RouterLink to="/cart" class="nav-link me-lg-2 mb-lg-0 position-relative end-0 text-center">
                    <span class="bi bi-cart"></span>
                  </RouterLink>
                </div>
              </div>
              <!-- <div class="dropdown">
              <RouterLink v-if="num > 0" to="/cart" class="position-relative end-0" id="dropdownMenuLink" >
                  <span class="bi bi-cart fs-4"></span>
                  <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">{{ num
                  }}</span>
                </RouterLink>
                <RouterLink v-else to="/cart" class="position-relative end-0" id="dropdownMenuLink" data-bs-toggle="dropdown">
                  <span class="bi bi-cart fs-4"></span>
                </RouterLink>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">
                    <pre>{{ cartIitem }}</pre>
                    <div class="px-4 py-3">
                    <h6>已選擇產品</h6>
                    <template v-for="(cart) in cartIitem.carts" :key="cart.id">
                      <table class="table table-sm">
                        <tbody>
                          <tr>
                              <td class="align-middle">{{ cart.product.title }}</td>
                                <td class="align-middle">X{{ cart.qty }}</td>
                                <td class="align-middle text-right">{{ cart.product.price * cart.qty}}</td>
                              </tr>
                          </tbody>
                      </table>
                    </template>
                    <RouterLink to="/order" class="btn btn-primary btn-block">
                        <i class="fas fa-shopping-cart"></i> 結帳去
                    </RouterLink>
                </div>
                  </a></li>
              </ul>
            </div> -->
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
