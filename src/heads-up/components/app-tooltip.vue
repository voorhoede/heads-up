<template>
  <span v-tooltip="content">
    <slot />

    <span
      ref="info"
      class="visually-hidden"
    >
      <slot name="info" />
    </span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      content: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.content = this.$refs.info.innerText
    })
  }
}
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  position: relative;
  max-width: 130px;
  font-size: .875rem;
  background-color: var(--toolbar-bg-color);
  color: var(--tab-selected-fg-color);
  box-shadow: 0px 2px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.tooltip[x-placement^="top"] .tooltip-inner::after,
.tooltip[x-placement^="bottom"] .tooltip-inner::after,
.tooltip[x-placement^="left"] .tooltip-inner::after,
.tooltip[x-placement^="right"] .tooltip-inner::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 0.5em solid black;
  border-color: transparent transparent var(--toolbar-bg-color) var(--toolbar-bg-color);
  transform-origin: 0 0;
}

.tooltip[x-placement^="top"] .tooltip-inner::after {
  margin-left: -0.5em;
  left: 50%;
  bottom: -1em;
  transform: rotate(-45deg);
  box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.2);
}

.tooltip[x-placement^="bottom"] {
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
}

.tooltip[x-placement^="bottom"] .tooltip-inner::after {
  margin-left: 1em;
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(135deg);
  box-shadow: -1px 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.tooltip[x-placement^="right"] .tooltip-inner::after {
  top: 50%;
  left: 0;
  transform: translateY(-50%) rotate(45deg);
  box-shadow: -1px 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.tooltip[x-placement^="left"] {
  box-shadow: 2px -1px 2px 0px rgba(0, 0, 0, 0.1);
}

.tooltip[x-placement^="left"] .tooltip-inner::after {
  top: 100%;
  left: 100%;
  transform: translateY(-50%) rotate(-135deg);
  box-shadow: -1px 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

.has-tooltip {
  cursor: help;
}

@media (min-width: 450px) {
  .tooltip .tooltip-inner {
    max-width: 250px;
  }
}

@media (min-width: 550px) {
  .tooltip .tooltip-inner {
    max-width: 300px;
  }
}

@media (min-width: 650px) {
  .tooltip .tooltip-inner {
    max-width: 380px;
  }
}
</style>
