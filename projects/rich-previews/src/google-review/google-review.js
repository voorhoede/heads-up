const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;

    return {
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
    };
  },
});

app.mount('#app');
