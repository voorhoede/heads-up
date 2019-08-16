import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from './store'

const store = createStore();

const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

// Listen to messages from the background script.
portToBackgroundScript.onMessage.addListener((head) => {
  store.commit('SET_HEAD', { head })
})

Vue.config.devtools = true

import './style/index.css'

const app = new Vue({
  components: { App },
  el: '#app',
  router,
  store,
  render(h) {
    return h('App');
  }
})
