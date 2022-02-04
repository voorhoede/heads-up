<template>
  <span
    class="app-icon"
    :class="{ 'app-icon--small': small }"
    role="presentation"
    v-html="icon">
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      return require(`../assets/icons/${ this.name }.svg?inline`);
    },
  },
};
</script>

<style>
.app-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
}

.app-icon--small {
  width: 12px;
  height: 12px;
}

.app-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
