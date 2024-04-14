import { createRouter, createWebHashHistory } from 'vue-router'
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
        component: () => import('../views/frontEnd/AboutView.vue'),
        meta: { title: '關於我們' }
      },
      {
        path: 'products',
        component: () => import('../views/frontEnd/ProductsView.vue'),
        meta: { title: '產品列表' }
      },
      {
        path: 'product/:productId',
        component: () => import('../views/frontEnd/ProductView.vue'),
        meta: { title: '單一產品' }
      },
      {
        path: 'cart',
        component: () => import('../views/frontEnd/CartView.vue'),
        meta: { title: '購物車列表' }
      },
      {
        path: 'order',
        component: () => import('../views/frontEnd/OrderView.vue'),
        meta: { title: '訂單填寫' }
      },
      {
        path: 'complete/:order_id',
        component: () => import('../views/frontEnd/CompleteView.vue'),
        meta: { title: '訂單完成' }
      },
      {
        path: 'pay',
        component: () => import('../views/frontEnd/PayView.vue'),
        meta: { title: '付款完成' }
      },
      {
        path: 'blog',
        component: () => import('../views/frontEnd/BlogView.vue'),
        meta: { title: '專欄文章' }
      },
      {
        path: 'blog/:id',
        component: () => import('../views/frontEnd/BlogDetail.vue'),
        meta: { title: '單一文章' }
      },
      {
        path: 'favorite',
        component: () => import('../views/frontEnd/FavoriteView.vue'),
        meta: { title: '收藏產品' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/frontEnd/LoginView.vue'),
    meta: { title: '登入後台頁' }
  },
  {
    path: '/admin',
    component: () => import('../views/backEnd/BackEndView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backEnd/ProductsView.vue'),
        meta: { title: '產品管理頁面' }
      },
      {
        path: 'order',
        component: () => import('../views/backEnd/OrderView.vue'),
        meta: { title: '訂單管理頁面' }
      },
      {
        path: 'coupon',
        component: () => import('../views/backEnd/CouponView.vue'),
        meta: { title: '優惠券管理頁面' }
      },
      {
        path: 'article',
        component: () => import('../views/backEnd/ArticleView.vue'),
        meta: { title: '文章管理頁面' }
      }
    ]
  },
  { // 404頁面
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '404頁面' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 始終滾動到頂部
    return { top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
