import { tooltip } from './schema.js';
import { findMetaContent } from '@shared/lib/find-meta';
import { getBreadcrumbSegments, getImageUrl } from '@shared/lib/google-utils.js';

export const metadata = (data, head, type) => {
  return {
    BreadcrumbList: [
      {
        term: 'type',
        value: data['@type'],
        tooltip: tooltip[type]?.type ?? {},
      },
      {
        term: 'title (head)',
        value: head.title,
        tooltip: tooltip[type]?.headTitle ?? {},
      },
      {
        term: 'description (head)',
        value: findMetaContent(head, 'description'),
        tooltip: tooltip[type]?.headDescription ?? {},
      },
      {
        term: 'breadcrumb segments',
        value: `[${ getBreadcrumbSegments(data.itemListElement)
          .map(segment => `"${ segment }"`)
          .join(', ') }]`,
        type: 'code',
        tooltip: tooltip[type]?.itemListElement ?? {},
      },
    ],
    NewsArticle: [
      { term: '@type', value: data['@type'] },
      { term: 'headline', value: data['headline'] },
      { term: 'description', value: data['description'] },
      { term: 'dateModified', value: data['dateModified'] },
      { term: 'publisher - name', value: data['publisher']?.name },
      {
        term: 'publisher - logo',
        value: getImageUrl(data['publisher']?.logo),
        image: {
          href: getImageUrl(data['publisher']?.logo),
          url: getImageUrl(data['publisher']?.logo),
        },
        type: 'image',
      },
      {
        term: 'image',
        value: getImageUrl(data['image']),
        image: {
          href: getImageUrl(data['image']),
          url: getImageUrl(data['image']),
        },
        type: 'image',
      },
    ],
    Product: [
      {
        term: 'type',
        value: data['@type'],
        tooltip: tooltip[type]?.type ?? {},
      },
      {
        term: 'name',
        value: data.name,
        tooltip: tooltip[type]?.name ?? {},
      },
      {
        term: 'description',
        value: data.description,
        tooltip: tooltip[type]?.description ?? {},
      },
      {
        term: 'price',
        value: data.offers?.price,
        tooltip: tooltip[type]?.offersPrice ?? {},
      },
      {
        term: 'currency',
        value: data.offers?.priceCurrency,
        tooltip: tooltip[type]?.offersPriceCurrency ?? {},
      },
      {
        term: 'seller\'s name',
        value: data.offers?.seller?.name,
        tooltip: tooltip[type]?.offersSellerName ?? {},
      },
      {
        term: 'rating',
        value: data.aggregateRating?.ratingValue,
        tooltip: tooltip[type]?.aggregateRatingRatingValue ?? {},
      },
      {
        term: 'review count',
        value: data.aggregateRating?.reviewCount,
        tooltip: tooltip[type]?.aggregateRatingReviewCount ?? {},
      },
      {
        term: 'image',
        value: getImageUrl(data.image),
        image: {
          href: getImageUrl(data.image),
          url: getImageUrl(data.image),
        },
        type: 'image',
        tooltip: tooltip[type]?.image ?? {},
      },
    ],
  }[type];
};
