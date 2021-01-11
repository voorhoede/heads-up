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
    .catch(err => {
      // @TODO :: Nicer error messaging to user
      console.error(`Failed to load head data for "${ url }".`, err);
      throw err;
    })
    // We use `then` after `catch` so the error possibly
    // thrown here isn't immediately caught
    .then(data => {
      // If we get invalid or empty data, throw error
      if(!data || !Object.keys(data).length) {
        const errorMsg = `Received invalid or empty data for "${ url }".`;
        // @TODO :: Nicer error messaging to user
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      // On success, save and return data
      _headData.value = data;
      if(sessionStorage) {
        sessionStorage.setItem('url', url);
      }
      return data;
    })
    .finally(() => {
      _isLoading.value = false;
    })
  ;
};

const getDataForUrlWithRouteGuard = (routeName, routeResolver) => async url => {
  let routed = false;
  try {
    await getDataForUrl(url);
    if(routeName === 'home') {
      routeResolver({ name: 'meta' });
      routed = true;
    }
  }
  catch(err) {
    if(routeName !== 'home') {
      await routeResolver({ name: 'home' });
      // We reset `headData` only here so we've already routed
      // away from any page that might depend on that data
      _headData.value = null;
      routed = true;
    }
  }
  return routed;
};

export default () => {
  return {
    url: readonly(_url),
    isLoading: readonly(_isLoading),
    data: readonly(_headData),
    getDataForUrlWithRouteGuard,
  };
};
