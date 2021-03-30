import {
  getUrlSegments,
  truncateString
} from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const breadcrumbSegments = params.get('breadcrumbSegments');
    const description = params.get('description');
    const name = params.get('name');
    const providerName = params.get('providerName');
    const url = params.get('url');

    const domainWithoutProtocol = new URL(url).origin.replace(/(^\w+:|^)\/\//, '');

    const hasRequiredData = () => {
      return (
        (description && description !== 'undefined') &&
        (name && name !== 'undefined') &&
        (providerName && providerName !== 'undefined') &&
        (url && url !== 'undefined')
      );
    };

    return {
      breadcrumbSegments: breadcrumbSegments
        ? truncateString(
          `${ domainWithoutProtocol },${ breadcrumbSegments }`, 46
        ).split(',').filter(Boolean)
        : getUrlSegments(url),
      favicon: params.get('favicon'),
      hasRequiredData: hasRequiredData(),
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
      title: params.get('headTitle'),
      description,
      name,
      providerName,
      url,
    };
  },
});

app.mount('#app');
