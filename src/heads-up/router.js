import Vue from 'vue'
import VueRouter from 'vue-router'
const pageMetaPage = () => import('./views/page-meta/index.vue')
const twitterPage = () => import('./views/twitter/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/page-meta'
  },
  {
    path: '/page-meta',
    name: 'page-meta',
    meta: {
      title: 'Page Meta',
    },
    component: pageMetaPage
  },
  {
    path: '/twitter',
    name: 'twitter',
    meta: {
      title: 'Twitter',
    },
    component: twitterPage
  }
]

const router = new VueRouter({
  routes
})

export default router
