<template>
  <header
    v-if="isHeader"
    class="panel-section"
  >
    <h1 class="heading-default heading">
      {{ title }}
    </h1>
    <slot />
  </header>
  <section
    v-else
    class="panel-section"
  >
    <h2 class="heading-small heading">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    isHeader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
  .panel-section {
    padding: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .panel-section:last-child {
    border-bottom: none;
  }
</style>
