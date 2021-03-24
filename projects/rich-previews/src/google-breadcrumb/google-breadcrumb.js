import { truncateString } from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const breadcrumbSegments = params.get('breadcrumbSegments');
    const description = params.get('headDescription');
    const url = params.get('headUrl');

    const domainWithoutProtocol = new URL(url).origin.replace(/(^\w+:|^)\/\//, '');

    return {
      breadcrumbSegments: truncateString(
        `${ domainWithoutProtocol },${ breadcrumbSegments || '' }`, 46
      ).split(',').filter(Boolean),
      description: description.replace(/ ?<br ?\/?> ?/gi, ' '),
      favicon: params.get('favicon'),
      isDarkMode: params.get('theme') === 'dark',
      isMobile: params.get('isMobile') === 'true',
      title: params.get('headTitle'),
      url,
    };
  },
});

app.mount('#app');
