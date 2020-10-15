import { createApp } from 'vue';
import '@/sw/register';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';

import './style/index.css';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
