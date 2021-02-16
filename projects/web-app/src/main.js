import { createApp } from 'vue';
import '@/sw/register';
import router from '@/router';
import AppShell from '@/components/app-shell/app-shell';

import './style/index.css';

createApp(AppShell)
  .use(router)
  .mount('#app');
