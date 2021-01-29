<template>
<div class="tab-selector">
  <label
    v-for="tab in tabs"
    :key="tab.value"
    :for="tab.value"
    class="tab-selector__tab"
  >
    <input
      :id="tab.value"
      type="radio"
      v-model="selectedValue"
      :value="tab.value"
    >
    <span class="tab-selector__tab__button">
      {{ tab.label }}
    </span>
  </label>
</div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },

  setup(props, ctx) {
    const selectedValue = ref(props.modelValue);

    watch(selectedValue, val => {
      ctx.emit('update:modelValue', val);
    });

    return {
      selectedValue,
    };
  },
};
</script>

<style>
.tab-selector {
  padding: 1rem 1rem 0;
}

.tab-selector__tab {
  cursor: pointer;
}

.tab-selector__tab:not(:last-child) {
  margin-right: 1rem;
}

.tab-selector input:checked + .tab-selector__tab__button {
  border-bottom: 2px solid #1a73e8;
}

.tab-selector input[type="radio"] {
  position: absolute;
  visibility: hidden;
}
</style>
