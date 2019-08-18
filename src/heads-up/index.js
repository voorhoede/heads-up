import Vue from 'vue'
import App from './App.vue'
import * as actions from './lib/message-actions'
import router from './router'
import { createStore } from './store'

const store = createStore();
const background = chrome.runtime.connect({ name: 'devtools' })
const tabId = chrome.devtools.inspectedWindow.tabId
const requestData = () => background.postMessage({ tabId, action: actions.GET_DATA })

requestData()

// Listen to messages from the background script.
background.onMessage.addListener((message) => {
  // console.log('received message in panel', message)
  if (!message.action) return
  if (message.action === actions.CONTENT_CHANGED) {
    requestData()
  } else if (message.action === actions.NEW_DATA && message.tabId === tabId) {
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
