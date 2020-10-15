<template>
  <div class="collapsible-list">
    <details
      v-for="(section, key) in formattedListData"
      :key="key"
      class="collapsible-list__section"
      open
    >
      <summary><ChevronRightIcon />{{ key }}</summary>
      <ul class="collapsible-list__list">
        <li
          v-for="(item, index) in section"
          :key="index"
          class="collapsible-list__list-item"
        >
          <span
            v-if="item.length === 1"
            class="collapsible-list__attribute-value"
          >
            <span class="collapsible-list__attribute">{{ item[0][0] }}</span> <span
              class="collapsible-list__value"
              :title="item[0][1]"
            >{{ item[0][1] }}</span>
          </span>
          <details
            v-else
            class="collapsible-list__property-table"
          >
            <summary>
              <ChevronRightIcon />
              <span class="collapsible-list__attribute-value">
                <span class="collapsible-list__attribute">{{ item[0][0] }}</span> <span
                  class="collapsible-list__value"
                  :title="item[0][1]"
                >{{ item[0][1] }}</span>
              </span>
            </summary>

            <dl class="collapsible-list__table-row collapsible-list__attribute-value">
              <template v-for="(row, rowIndex) in item">
                <template v-for="(column, i) in row">
                  <component
                    :is="i === 0 ? 'dt' : 'dd'"
                    :key="`${row}${column}`"
                    :class="{
                      'collapsible-list__attribute': i === 0,
                      'collapsible-list__value': i === 1
                    }"
                    :title="i === 1 ? column : undefined"
                    :hidden="rowIndex === 0"
                  >
                    {{ column }}
                  </component>
                </template>
              </template>
            </dl>
          </details>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
import ChevronRightIcon from '../assets/icons/chevron-right.svg';

export default {
  components: { ChevronRightIcon },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formattedListData() {
      return this.data
        .filter(item => item.rel)
        .map(item => {
          return Object.keys(item)
            .filter(key => /data-/.test(key) === false)
            .reduce((object, key) => ({ ...object, [key]: item[key] }), {});
        })
        .reduce((collection, item) => {
          if (collection[item.rel] === undefined) {
            collection[item.rel] = [];
          }

          const { rel, ...rest } = item;
          collection[rel].push(Object.entries(rest));
          return collection;
        }, {});
    },
  },
};
</script>

<style>
  .collapsible-list__section {
    position: relative;
    font-weight: bold;
  }

  .collapsible-list__section:not(:first-of-type) {
    padding-top: 0.5rem;
  }

  .collapsible-list__section:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 50%;
    width: 100vw;
    height: 1px;
    transform: translate(-50%);
    opacity: 0.5;
    background-color: var(--divider-color);
  }

  .collapsible-list__section summary::-webkit-details-marker {
    display: none;
  }

  .collapsible-list__section summary {
    position: relative;
    padding-left: 1.5rem;
    cursor: pointer;
  }

  .collapsible-list__section > summary {
    padding-top: 0.5rem;
    padding-right: 0.25rem;
    padding-bottom: 0.5rem;
  }

  .collapsible-list__section summary::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 50%;
    width: 100vw;
    height: 100%;
    transform: translate(-50%);
    background-color: transparent;
  }

  .collapsible-list__section summary:focus {
    outline: none;
  }

  .collapsible-list__section:focus-within > summary::before {
    background-color: var(--selection-inactive-bg-color);
  }

  .collapsible-list__section summary:focus:not(:hover) {
    color: var(--selection-fg-color);
  }

  .collapsible-list__section summary:focus:not(:hover)::before {
    background-color: var(--selection-bg-color);
  }

  .collapsible-list__section summary > svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: transform 0.15s ease-out;
    fill: currentColor;
  }

  .collapsible-list__section[open] > summary > svg,
  .collapsible-list__section [open] > summary > svg {
    transform: translateY(-50%) rotate(90deg);
  }

  .collapsible-list__list {
    margin-left: 1rem;
    font-weight: normal;
    list-style: none;
  }

  .collapsible-list__list-item {
    position: relative;
  }

  .collapsible-list__list-item::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    left: 50%;
    width: 100vw;
    height: 100%;
    transform: translate(-50%);
  }

  .collapsible-list__list-item:nth-child(odd)::before {
    background-color: var(--network-grid-stripe-color);
  }

  .collapsible-list__attribute-value {
    display: grid;
    grid-gap: 0.25rem;
    grid-template-columns: auto 1fr;
    align-items: center;
    width: 100%;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .collapsible-list__attribute {
    font-weight: bold;
  }

  .collapsible-list__attribute:after {
    content: ':'
  }

  .collapsible-list__value {
    width: 100%;
    overflow: hidden;
    font-family: monospace;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .collapsible-list__property-table > *:not(summary) {
    width: calc(100% - 1rem);
    margin-left: 1.5rem;
  }
</style>
