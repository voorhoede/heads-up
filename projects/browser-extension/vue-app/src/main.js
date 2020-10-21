import '@/style/index.css';
import { createApp } from 'vue'

import router from './router'
import store from './store'
import AppShell from '@/components/app-shell/app-shell';

createApp(AppShell).use(store).use(router).mount('#app')
