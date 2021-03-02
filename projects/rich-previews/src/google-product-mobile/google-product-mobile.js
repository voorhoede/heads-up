const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const aggregateRatingValue = params.get('aggregateRatingValue');
    const aggregateReviewCount = params.get('aggregateReviewCount');
    const description = params.get('description');
    const image = params.get('image');
    const name = params.get('name');
    const offerPrice = params.get('offerPrice');
    const offerSellerName = params.get('offerSellerName');
    const type = params.get('type');

    const hasRequiredData = () => {
      return (
        (description && description !== 'undefined') &&
        (image && image !== 'undefined') &&
        (name && name !== 'undefined') &&
        (offerPrice && offerPrice !== 'undefined') &&
        (offerSellerName && offerSellerName !== 'undefined') &&
        (type && type !== 'undefined')
      );
    };

    const hasRating = () => {
      return (
        (aggregateRatingValue && aggregateRatingValue !== 'undefined') &&
        (aggregateReviewCount && aggregateReviewCount !== 'undefined')
      );
    };

    return {
      aggregateRatingValue: Math.round(aggregateRatingValue),
      aggregateReviewCount,
      description,
      hasRating: hasRating(),
      hasRequiredData: hasRequiredData(),
      image,
      isDarkMode: params.get('theme') === 'dark',
      name,
      offerPrice,
      offerSellerName,
      platform: params.get('platform'),
      type,
    };
  },
});

app.mount('#app');
