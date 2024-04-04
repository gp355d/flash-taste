<template>
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">
          請先登入
        </h1>
        <div class="col-8">
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus v-model="user.email">
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="Password" required v-model="user.password">
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="checkLogin">
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2021~∞ - 六角學院
      </p>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    checkLogin () {
      const users = {
        username: this.user.email,
        password: this.user.password
      }
      this.axios.post('https://ec-course-api.hexschool.io/v2/admin/signin', users)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token};expires=${new Date(expired)}};`
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: err.response.data.message,
            timer: 1500
          })
          this.$router.push('login')
        })
      this.user.email = ''
      this.user.password = ''
    }
  }
}
</script>
<style scoped>
  html,
  body {
    height: 100%;
    text-align: center;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>
