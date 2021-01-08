import { shallowRef, readonly } from 'vue';
import repo from '@/repo';
import router from '@/router';

const _headData = shallowRef(null);

const setHeadData = payload => _headData.value = payload;

const getForUrl = url => repo
  .getMetaForUrl(url)
  .then(setHeadData)
  .catch(err => {
    console.error(err);
    console.log(router);
  });

export default () => ({
  data: readonly(_headData),
  getForUrl,
});
