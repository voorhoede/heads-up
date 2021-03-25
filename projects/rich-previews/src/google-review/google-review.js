const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const authorName = params.get('authorName');
    const description = params.get('description');
    const itemReviewedName = params.get('itemReviewedName');
    const itemReviewedType = params.get('itemReviewedType');
    const publisherName = params.get('publisherName');
    const reviewRatingValue = params.get('reviewRatingValue');

    const hasRequiredData = () => {
      return (
        (authorName && authorName !== 'undefined') &&
        (description && description !== 'undefined') &&
        (itemReviewedName && itemReviewedName !== 'undefined') &&
        (itemReviewedType && itemReviewedType !== 'undefined') &&
        (publisherName && publisherName !== 'undefined')
      );
    };

    return {
      authorName,
      description,
      hasRequiredData: hasRequiredData(),
      hasShortTitle: params.get('itemReviewedName').length <= 12,
      isBook: itemReviewedType.toLowerCase() === 'book',
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
      isMovie: itemReviewedType.toLowerCase() === 'movie',
      itemReviewedAuthorName: params.get('itemReviewedAuthorName'),
      itemReviewedName,
      itemReviewedType,
      publisherName,
      reviewRatingValue: reviewRatingValue !== 'undefined'
        ? reviewRatingValue
        : undefined,
    };
  },
});

app.mount('#app');
