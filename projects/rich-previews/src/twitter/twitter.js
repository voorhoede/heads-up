const app = Vue.createApp({
  setup() {
    const params = (new URL(window.location.href)).searchParams;
    const url = params.get('url');

    // const description = ref(params.get('description'));

    // const type = ref(params.get('type'));
    // const theme = ref(params.get('theme'));

    return {
      url,
      title: params.get('title'),
      // description,
      image: params.get('image'),
      type: params.get('card'),
      // theme,
    };
  },
});

app.mount('#app');
