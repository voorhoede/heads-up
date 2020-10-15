<template>
  <button
    type="button"
    @click="reload()"
  >
    REFRESH
  </button>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  button {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 5px;
  }
</style>
