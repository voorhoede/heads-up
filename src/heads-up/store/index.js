import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      head: {},
      robots: [],
      theme: 'default'
    }),
    mutations: {
      SET_HEAD (state, { head }) {
        state.head = head
      },
      SET_THEME (state, { theme }) {
        state.theme = theme
      },
      SET_ROBOTS (state, { robots }) {
        state.robots = robots
      },
    }
  })
}

const store = createStore()

export default store
