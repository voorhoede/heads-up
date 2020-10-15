import { createApp } from 'vue';
import '@/sw/register';
import router from '@/router';
// import store from '@/store';
import Shell from '@/components/Shell/Shell';

createApp(Shell)
  // .use(store)
  .use(router)
  .mount('#app')
;
