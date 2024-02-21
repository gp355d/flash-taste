<template>
  <div class="wrapper">
    <div class="min-vh-100">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" to="/">Logo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/products">產品列表</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/checkout">結帳頁</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
  <footer class="footer bg-dark">
    <div class="container">
      <nav
        class="navbar navbar-expand-lg navbar-light d-lg-flex justify-content-center justify-content-lg-between flex-lg-row d-block flex-column">
        <a class="navbar-brand d-block text-center text-white me-0" href="#">Logo</a>
        <div class="text-center d-block justify-content-center align-items-center pb-md-0" id="navbarNav">
          <ul class="navbar-nav d-block d-lg-flex align-items-center list-unstyled mb-0">
            <li class="nav-item"><a class="nav-link text-white" href="#">產品列表</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#">關於我們</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#">Blog</a></li>
          </ul>
        </div>
        <p class="text-center fs-6 m-0 d-lg-block text-white">Copyright ©xxxx.</p>
      </nav>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
