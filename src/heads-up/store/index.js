import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export function createStore() {
  const store = new Vuex.Store({
    state: () => ({
      head: '',
    }),
    mutations: {
      SET_HEAD (state, { head }) {
        state.head = head
      },
    }
  })

  return store
}
