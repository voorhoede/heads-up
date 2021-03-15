import { getUrlSegments } from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const description = params.get('headDescription');
    const title = params.get('headTitle');
    const url = params.get('headUrl');

    return {
      description,
      isDarkMode: params.get('theme') === 'dark',
      title,
      url,
      urlSegments: getUrlSegments(url),
    };
  },
});

app.mount('#app');
