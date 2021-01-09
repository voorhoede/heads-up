import { shallowRef, readonly } from 'vue';
import { useRouter } from 'vue-router';
import repo from '@/repo';

const _url = shallowRef('');
const _headData = shallowRef(null);
const _isLoading = shallowRef(false);

const getDataForUrlFactory = router => url => {
  if(url === _url.value) return;

  _isLoading.value = true;
  _url.value = url;

  return repo
    .getMetaForUrl(url)
    .then(data => {
      _headData.value = data;
      // @TODO :: Session storage?
      if(router.currentRoute.value.name === 'home') {
        router.replace({ name: 'meta' });
      }
    })
    .catch(err => {
      // @TODO :: Nicer error messaging to user
      console.error(`Failed to load head data for "${ url }".`, err);
      if(router.currentRoute.value.name !== 'home') {
        router.replace({ name: 'home' });
      }
    })
    .finally(() => {
      _isLoading.value = false;
    })
  ;
};

export default () => {
  const router = useRouter();

  return {
    url: readonly(_url),
    isLoading: readonly(_isLoading),
    data: readonly(_headData),
    getDataForUrl: getDataForUrlFactory(router),
  };
};
