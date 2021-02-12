<template>
  <a
    :href="href"
    rel="noopener"
    target="_blank"
  >
    <slot />
    <span class="a11y-sr-only">Opens an external site in a new window</span>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
