import '@/style/index.css';
import { createApp } from 'vue';
import * as actions from '@/lib/message-actions';
import router from './router';
import store from './store';
import AppShell from '@/components/app-shell/app-shell';

const background = chrome.runtime.connect({ name: 'devtools' });
const tabId = chrome.devtools.inspectedWindow.tabId;
const requestData = () => background.postMessage({ tabId, action: actions.GET_DATA });
requestData();

// Listen to messages from the background script.
background.onMessage.addListener(message => {
  if (!message.action) return;
  if (message.action === actions.CONTENT_CHANGED) {
    requestData();
  } else if (message.action === actions.NEW_DATA && message.tabId === tabId) {
    store.commit('SET_HEAD', { head: message.data.head });
    store.dispatch('GET_STRUCTURED_DATA');
    store.dispatch('GET_ROBOTS_TXT');
    store.dispatch('CHECK_CRAWLABLE_URL');
    store.dispatch('GET_SITEMAP');
    store.dispatch('GET_OPENSEARCH_FILE');
  }
});

createApp(AppShell)
  .use(store)
  .use(router)
  .mount('#app')
;
