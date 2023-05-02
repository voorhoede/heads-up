<template>
  <div
    class="opensearch-preview"
    :class="{ '-theme-with-dark-background': dark }"
  >
    <!-- Preview Bar -->
    <div class="opensearch-preview__bar">
      <button class="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      <button class="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>
      </button>
      <button class="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/><path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </div>

    <!-- Favorites -->
    <div class="opensearch-preview__favorites">
      <button class="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <path fill="#e42424" d="M2.5 2.5h24v24h-24zM37.6 2.5h24v24h-24zM73.5 2.5h24v24h-24z"/>
          <path fill="#1eca02" d="M2.9 38h24v24h-24z"/>
          <path fill="#16ac00" d="M2.5 73.5h24v24h-24z"/>
          <path fill="#4c80ff" d="M37.6 38h24v24h-24z"/>
          <path fill="#fec202" d="M73.5 38h24v24h-24z"/>
          <path fill="#ffb200" d="M37.6 73.6h24v24h-24zM73.5 73.7h24v24h-24z"/>
        </svg>
        Apps
      </button>
      <button class="button">
        {{ title }}
      </button>
    </div>

    <div class="opensearch-preview__url-bar">
      <div class="opensearch-preview__url">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <span>Search on {{ title }} |</span>
        <span class="opensearch-preview__cursor">|</span>
      </div>
      <div>
        <ul class="opensearch-preview__search-results">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
            <span class="opensearch-preview__search-keyword">
              &lt;Type a search term&gt;
            </span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <span>{{ titleLowercase }}</span>
            <span class="opensearch-preview__search-keyword">&nbsp;- Google Search</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const dark = computed(() => props.data.theme === 'dark');
    const title = computed(() => props.data.title);
    const titleLowercase = computed(() => title.value.toLowerCase());

    return {
      dark,
      title,
      titleLowercase,
    };
  },
};
</script>

<style>
@import "../../../rich-previews/@shared/css/defaults.css";

:root {
  --opensearch-icon-color: rgb(102, 102, 102);
  --opensearch-background-color: rgb(255, 255, 255);
  --opensearch-url-bar-color: rgb(255, 255, 255);
  --opensearch-shadow-color: rgb(170, 170, 170);
  --opensearch-font-color: rgb(0, 0, 0);
  --opensearch-font-alt-color: rgb(102, 102, 102);
}

.-theme-with-dark-background {
  --opensearch-icon-color: rgb(255, 255, 255);
  --opensearch-background-color: rgb(47, 47, 50);
  --opensearch-url-bar-color: rgb(30, 30, 32);
  --opensearch-shadow-color: rgb(0, 0, 0);
  --opensearch-font-color: rgb(255, 255, 255);
  --opensearch-font-alt-color: rgb(255, 255, 255);
}

.opensearch-preview {
  position: relative;
  height: 140px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgb(126, 126, 126);
  background-color: var(--opensearch-background-color);
  color: var(--opensearch-font-color);
  font-size: 14px;
  user-select: none;
}

.opensearch-preview__bar {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 12px 4px 4px;
}

.opensearch-preview .button {
  padding: 5px;
  transition: background-color .3s ease;
  border: none;
  border-radius: 50%;
  background-color: transparent;
}

.opensearch-preview .button:focus {
  outline: none;
}

.opensearch-preview .button:hover {
  background-color: rgba(255, 255, 255, .05);
}

.opensearch-preview .button:active {
  background-color: rgba(255, 255, 255, .1);
}

.opensearch-preview .button svg {
  display: block;
  width: 20px;
  height: 20px;
  fill: var(--opensearch-icon-color);
}

.opensearch-preview__favorites {
  display: flex;
  flex-direction: row;
  padding: 8px 4px;
  font-size: 13px;
}

.opensearch-preview__favorites .button {
  display: flex;
  align-items: center;
  margin-right: 4px;
  padding: 7px;
  transition: background-color .3s ease;
  border: none;
  border-radius: 20px;
  background-color: transparent;
}

.opensearch-preview__favorites .button svg {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.opensearch-preview__favorites .button:focus {
  outline: none;
}

.opensearch-preview__favorites .button:hover {
  background-color: rgba(255, 255, 255, .05);
}

.opensearch-preview__favorites .button:active {
  background-color: rgba(255, 255, 255, .1);
}

.opensearch-preview__url-bar {
  display: flex;
  position: absolute;
  top: 5px;
  left: 100px;
  flex-direction: column;
  width: calc(100% - 115px);
  border-radius: 9px;
  background-color: var(--opensearch-url-bar-color);
  box-shadow: -1px 7px 15px 0px var(--opensearch-shadow-color);
}

.opensearch-preview__url-bar svg {
  width: 19px;
  height: 19px;
  margin-right: 16px;
  fill: var(--opensearch-icon-color);
}

.opensearch-preview__url {
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.opensearch-preview__cursor {
  margin-left: 4px;
  animation: blink 1.2s linear infinite;
  font-size: 20px;
  line-height: 1;
}

.opensearch-preview__search-results {
  list-style: none;
}

.opensearch-preview__search-results li {
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.opensearch-preview__search-results li:first-child {
  background-color: rgba(170, 170, 170, .25);
}

.opensearch-preview__search-keyword {
  color: var(--opensearch-font-alt-color);
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  49% {
    opacity: 1;
  }
  51% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
