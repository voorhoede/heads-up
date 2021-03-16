const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const dateModified = params.get('dateModified');
    const description = params.get('description');
    const headline = params.get('headline');
    const image = params.get('image');
    const publisherLogo = params.get('publisherLogo');
    const publisherName = params.get('publisherName');

    const hasRequiredData = () => {
      return (
        (dateModified && dateModified !== 'undefined') &&
        (description && description !== 'undefined') &&
        (headline && headline !== 'undefined') &&
        (image && image !== 'undefined') &&
        (publisherLogo && publisherLogo !== 'undefined') &&
        (publisherName && publisherName !== 'undefined')
      );
    };

    return {
      dateModified,
      description,
      hasRequiredData: hasRequiredData(),
      headline,
      image,
      isDarkMode: params.get('theme') === 'dark',
      publisherLogo,
      publisherName,
    };
  },
});

app.mount('#app');
