export const TYPES = {
  'default': {
    urlSegment: null,
    updatedOn: 'Mar 08, 2021',
    resources: [],
  },
  'NewsArticle': {
    urlSegment: 'article',
    updatedOn: 'Jan 26, 2021',
    resources: [ {
      label: 'Advanced SEO: Article (on developers.google)',
      url: 'https://developers.google.com/search/docs/data-types/article',
    } ],
  },
  'Product': {
    urlSegment: 'product',
    updatedOn: 'Mar 02, 2021',
    resources: [ {
      label: 'Advanced SEO: Product (on developers.google)',
      url: 'https://developers.google.com/search/docs/data-types/product',
    } ],
  },
};

export const splitTypes = jsonldData => {
  return Object.keys(jsonldData).reduce(
    (acc, type) => {
      acc[type in TYPES ? 0 : 1].push(type);
      return acc;
    },
    [ [], [] ]
  );
};

export const truncateString = (str, num) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};
