const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const type = params.get('type');

    const hasRequiredData = () => {
      return (
        (type && type !== 'undefined')
      );
    };

    return {
      hasRequiredData: hasRequiredData(),
      isDarkMode: params.get('theme') === 'dark',
      platform: params.get('platform'),
      type,
    };
  },
});

app.mount('#app');
