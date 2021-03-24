import { getUrlSegments } from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const description = params.get('description');
    const url = params.get('url');

    return {
      description: description.replace(/ ?<br ?\/?> ?/gi, ' '),
      favicon: params.get('favicon'),
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
      title: params.get('title'),
      url,
      urlSegments: getUrlSegments(url),
    };
  },
});

app.mount('#app');
