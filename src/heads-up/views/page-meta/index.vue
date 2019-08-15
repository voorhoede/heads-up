<template>
  <div v-if="head && head.url">
    <h1>page meta</h1>
    <h2>{{ head.url }}</h2>
    <h2>{{ head.title }}</h2>

    <ul>
      <li v-for="item in head.meta" :key="item.value">
        {{ item }}
        <br>
      </li>
    </ul>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        head: state => state.head,
      }),
    }
  }
</script>
