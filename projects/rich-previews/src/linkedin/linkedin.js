import { getHostname } from '../../@shared/js/utils.js';

const app = Vue.createApp({
  setup() {
    const params = (new URL(window.location.href)).searchParams;
    const url = params.get('url');

    return {
      url,
      title: params.get('title'),
      image: params.get('image'),
      imageIsBig: (params.get('imageIsBig') === 'true'),
      hostname: getHostname(url),
      dark: params.get('theme') === 'dark',
      likes: Math.floor(Math.random() * 98) + 1,
    };
  },
});

app.mount('#app');
