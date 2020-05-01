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
      path: '/app-link',
      name: 'app-link',
      meta: {
        title: 'Link',
      },
      component: () => import(/* webpackChunkName:'views/app-link' */ './views/app-link.vue')
    },
    {
      path: '/favicon',
      name: 'favicon',
      meta: {
        title: 'Favicon',
      },
      component: () => import(/* webpackChunkName:'views/app-meta' */ './views/favicon.vue')
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
    },
    {
      path: '/whatsapp',
      name: 'whatsapp',
      meta: {
        title: 'WhatsApp',
      },
      component: () => import(/* webpackChunkName:'views/whatsapp' */ './views/whatsapp.vue')
    },
    {
      path: '/linkedin',
      name: 'linkedin',
      meta: {
        title: 'LinkedIn',
      },
      component: () => import(/* webpackChunkName:'views/linkedin' */ './views/linkedin.vue')
    },
    {
      path: '/facebook',
      name: 'facebook',
      meta: {
        title: 'Facebook',
      },
      component: () => import(/* webpackChunkName:'views/facebook' */ './views/facebook.vue')
    },
    {
      path: '/slack',
      name: 'slack',
      meta: {
        title: 'Slack',
      },
      component: () => import(/* webpackChunkName:'views/slack' */ './views/slack.vue')
    },
    {
      path: '/search-meta',
      name: 'search-meta',
      meta: {
        title: 'Search Meta',
      },
      component: () => import(/* webpackChunkName:'views/search-meta' */ './views/search-meta.vue')
    },
    {
      path: '/open-search',
      name: 'open-search',
      meta: {
        title: 'Open Search',
      },
      component: () => import(/* webpackChunkName:'views/open-search' */ './views/open-search.vue')
    },
  ]
})

