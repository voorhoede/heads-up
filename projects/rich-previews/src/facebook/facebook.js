import { getHostname } from '../../@shared/js/utils.js';

const app = Vue.createApp({
  setup() {
    const params = (new URL(window.location.href)).searchParams;
    const url = params.get('url');
    const title = params.get('title');
    const description = params.get('description');

    return {
      url,
      title: title && title.substring(0, 247),
      description: description && description.substring(0, 250),
      style: params.get('style') === 'desktop' ? 'desktop' : 'mobile',
      imageSpecified: params.get('imageSpecified') === 'true',
      image: null,
      // image: params.get('image'),
      imageIsBig: (params.get('imageIsBig') === 'true'),
      hostname: getHostname(url),
      dark: params.get('theme') === 'dark',
      interaction: Math.floor(Math.random() * 488) + 411,
      comments: Math.floor(Math.random() * 388) + 11,
      shares: Math.floor(Math.random() * 88) + 11,
    };
  },
});

app.mount('#app');
