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

    <!-- <dt>
        <app-tooltip>
          <template v-slot:info>
            <slot name="info" />
          </template>
        </app-tooltip>
      </dt>


      <dd>
        <app-tooltip>
          <slot />

          <template v-slot:info>
            <slot name="info" />
          </template>
        </app-tooltip>
      </dd> -->
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

    this.info = this.schema[this.keyName].meta.info

    const validations = Object.keys(this.schema[this.keyName])
    const itemValue = this.$slots.default[0].text.trim()
  }
}
</script>
