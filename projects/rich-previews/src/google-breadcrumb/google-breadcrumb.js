import { truncateString } from '../../../@shared/lib/google-utils.js';

const app = Vue.createApp({
  setup() {
    const params = new URL(window.location.href).searchParams;
    const description = params.get('headDescription');
    const breadcrumbSegments = params.get('breadcrumbSegments');
    const title = params.get('headTitle');
    const url = params.get('headUrl');

    const domainWithoutProtocol = new URL(url).origin.replace(/(^\w+:|^)\/\//, '');

    return {
      breadcrumbSegments: truncateString(
        `${ domainWithoutProtocol },${ breadcrumbSegments || '' }`, 46
      ).split(',').filter(Boolean),
      description: description.replace(/ ?<br ?\/?> ?/gi, ' '),
      isDarkMode: params.get('theme') === 'dark',
      title,
      url,
    };
  },
});

app.mount('#app');
