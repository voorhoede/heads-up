const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const type = params.get('type');

    return {
      type,
    };
  },
});

app.mount('#app');
