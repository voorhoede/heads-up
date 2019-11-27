<template>
  <div class="switch-wrapper">
    <label class="switch" v-for="button in buttons" :key="button.value" ref="buttons">
      <span class="switch__text-left">{{ button.label }}</span>
      <input
        :checked="value === button.value"
        id="input-switch-mobile"
        name="toggle"
        type="radio"
        @input="toggle(button.value)"
      />
    </label>
    <span class="control-indicator" ref="hoi" :style="controlIndicatorStyle"></span>
  </div>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      controlIndicatorStyle: {}
    };
  },
  mounted() {
    this.calculateIndicatorPosition();
  },
  methods: {
    toggle(index) {
      this.$emit("change", index);
    },
    calculateIndicatorPosition() {
      const selectedButtonIndex = this.buttons.findIndex(
        button => button.value === this.value
      );
      const selectedButtonElement = this.$refs.buttons[selectedButtonIndex];
      this.controlIndicatorStyle = {
        transform: `translateX(${selectedButtonElement.offsetLeft}px)`,
        width: `${selectedButtonElement.offsetWidth}px`
      };
    }
  },
  watch: {
    value() {
      this.calculateIndicatorPosition();
    }
  }
};
</script>

<style>
.switch-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 1.5rem;
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

/* 
input[type="radio"]:checked + .control-indicator {
  transform: translateX(115%);
} */

.control-indicator {
  display: inline-block;
  width: 3.5rem;
  margin: 0 -4px;
  height: 2px;
  background-color: #1a73e8;
  transition: transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  left: 0;
  top: 100%;
}

.switch__text-right {
  padding-left: 16px;
}
.switch__text-left {
  padding-right: 16px;
}
</style>