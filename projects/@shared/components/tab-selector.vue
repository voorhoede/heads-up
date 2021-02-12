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
      class="a11y-sr-only"
    >
    <span class="tab-selector__tab-button">
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

.tab-selector__tab-button {
  position: relative;
}

.tab-selector input:checked + .tab-selector__tab-button {
  border-bottom: 2px solid var(--color-blue);
}

.tab-selector input:focus + .tab-selector__tab-button::after {
  content: '';
  position: absolute;
  display: block;
  top: -40%;
  left: -20%;
  width: 140%;
  height: 180%;
  box-sizing: border-box;
  border: 2px solid var(--color-blue);
  border-radius: 2px;
}
</style>
