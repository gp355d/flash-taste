// import './assets/main.css'
import { createApp } from 'vue'
import './assets/all.scss'
import 'bootstrap/dist/js/bootstrap.esm.min'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import CKEditor from '@ckeditor/ckeditor5-vue'
import 'sweetalert2/src/sweetalert2.scss'

import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
const app = createApp(App)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
app.config.globalProperties.$filters = {
  currency (num) {
    const n = parseInt(num, 10)
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
  },
  date (time) {
    const localDate = new Date(time * 1000)
    return localDate.toLocaleDateString()
  }
}
setLocale('zh_TW')
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(LoadingPlugin)
app.use(CKEditor)
app.mount('#app')
