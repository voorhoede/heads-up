<template>
  <dl class="properties-list">
    <slot />
  </dl>
</template>

<style>
  :root {
    --term-width: 120px;
  }
  .properties-list dt,
  .properties-list dd {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 1.5em;
    line-height: 1.4em;
  }
  .properties-list dt {
    width: var(--term-width);
    padding-right: 1em;
    text-align: right;
    color: var(--color-grey-medium);
  }
  .properties-list dd {
    width: calc(100% - var(--term-width));
  }
  .properties-list img {
    display: block;
    max-width: 200px;
  }

  .properties-list img:not(:only-child) {
    margin-bottom: 5px;
  }

  .properties-list__color-swatch {
    display: inline-block;
    margin-right: 3px;
    width: 10px;
    height: 10px;
    border: 1px solid #888;
  }
  .icon-warning {
      display: inline-block;
      vertical-align: sub;
      position: relative;
      top: -1px;
      margin-right: 5px;
  }
  .properties-list code {
    padding: .2em .4em;
    background-color: var(--toolbar-bg-color);
    border-radius: 3px;
    font-size: 11px;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  }
</style>
