import { getUrlSegments } from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const description = params.get('description');
    const title = params.get('title');
    const url = params.get('url');

    return {
      description: description.replace(/ ?<br ?\/?> ?/gi, ' '),
      isDarkMode: params.get('theme') === 'dark',
      title,
      url,
      urlSegments: getUrlSegments(url),
    };
  },
});

app.mount('#app');
