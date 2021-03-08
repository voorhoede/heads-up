const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    // const title = params.get('title');

    return {
      isDarkMode: params.get('theme') === 'dark',
      // title,
    };
  },
});

app.mount('#app');
