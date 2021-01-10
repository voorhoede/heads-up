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
      _headData.value = null;
      throw err;
    })
    // We use `then` after `catch` so the error possibly
    // thrown here isn't immediately caught
    .then(data => {
      // If we get empty data, throw error
      if(Object.keys(data).length) {
        const errorMsg = `Received invalid or empty data for "${ url }".`;
        // @TODO :: Nicer error messaging to user
        console.error(errorMsg);
        _headData.value = data;
        throw new Error(errorMsg);
      }
      _headData.value = data;
      return data;
      // @TODO :: Session storage?
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
      routeResolver({ name: 'home' });
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
