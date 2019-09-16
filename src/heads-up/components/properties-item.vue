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

      <template v-slot:link>
        <external-link :href="link">
          Learn more
        </external-link>
      </template>
    </app-tooltip>
  </div>
</template>

<script>
import { AppTooltip, ExternalLink } from '../components'

export default {
  components: { AppTooltip, ExternalLink },
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
    this.link = JSON.parse(JSON.stringify(this.schema[this.keyName].meta.link))
    // this.info = `${ info } ${ link }`
  }
}
</script>
