<template>
  <div class="properties-list">
    <slot />
  </div>
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
    color: var(--label-color);
  }
  .properties-list dd {
    width: calc(100% - var(--term-width));
    color: var(--value-color);
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
</style>
