const getHostname = url => {
  if(!url) return '';
  const hostname = (new URL(url).hostname);
  const wwwPrefix = 'www.';
  return hostname.startsWith(wwwPrefix)
    ? hostname.slice(wwwPrefix.length)
    : hostname;
};

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
