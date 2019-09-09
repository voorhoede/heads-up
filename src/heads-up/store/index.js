import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export function createStore() {
  const store = new Vuex.Store({
    state: () => ({
      head: {},
      theme: 'default'
    }),
    mutations: {
      SET_HEAD (state, { head }) {
        state.head = head
      },
      SET_THEME (state, { theme }) {
        state.theme = theme
      }
    }
  })

  return store
}
