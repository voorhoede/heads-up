import { createStore } from 'vuex';
import robotsParser from 'robots-txt-parser';
import xmlJs from 'xml-js';

const robotsTxt = robotsParser({
  allowOnNeutral: false,
});

export default createStore({
  state: () => ({
    urlIsCrawlable: false,
    head: {},
    robots: [],
    sitemap: {},
    theme: 'default',
  }),
  actions: {
    GET_ROBOTS_TXT ({ commit, state }) {
      robotsTxt.fetch(state.head.domain)
        .then(result => {
          if (result.sitemaps) {
            delete result.sitemaps;
          }

          const robots = Object.keys(result).map(key => ({
            name: key,
            ...result[key],
          }));

          commit('SET_ROBOTS', { robots });
        })
        .catch(error => console.error(error));
    },
    CHECK_CRAWLABLE_URL ({ commit, state }) {
      robotsTxt.canCrawl(state.head.url)
        .then(crawlable => commit('SET_CRAWLABLE_URL', { crawlable }))
        .catch(error => console.error(error));
    },
    GET_SITEMAP ({ commit, state }) {
      fetch(`https://${ state.head.domain }/sitemap.xml`)
        .then(res => res.text())
        .then(text => {
          const json = xmlJs.xml2json(text);
          // Convert to JSON first to set a fixed indentation
          // even if source code was minified.
          const sitemap = xmlJs.json2xml(json, { spaces: 2 });

          commit('SET_SITEMAP', { sitemap });
        })
        .catch(err => {
          console.log(err);
          commit('SET_SITEMAP', { sitemap: null });
        });
    },
  },
  mutations: {
    SET_CRAWLABLE_URL (state, { crawlable }) {
      state.urlIsCrawlable = crawlable;
    },
    SET_HEAD (state, { head }) {
      state.head = head;
    },
    SET_ROBOTS (state, { robots }) {
      state.robots = robots;
    },
    SET_SITEMAP (state, { sitemap }) {
      state.sitemap = sitemap;
    },
    SET_THEME (state, { theme }) {
      state.theme = theme;
    },
  },
});
