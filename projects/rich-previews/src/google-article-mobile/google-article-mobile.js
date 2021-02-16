const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const dateModified = params.get('dateModified');
    const description = params.get('description');
    const headline = params.get('headline');
    const image = params.get('image');
    const publisherLogo = params.get('publisherLogo');
    const publisherName = params.get('publisherName');
    const type = params.get('type');

    const hasRequiredData = () => {
      return (
        (dateModified && dateModified !== 'undefined') &&
        (description && description !== 'undefined') &&
        (headline && headline !== 'undefined') &&
        (image && image !== 'undefined') &&
        (publisherLogo && publisherLogo !== 'undefined') &&
        (publisherName && publisherName !== 'undefined') &&
        (type && type !== 'undefined')
      );
    };

    return {
      dateModified,
      description,
      hasRequiredData: hasRequiredData(),
      headline,
      image,
      isDarkMode: params.get('theme') === 'dark',
      platform: params.get('platform'),
      publisherLogo,
      publisherName,
      type,
    };
  },
});

app.mount('#app');
