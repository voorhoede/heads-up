<template>
  <div
    v-tooltip.top="{ ref: 'tooltip' }"
  >
    <slot />
    <slot name="value" />

    <span ref="tooltip">
      <slot name="info" />
      <slot name="link" />
    </span>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  :root {
    --tooltip-bgcolor: #fff;
  }

  .vue-tooltip {
    width: 150px;
    padding: 5px 8px;
    background-color: var(--tooltip-bgcolor);
    border-radius: 2px;
    color: hsl(0, 0%, 20%);
    line-height: 14px;
    filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.3));
    border: 1px solid hsla(0, 0%, 0%, 0.1);
  }

  .vue-tooltip .vue-tooltip-hidden {
    transform: translateX(-100000px) !important;
  }

  .vue-tooltip .tooltip-arrow {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .vue-tooltip[x-out-of-boundaries] {
    display: none;
  }

  .vue-tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .vue-tooltip[x-placement^="bottom"] .tooltip-arrow {
    left: 10px !important;
    top: -10px;
    border-width: 0 10px 10px 10px;
    border-bottom-color: var(--tooltip-bgcolor);
    border-top-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    margin-top: 0;
    margin-bottom: 0;
  }

  .vue-tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .vue-tooltip[x-placement^="top"] .tooltip-arrow {
    left: 10px !important;
    bottom: -10px;
    border-width: 10px 10px 0 10px;
    border-top-color: var(--tooltip-bgcolor);
    border-bottom-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    margin-top: 0;
    margin-bottom: 0;
  }

  .vue-tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .vue-tooltip[x-placement^="right"] .tooltip-arrow {
    left: -10px;
    border-width: 10px 10px 10px 0;
    border-right-color: var(--tooltip-bgcolor);
    border-top-color: transparent !important;
    border-left-color: transparent !important;
    border-bottom-color: transparent !important;
    margin-left: 0;
    margin-right: 0;
  }

  .vue-tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .vue-tooltip[x-placement^="left"] .tooltip-arrow {
    right: -10px;
    border-width: 10px 0 10px 10px;
    border-left-color: var(--tooltip-bgcolor);
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    margin-left: 0;
    margin-right: 0;
  }

  @media (min-width: 400px) {
    .vue-tooltip {
      width: 200px;
    }

    .vue-tooltip[x-placement^="top"] .tooltip-arrow {
      left: 10px !important;
    }
  }

  @media (min-width: 500px) {
    .vue-tooltip {
      width: 300px;
    }

    .vue-tooltip[x-placement^="top"] .tooltip-arrow {
      left: 60px !important;
    }
  }

  @media (min-width: 700px) {
    .vue-tooltip[x-placement^="top"] .tooltip-arrow {
      left: 40px !important;
    }
  }

  @media (min-width: 800px) {
    .vue-tooltip[x-placement^="top"] .tooltip-arrow {
      left: 40px !important;
    }
  }
</style>
