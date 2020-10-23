<template>
<div class="tab-selecter">
  <label
    v-for="tab in tabs"
    :key="tab.value"
    :for="tab.value"
    class="tab-selecter__tab"
  >
    <input
      :id="tab.value"
      type="radio"
      v-model="selectedValue"
      :value="tab.value"
    >
    <span class="tab-selecter__tab__button">
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
.tab-selecter {
  padding: 1rem 1rem 0;
}

.tab-selecter__tab {
  cursor: pointer;
}

.tab-selecter__tab:not(:last-child) {
  margin-right: 1rem;
}

.tab-selecter input:checked + .tab-selecter__tab__button {
  border-bottom: 2px solid #1a73e8;;
}

.tab-selecter input[type="radio"] {
  position: absolute;
  visibility: hidden;
}
</style>
