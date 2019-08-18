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
      component: () => import(/* webpackChunkName:'views/app-meta' */ './views/app-meta.vue')
    },
    {
      path: '/apple-ios',
      name: 'apple-ios',
      meta: {
        title: 'Apple iOS',
      },
      component: () => import(/* webpackChunkName:'views/apple-ios' */ './views/apple-ios.vue')
    },
    {
      path: '/open-graph',
      name: 'open-graph',
      meta: {
        title: 'Open Graph',
      },
      component: () => import(/* webpackChunkName:'views/open-graph' */ './views/open-graph.vue')
    },
    {
      path: '/twitter',
      name: 'twitter',
      meta: {
        title: 'Twitter',
      },
      component: () => import(/* webpackChunkName:'views/twitter' */ './views/twitter.vue')
    }
  ]
})

