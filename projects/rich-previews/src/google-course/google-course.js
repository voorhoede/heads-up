import {
  getUrlSegments,
  truncateString
} from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const breadcrumbSegments = params.get('breadcrumbSegments');
    const url = params.get('url');

    const domainWithoutProtocol = new URL(url).origin.replace(/(^\w+:|^)\/\//, '');

    return {
      breadcrumbSegments: breadcrumbSegments
        ? truncateString(
          `${ domainWithoutProtocol },${ breadcrumbSegments }`, 46
        ).split(',').filter(Boolean)
        : getUrlSegments(url),
      description: params.get('description'),
      favicon: params.get('favicon'),
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
      name: params.get('name'),
      providerName: params.get('providerName'),
      title: params.get('headTitle'),
      url,
    };
  },
});

app.mount('#app');
