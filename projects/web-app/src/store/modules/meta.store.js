export default {
  namespaced: true,

  state: {
    meta: null,
  },

  getters: {
    meta: state => state.meta,
  },

  mutations: {
    SET_META: (state, payload) => {
      state.meta = Object.freeze(payload);
    },
  },

  actions: {
    setMeta({ commit }, meta) {
      commit('SET_META', meta);
    },
  },
};
