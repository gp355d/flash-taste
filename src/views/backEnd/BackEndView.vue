<template>
  <div class="container-fluid" v-if="checkUserStatus">
    <div class="row">
      <!-- sidebar -->
      <div class="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" :class="{ 'active': sidebarActive }" ref="sidebar" >
        <h1 class="bi bi-bootstrap text-primary d-flex my-4 justify-content-center"></h1>
        <div class="list-group rounded-0">
          <RouterLink to="/" href="#" class="list-group-item list-group-item-action border-0 d-flex align-items-center">
            <span class="bi bi-border-all"></span>
            <span class="ms-2">回前台</span>
          </RouterLink>
          <RouterLink to="/admin/products" href="#" class="list-group-item border-0 align-items-center">
            <span class="bi bi-box"></span>
            <span class="ms-2">商品管理</span>
          </RouterLink>
          <RouterLink to="/admin/order" href="#" class="list-group-item border-0 align-items-center">
            <span class="bi bi-envelope-paper"></span>
            <span class="ms-2">訂單管理</span>
          </RouterLink>
          <RouterLink to="/admin/coupon" href="#" class="list-group-item border-0 align-items-center">
            <span class="bi bi-ticket"></span>
            <span class="ms-2">優惠券管理</span>
          </RouterLink>
          <RouterLink to="/admin/article" href="#" class="list-group-item border-0 align-items-center">
            <span class="bi bi-journal-text"></span>
            <span class="ms-2">文章管理</span>
          </RouterLink>
        </div>
      </div>
      <!-- overlay to close sidebar on small screens -->
      <div class="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay" @click="closeSidebar"></div>
      <!-- note: in the layout margin auto is the key as sidebar is fixed -->
      <div class="col-md-9 col-lg-10 ms-md-auto px-0">
        <!-- top nav -->
        <nav class="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
          <!-- close sidebar -->
          <button class="btn py-0 d-md-none" @click="toggleSidebar">
            <span class="bi bi-list text-primary h3"></span>
          </button>
          <div class="dropdown ms-auto">
            <button class="btn py-0 d-flex align-items-center" id="logout-dropdown" data-bs-toggle="dropdown"
              aria-expanded="false">
              <span class="bi bi-person text-primary h4"></span>
              <span class="bi bi-chevron-down ms-1 mb-2"></span>
            </button>
            <div class="dropdown-menu border-0 shadow-sm" aria-labelledby="logout-dropdown">
              <a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
            </div>
          </div>
        </nav>
        <!-- main content -->
        <main>
          <div class="container">
            <router-view/>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
const { VITE_APP_API_URL } = import.meta.env
export default {
  data () {
    return {
      sidebarActive: false,
      checkUserStatus: false
    }
  },
  methods: {
    checkUser () {
      const mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = mytoken
      this.axios.post(`${VITE_APP_API_URL}/api/user/check`)
        .then((res) => {
          this.checkUserStatus = res.data.success
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: '驗證中',
            timer: 1500
          })
          if (this.checkUserStatus) {
            this.$router.push('/admin/products')
          } else {
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/login')
        })
    },
    toggleSidebar () {
      this.sidebarActive = !this.sidebarActive
      const sidebarOverlay = document.getElementById('sidebar-overlay')
      if (this.sidebarActive) {
        sidebarOverlay.classList.remove('d-none')
      } else {
        sidebarOverlay.classList.add('d-none')
      }
    },
    closeSidebar () {
      this.sidebarActive = false
      document.getElementById('sidebar-overlay').classList.add('d-none')
    },
    logout () {
      this.axios.post(`${VITE_APP_API_URL}/logout`)
        .then((res) => {
          document.cookie = `hexToken=; expires=${new Date()};`
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/login')
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
  mounted () {
    this.checkUser()
  }
}
</script>
