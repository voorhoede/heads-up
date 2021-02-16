export const TYPES = {
  'NewsArticle': {
    urlSegment: 'article',
    updatedOn: 'Jan 26, 2021',
    resources: [ {
      label: 'Advanced SEO: Article (on developers.google)',
      url: 'https://developers.google.com/search/docs/data-types/article',
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
