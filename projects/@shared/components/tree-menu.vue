<template>
  <div class="tree-menu tree-menu--indent">
    <div v-for="(item, key) in elements" :key="key">
      <p v-if="typeof item === 'string'">{{name || key}}: {{ item }}</p>
      <details v-else-if="item?.loc && item?.data">
        <summary class="tree-menu__collapsible-node">{{name}}: {{item.loc}}</summary>
        <tree-menu :elements="item.data"></tree-menu>
      </details>
      <details v-else-if="item">
        <summary class="tree-menu__collapsible-node">{{key}}</summary>
        <tree-menu :elements="item"></tree-menu>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'treeMenu',
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

.tree-menu--indent {
  border-left: 1px solid #eee;
  margin-left: 1em;
  padding-left: .325rem;
}
</style>
