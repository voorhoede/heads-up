<template>
  <div>
    <app-tooltip>
      <span>
        <slot />
      </span>

      <span>
        <slot name="value" />
      </span>

      <template v-slot:info>
        {{ info }}
      </template>
    </app-tooltip>
  </div>
</template>

<script>
import { AppTooltip } from '../components'

export default {
  components: { AppTooltip },
  props: {
    schema: {
      type: Object,
      required: false,
      default() {
        return null
      }
    },
    keyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: null
    }
  },
  mounted() {
    if (!this.schema) {
      return
    }

    this.info = JSON.parse(JSON.stringify(this.schema[this.keyName].meta.info))
  }
}
</script>
