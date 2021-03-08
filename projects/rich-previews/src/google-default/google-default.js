import { truncateString } from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const description = params.get('description');
    const title = params.get('title');
    const url = params.get('url');

    return {
      description,
      isDarkMode: params.get('theme') === 'dark',
      title,
      url,
      urlSegments: truncateString(url.replace(/(^\w+:|^)\/\//, ''), 30).split('/').filter(Boolean),
    };
  },
});

app.mount('#app');
