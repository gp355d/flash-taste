import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/frontEnd/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/frontEnd/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontEnd/HomePageView.vue'),
        meta: { title: '首頁' }
      },
      {
        path: 'about',
        component: () => import('../views/frontEnd/AboutView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/frontEnd/ProductsView.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/frontEnd/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/frontEnd/CartView.vue')
      },
      {
        path: 'order',
        component: () => import('../views/frontEnd/OrderView.vue')
      },
      {
        path: 'checkout',
        component: () => import('../views/frontEnd/CheckoutView.vue')
      },
      {
        path: 'complete/:order_id',
        component: () => import('../views/frontEnd/CompleteView.vue')
      },
      {
        path: 'pay',
        component: () => import('../views/frontEnd/PayView.vue')
      },
      {
        path: 'blog',
        component: () => import('../views/frontEnd/BlogView.vue')
      },
      {
        path: 'blog/:id',
        component: () => import('../views/frontEnd/BlogDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/frontEnd/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backEnd/BackEndView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backEnd/ProductsView.vue')
      },
      {
        path: 'order',
        component: () => import('../views/backEnd/OrderView.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/backEnd/CouponView.vue')
      },
      {
        path: 'article',
        component: () => import('../views/backEnd/ArticleView.vue')
      }
    ]
  },
  { // 404頁面
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
