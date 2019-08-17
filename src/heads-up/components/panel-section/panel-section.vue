<template>
  <section class="section">
    <h2 class="heading-small heading">{{ title }}</h2>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    }
  }
}
</script>
