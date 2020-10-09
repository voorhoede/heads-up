import Vue from 'vue'
import Vuex from 'vuex'
import robotsParser from 'robots-txt-parser'
Vue.use(Vuex)

const robotsTxt = robotsParser({
  allowOnNeutral: false
})

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      urlIsCrawlable: false,
      head: {},
      robots: [],
      theme: 'default'
    }),
    actions: {
      GET_ROBOTS_TXT ({ commit, state }) {
        robotsTxt.fetch(state.head.domain)
          .then((result) => {
            if (result.sitemaps) {
              delete result.sitemaps
            }

            const robots = Object.keys(result).map((key) => ({
              name: key,
              ...result[key],
            }))

            commit('SET_ROBOTS', { robots: robots })
          })
          .catch((error) => console.error(error))
      },
      CHECK_CRAWLABLE_URL ({ commit, state }) {
        robotsTxt.canCrawl(state.head.url)
          .then((crawlable) => commit('SET_CRAWLABLE_URL', { crawlable: crawlable }))
          .catch((error) => console.error(error))
      }
    },
    mutations: {
      SET_CRAWLABLE_URL (state, { crawlable }) {
        state.urlIsCrawlable = crawlable
      },
      SET_HEAD (state, { head }) {
        state.head = head
      },
      SET_ROBOTS (state, { robots }) {
        state.robots = robots
      },
      SET_THEME (state, { theme }) {
        state.theme = theme
      },
    }
  })
}

const store = createStore()

export default store
