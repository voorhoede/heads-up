const BASE_URL = '.netlify/functions/api';

const handleErrors = async res => {
  if(!res.ok) {
    const errorBody = await res.json();
    throw new Error(`URL parser failed with statuscode ${ res.status }: ${ errorBody.error }`);
  }
  return res;
};

export default {
  getMetaForUrl(url) {
    return fetch(BASE_URL + '?url=' + url)
      .then(handleErrors)
      .then(res => res.json());
  },
};
