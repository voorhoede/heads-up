<template>
  <details v-if="elements.length" class="tree-menu tree-menu--indent">
    <summary>
      <span class="tree-menu__collapsible-node">{{ name }}</span>
    </summary>

    <tree-menu
      v-for="(element, index) in elements"
      :key="`${element.name}-${index}`"
      :elements="element.elements"
      :name="element.name"
      :text="element.text"
    >
    </tree-menu>
  </details>
  <div v-else class="tree-menu tree-menu--indent">
    <span v-if="text" class="tree-menu__final-node">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'treeMenu',
  props: {
    name: {
      type: String,
      default: '',
    },
    elements: {
      type: Array,
      default: () => [],
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return { showChildren: false };
  },
};
</script>

<style>
.tree-menu--indent {
  margin-left: 1em;
}

.tree-menu__collapsible-node {
  color: blue;
  cursor: pointer;
}

.tree-menu__final-node,
.tree-menu__collapsible-node {
  display: inline-block;
  margin: 2px 0;
}
</style>
