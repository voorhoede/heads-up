<template>
  <span
    v-tooltip.top="{ ref: 'tooltip' }"
  >
    <slot />

    <span ref="tooltip">
      <slot name="info" />
      <slot name="link" />
    </span>
  </span>
</template>

<script>
export default {
}
</script>

<style>
  .vue-tooltip {
    width: 150px;
    padding: 5px 8px;
    background-color: var(--selection-fg-color);
    border-radius: 2px;
    color: hsl(0, 0%, 20%);
    line-height: 14px;
    text-align: left;
    filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.3));
    border: 1px solid hsla(0, 0%, 0%, 0.1);
  }

  .vue-tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 1.2rem;
  }


  .-theme-with-dark-background .vue-tooltip {
    background-color: var(--toolbar-bg-color);
    color: var(--base-color);
    border: 1px solid var(--base-color);
  }

  .vue-tooltip .vue-tooltip-hidden {
    transform: translateX(-100000px) !important;
  }

  .vue-tooltip .tooltip-arrow {
    --toolbar-bg-color: #fff;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .-theme-with-dark-background .vue-tooltip .tooltip-arrow {
    --toolbar-bg-color: #333333;
  }

  .vue-tooltip[x-out-of-boundaries] {
    display: none;
  }

  .vue-tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .vue-tooltip[x-placement^="bottom"] .tooltip-arrow {
    top: -10px;
    border-width: 0 10px 10px 10px;
    border-bottom-color: var(--toolbar-bg-color);
    border-top-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    margin-top: 0;
    margin-bottom: 0;
  }

  .-theme-with-dark-background .vue-tooltip[x-placement^="bottom"] .tooltip-arrow::after {
    content: '';
    display: block;
    top: -7px;
    border-width: 11px 11px 0 11px;
    border-top-color: var(--base-color);
    border-bottom-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    margin-top: 0;
    margin-bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    left: -16px;
    z-index: -1;
    transform: rotate(180deg);
  }

  .vue-tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .vue-tooltip[x-placement^="top"] .tooltip-arrow {
    bottom: -10px;
    border-width: 10px 10px 0 10px;
    border-top-color: var(--toolbar-bg-color);
    border-bottom-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    margin-top: 0;
    margin-bottom: 0;
  }

  .-theme-with-dark-background .vue-tooltip[x-placement^="top"] .tooltip-arrow::after {
    content: '';
    display: block;
    bottom: -7px;
    border-width: 11px 11px 0 11px;
    border-top-color: var(--base-color);
    border-bottom-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    margin-top: 0;
    margin-bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    left: -16px;
    z-index: -1;
  }

  @media (min-width: 400px) {
    .vue-tooltip {
      width: 200px;
    }
  }

  @media (min-width: 500px) {
    .vue-tooltip {
      width: 300px;
    }
  }
</style>
