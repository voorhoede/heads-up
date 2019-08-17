<template>
  <div>
    <button type="button" v-if="isDev" @click="reload()">REFRESH</button>
    <aside class="sidebar">
      <ul class="sidebar-list">
        <li class="sidebar-list__item">Application
          <ul class="sidebar-list">
            <li class="sidebar-list__item">
              <router-link class="sidebar__button" :to="{ name: 'page-meta' }">
                Page meta
              </router-link>
            </li>
            <li class="sidebar-list__item">
              <router-link class="sidebar__button" :to="{ name: 'twitter' }">
                Twitter
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <main class="panel" >
      <template v-if="head && head.url">
        <section class="section">

          <h1 class="heading-default heading">{{ $route.meta.title }}</h1>
          <p><a :href="head.url">{{ head.url }}</a></p>
        </section>

        <router-view></router-view>
      </template>
    </main>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        isDev: process.env.NODE_ENV === 'development'
      }
    },
    computed: {
      ...mapState(['head']),
    },
    methods: {
      reload() {
        window.location.reload()
      }
    }
  }
</script>

<style>
  html {
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--color-body);
  }

  body {
    height: 100%;
  }

  a {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-weight: normal;
    color: var(--color-action);
    text-decoration: underline;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .panel {
    width: calc(100% - 190px);
    margin-left: 190px;
  }

  .panel__twitter-preview {
    max-width: 521px;
    margin: 0;
    padding: 0;
    border: none;
  }

  .section {
    padding: 16px;
    border-bottom: 1px solid var(--color-grey-light);
  }

  .section:last-child {
    border-bottom: none;
  }

  .heading {
    margin-bottom: 16px;
  }

  .heading-default {
    font-size: 1rem;
  }

  .heading-small {
    font-size: .875rem;
    color: var(--color-grey-dark);
  }

  .heading-smaller {
    font-size: .8125rem;
  }

  .properties-list {
    list-style: none;
    width: 100%;
  }

  .properties-list__item {
    margin-bottom: 20px;
  }

  .properties-list__title {
    margin-bottom: 4px;
    font-weight: normal;
    font-size: .8125rem;
    color: var(--color-grey-medium);
  }

  .properties-list__content {
    display: inline-block;
    font-size: .8125rem;
  }

  .sidebar {
    position: fixed;
    height: 100%;
    width: 190px;
    font-weight: bold;
    font-size: .8125rem;
    border-right: 1px solid #d0d0d0;
    background-color: #f3f3f3;
    overflow: auto;
  }

  .sidebar-list {
    padding: 10px;
    list-style: none;
  }

  .sidebar-list .sidebar-list {
    margin-left: 10px;
    padding: 0 8px;
  }

  .sidebar-list__item:not(:last-child) {
    margin-bottom: 5px;
  }

  .sidebar__button {
    all: unset;
    cursor: pointer;
  }

  .properties-list__color-block {
    display: inline-block;
    margin-right: 3px;
    width: 10px;
    height: 10px;
    border: 1px solid #888;
  }

  @media (min-width: 650px) {
    .properties-list__item {
      display: flex;
      align-items: center;
    }

    .properties-list__color-block {
      display: inline-block;
      flex-basis: 10px;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .properties-list__title {
      flex-basis: 128px;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 0;
      margin-right: 16px;
      text-align: right;
    }

    .properties-list__content {
      width: 521px;
    }
  }
</style>
