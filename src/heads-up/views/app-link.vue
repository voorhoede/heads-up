<template>
  <div class="app-link">
    <panel-section title="Rel">
      <details
        v-for="(section, key) in appLinkData"
        :key="key"
        class="app-link__section"
        open
      >
        <summary><ChevronRightIcon />{{ key }}</summary>
        <ul
          style="margin-left: 1rem; list-style: none;"
          class="app-link__list"
        >
          <li
            v-for="(item, index) in section"
            :key="index"
            class="app-link__list-item"
          >
            <span
              v-if="item.length === 1"
              class="app-link__attribute-value"
            >
              <span class="app-link__attribute">{{ item[0][0] }}</span> <span
                class="app-link__value"
                :title="item[0][1]"
              >{{ item[0][1] }}</span>
            </span>
            <details
              v-else
              class="app-link__property-table"
            >
              <summary>
                <ChevronRightIcon />
                <span class="app-link__attribute-value">
                  <span class="app-link__attribute">{{ item[0][0] }}</span> <span
                    class="app-link__value"
                    :title="item[0][1]"
                  >{{ item[0][1] }}</span>
                </span>
              </summary>

              <dl class="app-link__table-row app-link__attribute-value">
                <template v-for="(row, rowIndex) in item">
                  <template v-for="(column, i) in row">
                    <!-- eslint-disable-next-line vue/no-v-html, vue/max-attributes-per-line -->
                    <component
                      :is="i === 0 ? 'dt' : 'dd'"
                      :key="`${row}${column}`"
                      :class="{
                        'app-link__attribute': i === 0,
                        'app-link__value': i === 1
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
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://htmlhead.dev/">
            Guide to HTML5 <code>&lt;head&gt;</code> elements
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, ResourceList } from '../components'
  import schema  from '../lib/schemas/app-meta-schema'
  import ChevronRightIcon from '../assets/icons/chevron-right.svg'

  export default {
    components: { ExternalLink, PanelSection, ResourceList, ChevronRightIcon },
    data: () => ({
      includeData: false
    }),
    computed: {
      ...mapState(['head']),
      appLinkData() {
        return this.head.link
          .filter(item => item.rel)
          .map(item => {
            if (this.includeData) return item
            return Object.keys(item)
              .filter(key => /data-/.test(key) === false)
              .reduce((object, key) => ({ ...object, [key]: item[key] }), {})
          })
          .reduce((collection, item) => {
            if (collection[item.rel] === undefined) {
              collection[item.rel] = []
            }

            const { rel, ...rest } = item
            collection[rel].push(Object.entries(rest))
            return collection
          }, {})
      },
      schema() { return schema }
    }
  }
</script>

<style>
.app-link__section {
  position: relative;
  font-weight: bold;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  -webkit-font-smoothing: antialiased;
}
.app-link__section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  display: block;
  width: 100vw;
  height: 1px;
  background-color: var(--divider-color);
  transform: translate(-50%);
  z-index: -1;
  opacity: 0.5;
}

.app-link__section summary::-webkit-details-marker {
  display: none;
}

.app-link__section summary {
  position: relative;
  cursor: pointer;
  padding-left: 1.5rem;
}

.app-link__section > summary {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 0.25rem;
}

.app-link__section summary:focus {
  outline: none;
}

.app-link__section summary:focus::before,
.app-link__section:focus-within > summary::before {
  content: '';
  background-color: var(--selection-inactive-bg-color);
  display: block;
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  transform: translate(-50%);
}

.app-link__section summary:focus::before {
  background-color: var(--selection-bg-color);
}

.app-link__section summary > svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: transform 0.15s ease-out;
}

.app-link__section[open] > summary > svg,
.app-link__section [open] > summary > svg {
  transform: translateY(-50%) rotate(90deg);
}

.app-link__list {
  font-weight: normal;
}


.app-link__list-item {
  position: relative;
}
.app-link__list-item::before {
  content: '';
  display: block;
  position: absolute;
  width: 100vw;
  height: 100%;
  left: 50%;
  transform: translate(-50%);
  z-index: -1;
}
.app-link__list-item:nth-child(odd)::before {
  background-color: var(--network-grid-stripe-color);
}

.app-link__attribute-value {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.25rem;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.app-link__attribute {
  font-weight: bold;
}
.app-link__attribute:after {
  content: ':'
}

.app-link__value {
  font-family: monospace;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-link__property-table > *:not(summary){
  width: calc(100% - 1rem);
  margin-left: 1.5rem;
}
</style>
