const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const description = params.get('headDescription');
    const breadcrumbSegments = params.get('breadcrumbSegments');
    const title = params.get('headTitle');
    const url = params.get('headUrl');

    const domainWithoutProtocol = new URL(url).origin.replace(/(^\w+:|^)\/\//, '');

    return {
      description: description.replace(/ ?<br ?\/?> ?/gi, ' '),
      isDarkMode: params.get('theme') === 'dark',
      title,
      url,
      urlSegments: [ domainWithoutProtocol, ...breadcrumbSegments.split(',') ],
    };
  },
});

app.mount('#app');
