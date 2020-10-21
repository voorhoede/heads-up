import { shallowRef, readonly } from 'vue';
import repo from '@/repo';

const _headData = shallowRef(null);

const setHeadData = payload => _headData.value = payload;

const getForUrl = url => repo
  .getMetaForUrl(url)
  .then(setHeadData)
  .catch(err => {
    console.error(err);
  });

export default () => ({
  data: readonly(_headData),
  getForUrl,
});
