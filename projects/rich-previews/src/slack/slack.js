import { getHostname } from '../../@shared/js/utils.js';

const getImageFileSize = image => fetch(image, { method: 'HEAD' })
  .then(x => `${ Math.round(Number(x.headers.get('content-length')) / 1000) } kB`)
  .catch(() => (Promise.resolve('0 kB')));

const app = Vue.createApp({
  setup() {
    const { shallowRef } = Vue;
    const params = (new URL(window.location.href)).searchParams;
    const url = params.get('url');
    const description = params.get('description');
    const image = params.get('image');
    const isValidImage = (params.get('validImage') === 'true');

    const imageSize = shallowRef('');
    let additionalData;

    if (isValidImage) {
      getImageFileSize(image)
        .then(size => {
          imageSize.value = size;
        })
        .catch(err => {
          console.error('Issue in getting the image file size', err);
        })
      ;
    }

    try {
      additionalData = JSON.parse(params.get('additionalData'));
    }
    catch (err) {
      console.error('Invalid \'additionalData\' value.');
    }

    return {
      url,
      title: params.get('title'),
      description: description && description.substring(0, 700),
      image,
      imageIsBig: (params.get('imageIsBig') === 'true'),
      isValidImage,
      imageSize,
      favicon: params.get('favicon'),
      siteName: params.get('sitename'),
      hostname: getHostname(url),
      additionalData,
      dark: params.get('theme') === 'dark',
      emojiCount: Math.floor(Math.random() * 8) + 1,
    };
  },
});

app.mount('#app');
