const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const type = params.get('type');

    return {
      isDarkMode: params.get('theme') === 'dark',
      type,
    };
  },
});

app.mount('#app');
