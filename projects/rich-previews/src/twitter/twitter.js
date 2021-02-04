import { getHostname } from '../../@shared/js/utils.js';

const app = Vue.createApp({
  setup() {
    const params = (new URL(window.location.href)).searchParams;
    const url = params.get('url');

    return {
      url,
      title: params.get('title'),
      description: params.get('description'),
      image: params.get('image'),
      type: params.get('card'),
      hostname: getHostname(url),
      dark: params.get('theme') === 'dark',
    };
  },
});

app.mount('#app');
