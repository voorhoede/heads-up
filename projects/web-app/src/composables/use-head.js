import { shallowRef, readonly } from 'vue';
import repo from '@/repo';

const _url = shallowRef('');
const _headData = shallowRef(null);
const _isLoading = shallowRef(false);

const getDataForUrl = url => {
  if(url === _url.value) return Promise.resolve(_headData);

  _isLoading.value = true;
  _url.value = url;

  return repo
    .getMetaForUrl(url)
    .then(data => {
      _headData.value = data;
      return data;
      // @TODO :: Session storage?
    })
    .finally(() => {
      _isLoading.value = false;
    })
  ;
};

// const getDataForUrlWithRouteGuard = (routeName, routeResolver) => url => {

// };

export default () => {
  return {
    url: readonly(_url),
    isLoading: readonly(_isLoading),
    data: readonly(_headData),
    getDataForUrl,
  };
};
