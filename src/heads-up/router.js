import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/app-meta'
    },
    {
      path: '/app-meta',
      name: 'app-meta',
      meta: {
        title: 'Meta',
      },
      component: () => import('./views/app-meta.vue')
    },
    {
      path: '/open-graph',
      name: 'open-graph',
      meta: {
        title: 'Open Graph',
      },
      component: () => import('./views/open-graph.vue')
    },
    {
      path: '/twitter',
      name: 'twitter',
      meta: {
        title: 'Twitter',
      },
      component: () => import('./views/twitter.vue')
    }
  ]
})

