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
      hostname: getHostname(url),
      currentTime: new Date().toLocaleTimeString().substr(0, 5),
    };
  },
});

app.mount('#app');
