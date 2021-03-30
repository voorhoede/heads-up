export const TYPES = {
  'default': {
    urlSegment: null,
    updatedOn: 'Mar 15, 2021',
    hasSinglePreview: true,
    resources: [],
  },
  'BreadcrumbList': {
    urlSegment: 'breadcrumb',
    updatedOn: 'Mar 15, 2021',
    hasSinglePreview: true,
    resources: [ {
      label: 'Advanced SEO: Breadcrumb (on developers.google)',
      url: 'https://developers.google.com/search/docs/data-types/breadcrumb',
    } ],
  },
  'NewsArticle': {
    urlSegment: 'article',
    updatedOn: 'Jan 26, 2021',
    hasSinglePreview: false,
    resources: [ {
      label: 'Advanced SEO: Article (on developers.google)',
      url: 'https://developers.google.com/search/docs/data-types/article',
    } ],
  },
  'Product': {
    urlSegment: 'product',
    updatedOn: 'Mar 02, 2021',
    hasSinglePreview: false,
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

export const getBreadcrumbSegments = itemListElement => {
  if (!itemListElement?.length > 0) return [];
  return itemListElement
    .map(item => item?.name || item?.item?.name)
    .filter(Boolean);
};

export const getImageUrl = img => {
  if (Array.isArray(img)) {
    return getImageUrl(img[0]);
  } else if (typeof img === 'string') {
    return img.split(', ')[0];
  }

  return img?.url;
};

export const getUrlSegments = url => {
  return truncateString(
    url
      .replace(/\/?$/, '/')           // Step 1: Make sure the URL ends with '/'.
      .replace(/\/(\d+)\//g, '/')     // Step 2: Remove URL segments that only contain digits.
      .replace(/(^\w+:|^)\/\//, ''),  // Step 3: Remove the protocol from the URL.
    46
  )
    .split('/')                       // Step 4: Split the segments.
    .filter(Boolean);                 // Step 5: Cleanup.
};
