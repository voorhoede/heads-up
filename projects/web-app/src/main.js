import { createApp } from 'vue';
import '@/sw/register';
import router from '@/router';
// import store from '@/store';
import AppShell from '@/components/app-shell/app-shell';

import './style/index.css';

createApp(AppShell)
  // .use(store)
  .use(router)
  .mount('#app');

// Specific test for web-app
