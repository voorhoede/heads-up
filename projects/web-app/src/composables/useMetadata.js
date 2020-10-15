import { shallowRef, readonly } from 'vue';
import repo from '@/repo';

const _metadata = shallowRef(null);

const setMetadata = payload => _metadata.value = payload;

const getForUrl = url => repo
  .getMetaForUrl(url)
  .then(setMetadata)
  .catch(err => {
    console.error(err);
  })
;

export default () => ({
  data: readonly(_metadata),
  getForUrl,
});
