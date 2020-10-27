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
    sitemaps: [],
    sitemapUrls: [],
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
    async GET_SITEMAP_URLS({ commit, state }) {
      const urls = await robotsTxt.fetch(state.head.domain)
        .then(result => {
          if (result.sitemaps) {
            return result.sitemaps;
          }
        })
        .catch(error => console.error(error));

      commit('SET_SITEMAP_URLS', { urls });
    },
    CHECK_CRAWLABLE_URL ({ commit, state }) {
      robotsTxt.canCrawl(state.head.url)
        .then(crawlable => commit('SET_CRAWLABLE_URL', { crawlable }))
        .catch(error => console.error(error));
    },
    async GET_SITEMAP ({ commit, dispatch, state }) {
      await dispatch('GET_SITEMAP_URLS');
      const { sitemapUrls } = state;
      let sitemaps = [];

      function createSitemapResponse(url) {
        return fetch(url)
          .then(res => res.text())
          .then(text => JSON.parse(xmlJs.xml2json(text)))
          .catch(() => null);
      }

      if (sitemapUrls && sitemapUrls.length) {
        const sitemapResponses = await Promise.all(
          sitemapUrls.map(url => createSitemapResponse(url))
        );

        sitemaps = sitemapUrls.map((url, index) => ({
          [url]: sitemapResponses[index],
        }));
      } else {
        sitemaps = await createSitemapResponse(`${ state.head.domain }/sitemap.xml`) || [];
      }

      commit('SET_SITEMAPS', { sitemaps });
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
    SET_SITEMAPS (state, { sitemaps }) {
      state.sitemaps = sitemaps;
    },
    SET_SITEMAP_URLS (state, { urls }) {
      state.sitemapUrls = urls;
    },
    SET_THEME (state, { theme }) {
      state.theme = theme;
    },
  },
});
