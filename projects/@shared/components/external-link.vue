<template>
  <a
    :href="href"
    rel="noopener"
    target="_blank"
    aria-describedby="external-link-message"
  >
    <slot />
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
