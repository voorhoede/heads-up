<template>
  <div class="tree-menu tree-menu--indent">
    <div v-for="(item, key) in elements" :key="key">
      <p v-if="typeof item === 'string'">
        <span class="tree-menu__attribute">{{name || key}}: </span>
        <span class="tree-menu__value">{{ item }}</span></p>
      <details v-else-if="item?.loc && item?.data">
        <summary class="tree-menu__collapsible-node">
          <chevron-right-icon width="12" height="12"/>
          <span class="tree-menu__attribute">{{name}}: </span>
          <span class="tree-menu__value">{{item.loc}}</span>
        </summary>
        <tree-menu :elements="item.data"></tree-menu>
      </details>
      <details v-else-if="item">
        <summary class="tree-menu__collapsible-node tree-menu__attribute">
          <chevron-right-icon width="12" height="12"/>
          {{key}}
        </summary>
        <tree-menu :elements="item"></tree-menu>
      </details>
    </div>
  </div>
</template>

<script>
import ChevronRightIcon from '@shared/assets/icons/chevron-right.svg';

export default {
  name: 'treeMenu',
  components: { ChevronRightIcon },
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
.tree-menu summary {
    cursor: pointer;
}

.tree-menu summary:focus {
  outline: none;
}

.tree-menu summary::-webkit-details-marker {
  display: none;
}

.tree-menu--indent {
  margin-left: 1em;
  padding-left: .325rem;
}

.tree-menu__attribute {
  font-weight: bold;
}

.tree-menu__value {
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
