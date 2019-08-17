import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from './store'

const store = createStore();
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })
const tabId = chrome.devtools.inspectedWindow.tabId

// Listen to messages from the background script.
portToBackgroundScript.onMessage.addListener((message) => {
  console.log('received msg in panel', message)
  if (message.action && message.action === 'content-changed') {
    console.log('request for new content with ', { tabId })
    portToBackgroundScript.postMessage({
      tabId,
      action: 'get-data'
    });
  } else if (message.action === 'new-data' && message.tabId === tabId) {
    store.commit('SET_HEAD', { head: message.data.head })
  }
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
