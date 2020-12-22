import { createStore } from 'vuex';
import { parseStringPromise } from 'xml2js';
import robotsParser from 'robots-txt-parser';

import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findLinkHref } from '@shared/lib/find-meta';

const robotsTxt = robotsParser({
  allowOnNeutral: false,
});

export default createStore({
  state: () => ({
    urlIsCrawlable: false,
    head: {},
    openSearchContent: null,
    openSearchUrl: null,
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

      async function createSitemapResponse(url) {
        const isXml = url => /.xml$/.test(url);
        const isTxt = url => /.txt$/.test(url);

        const parseTextContent = content => ({
          sitemap: content
            .split('\n')
            .map(line => ({ loc: line })),
        });

        let content = await fetch(url)
          .then(res => res.text());

        if (isXml(url)) {
          content = parseStringPromise(content, {
            emptyTag: null,
            explicitArray: false,
            explicitRoot: false,
            ignoreAttrs: true,
            normalizeTags: true,
            trim: true,
          })
            .catch(() => null);
        }

        if (isTxt(url)) {
          content = parseTextContent(content);
        }

        return content;
      }

      function formatSitemapData(data) {
        return data.map(item => {
          const { loc, ...data } = item;

          if (Object.keys(item).length === 1 && Object.keys(item)[0] === 'loc') {
            return loc;
          }

          return { loc, data };
        });
      }

      function objectMap (obj, fn) {
        return Object.fromEntries(
          Object.entries(obj).map(
            ([ k, v ], i) => [ k, fn(v, k, i) ]
          )
        );
      }

      if (sitemapUrls && sitemapUrls.length) {
        const sitemapResponses = await Promise.all(
          sitemapUrls.map(url => createSitemapResponse(url))
        );

        sitemaps = sitemapUrls.map((url, index) => {
          const sitemapResponse = sitemapResponses[index];

          if (!sitemapResponse) {
            return {
              sitemapData: null,
              sitemapUrl: url,
            };
          }

          return {
            sitemapData: objectMap(sitemapResponse, v => formatSitemapData(v)),
            sitemapUrl: url,
          };
        });
      }

      commit('SET_SITEMAPS', { sitemaps });
    },
    async GET_OPENSEARCH_URL ({ commit, state }) {
      const href = findLinkHref(state.head, 'search');

      if (href) {
        const url = createAbsoluteUrl(state.head, href);
        commit('SET_OPENSEARCH_URL', { url });
        return url;
      } else {
        commit('SET_OPENSEARCH_URL', { url: null });
        return null;
      }
    },
    async GET_OPENSEARCH_FILE ({ commit, dispatch, state }) {
      const openSearchUrl = await dispatch('GET_OPENSEARCH_URL');

      if (openSearchUrl) {
        const url = createAbsoluteUrl(state.head, openSearchUrl);
        fetch(url)
          .then(res => res.text())
          .then(content => commit('SET_OPENSEARCH_CONTENT', { content }))
          .catch(error => console.error(error));
      } else {
        commit('SET_OPENSEARCH_CONTENT', { content: null });
      }
    },
  },
  mutations: {
    SET_CRAWLABLE_URL (state, { crawlable }) {
      state.urlIsCrawlable = crawlable;
    },
    SET_HEAD (state, { head }) {
      state.head = head;
    },
    SET_OPENSEARCH_CONTENT (state, { content }) {
      state.openSearchContent = content;
    },
    SET_OPENSEARCH_URL (state, { url }) {
      state.openSearchUrl = url;
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
