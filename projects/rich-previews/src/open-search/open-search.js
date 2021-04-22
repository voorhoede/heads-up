const app = Vue.createApp({
  setup() {
    const params = (new URL(window.location.href)).searchParams;
    const title = params.get('title')?.split(',')[0];

    return {
      title,
      titleLowercase: title && title.toLowerCase(),
      dark: params.get('theme') === 'dark',
    };
  },
});

app.mount('#app');
