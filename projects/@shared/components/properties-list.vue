<template>
  <dl class="properties-list">
    <slot />
  </dl>
</template>

<style>
  .properties-list dt,
  .properties-list dd {
    display: inline-block;
    margin-bottom: 1em;
    vertical-align: top;
  }

  .properties-list dt {
    width: 50%;
    min-width: 200px;
    max-width: 200px;
    padding-right: 12px;
    color: var(--label-color);
    text-align: right;
  }

  .properties-list dd {
    color: var(--value-color);
    width: 100%;
  }

  .properties-list img {
    display: block;
    max-width: 200px;
    margin-bottom: 4px;
  }
</style>
