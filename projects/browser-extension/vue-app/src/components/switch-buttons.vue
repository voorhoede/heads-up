<template>
  <div class="switch-wrapper">
    <label
      v-for="button in buttons"
      :key="button.value"
      ref="buttons"
      class="switch"
    >
      <span
        ref="button"
        class="switch__text-left"
      >{{ button.label }}</span>
      <input
        id="input-switch"
        :checked="value === button.value"
        name="toggle"
        type="radio"
        @input="toggle(button.value)"
      >
    </label>
    <span
      class="control-indicator"
      :style="controlIndicatorStyle"
    />
  </div>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      controlIndicatorStyle: {},
    };
  },
  watch: {
    value() {
      this.calculateIndicatorPosition();
    },
  },
  mounted() {
    this.calculateIndicatorPosition();
  },
  methods: {
    toggle(index) {
      this.$emit('change', index);
    },
    calculateIndicatorPosition() {
      const selectedButtonIndex = this.buttons.findIndex(
        button => button.value === this.value
      );

      const buttonElements = this.$refs.buttons[selectedButtonIndex];
      const selectedButtonElement = this.$refs.button[selectedButtonIndex];

      this.controlIndicatorStyle = {
        transform: `translateX(${ buttonElements.offsetLeft - 2 }px)`,
        width: `${ selectedButtonElement.offsetWidth + 4 }px`,
      };
    },
  },
};
</script>

<style>
.switch-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 2.2rem;
  cursor: pointer;
  padding: 16px;
}

.switch {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

input[type="radio"] {
  position: absolute;
  visibility: hidden;
}

.control-indicator {
  display: inline-block;
  /* margin: 0 -4px; */
  height: 2px;
  background-color: #1a73e8;
  transition: transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  left: 0;
  top: 100%;
}

.switch__text-left {
  margin-right: 16px;
}
</style>
