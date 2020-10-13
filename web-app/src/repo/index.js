const BASE_URL = '.netlify/functions/api';

export default {
  getMetaForUrl(url) {
    return fetch(BASE_URL + '?url=' + url)
      .then(response => response.json());
  },
};
