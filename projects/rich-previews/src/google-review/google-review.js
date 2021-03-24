const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;

    return {
      authorName: params.get('authorName'),
      description: params.get('description'),
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
      itemReviewedAuthorName: params.get('itemReviewedAuthorName'),
      itemReviewedName: params.get('itemReviewedName'),
      itemReviewedType: params.get('itemReviewedType'),
      publisherName: params.get('publisherName'),
      reviewRatingValue: params.get('reviewRatingValue'),
    };
  },
});

app.mount('#app');
