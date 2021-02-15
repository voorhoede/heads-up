const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;

    return {
      dateModified: params.get('dateModified'),
      description: params.get('description'),
      headline: params.get('headline'),
      image: params.get('image'),
      isDarkMode: params.get('theme') === 'dark',
      publisherLogo: params.get('publisherLogo'),
      publisherName: params.get('publisherName'),
      type: params.get('type'),
    };
  },
});

app.mount('#app');
