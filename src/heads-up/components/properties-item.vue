<template>
  <span>
    <template v-if="type === 'key'">
      <dt>
        <app-tooltip>
          <slot />

          <template v-slot:info>
            <slot name="info" />
          </template>
        </app-tooltip>
      </dt>
    </template>

    <template v-if="type === 'value'">
      <dd>
        <app-tooltip>
          <slot />

          <template v-slot:info>
            <slot name="info" />
          </template>
        </app-tooltip>
      </dd>
    </template>
  </span>
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
    type: {
      type: String,
      required: true
    },
    keyName: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (!this.schema) {
      return
    }

    const validations = Object.keys(this.schema[this.keyName])
    const itemValue = this.$slots.default[0].text.trim()
    validations.forEach(validation => {
      console.log(validation)
      this.validation(itemValue)
    })

    if (this.schema[this.keyName].required) {
      //
    }
  },
  methods: {
    required(value) {
      console.log('in required, value', value)
      return value ? true : false
    },
    match(value) {
      console.log('in match', value)
    },
    message(value) {
      console.log('in message', value)
    }
  }
}
</script>
