<template>
  <div class="tree-menu tree-menu--indent">
    <template v-for="(item, key) in elements">
      <div class="tree-menu__item" v-if="item" :key="key">
        <p v-if="typeof item === 'string'">
          <span class="tree-menu__attribute">{{ name || key }}: </span>
          <span class="tree-menu__value">{{ item }}</span>
        </p>
        <details v-else-if="item?.loc && item?.data">
          <summary class="tree-menu__collapsible-node">
            <app-icon name="chevron-right" />
            <span class="tree-menu__attribute">{{ name }}: </span>
            <span class="tree-menu__value">{{ item.loc }}</span>
          </summary>
          <tree-menu :elements="item.data"></tree-menu>
        </details>
        <details v-else-if="item">
          <summary class="tree-menu__collapsible-node tree-menu__attribute">
            <app-icon name="chevron-right" />
            {{key}}
          </summary>
          <tree-menu :elements="item"></tree-menu>
        </details>
      </div>
    </template>
  </div>
</template>

<script>
import AppIcon from './app-icon';

export default {
  name: 'treeMenu',
  components: { AppIcon },
  props: {
    elements: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
.tree-menu summary:focus {
  outline: none;
}

.tree-menu summary::-webkit-details-marker {
  display: none;
}

.tree-menu summary {
  position: relative;
  padding-left: 1rem;
  list-style: none;
  cursor: pointer;
}

.tree-menu__value {
  font-family: monospace;
  font-weight: normal;
}

.tree-menu summary > .app-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: transform 0.15s ease-out;
  width: 12px;
  height: 12px;
}

.tree-menu summary > .app-icon svg {
  fill: currentColor;
}

.tree-menu details {
  width: 100%;
}

.tree-menu [open] > summary > .app-icon {
  transform: translateY(-50%) rotate(90deg);
}

.tree-menu__item {
  position: relative;
}

.tree-menu__item p {
  margin-bottom: 0;
}
</style>
