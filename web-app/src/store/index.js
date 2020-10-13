import { createStore } from 'vuex';
import meta from './modules/meta.store';


export default createStore({
  modules: {
    meta,
  },
});
