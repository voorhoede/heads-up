<template>
  <div class="properties-item">
    <span class="properties-item__term">
      <slot />
    </span>

    <span class="properties-item__description">
      <app-tooltip>
        <InfoIcon
          v-if="!errors"
          class="properties-item__icon"
        />

        <WarningIcon
          v-if="errors"
          class="properties-item__icon"
        />

        <template v-slot:info>
          <!-- eslint-disable-next-line vue/no-v-html, vue/max-attributes-per-line -->
          <span v-if="!errors" v-html="info" />
          <span v-if="errors">
            {{ errorMessage }}
          </span>
        </template>

        <template v-slot:link>
          <!-- eslint-disable-next-line vue/singleline-html-element-content-newline, vue/max-attributes-per-line -->
          <external-link class="properties-item__link" :href="link">Learn more</external-link>
        </template>
      </app-tooltip>
      <span
        v-if="!valueWithExceededLength"
        class="properties-item__description-text"
        :class="{ 'properties-item__strike': errors && !valueWithExceededLength }"
      >{{ value }}</span>
      <span v-if="valueWithExceededLength">{{ valueMinusExceededLength }}</span>
      <span
        v-if="valueWithExceededLength"
        class="properties-item__strike"
      >{{ valueWithExceededLength }}</span>
      <span
        v-if="valueSlot"
        class="properties-item__extra"
      >
        <slot name="value" />
      </span>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import validateSchema from '../lib/validate-schema'
import { AppTooltip, ExternalLink } from '../components'
import InfoIcon from '../assets/icons/info.svg'
import WarningIcon from '../assets/icons/warning.svg'

export default {
  components: { AppTooltip, ExternalLink, InfoIcon, WarningIcon },
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
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: '',
      link: '',
      errors: null,
      valueSlot: null
    }
  },
  computed: {
    ...mapState(['head']),
    errorMessage() {
      if (this.errors && this.errors.length > 0) {
        return this.errors[0].message
      }
      return null
    },
    valueWithExceededLength() {
      if (this.errors && this.errors.length > 0 && this.errors[0]['length']) {
        return this.value.slice(this.errors[0]['length'] * -1)
      }
      return null
    },
    valueMinusExceededLength() {
      if (this.errors && this.errors.length > 0 && this.errors[0]['length']) {
        return this.value.slice(0, this.value.length - this.errors[0]['length'])
      }
      return null
    }
  },
  mounted() {
    if (!this.schema) {
      throw new Error('No schema is provided.')
    }

    if (this.$slots && this.$slots.value) {
      this.valueSlot = this.$slots.value
    }

    if (this.schema[this.keyName] && this.schema[this.keyName].meta) {
      this.info = this.schema[this.keyName].meta.info
      this.link = this.schema[this.keyName].meta.link
    }

    this.errors = validateSchema({
      schema: this.schema,
      key: this.keyName,
      value: this.value
    })
  }
}
</script>

<style>
:root {
  --term-width-small: 80px;
}

.properties-item {
  width: 100%;
  margin-bottom: 1.5em;
  cursor: help;
}

.properties-item,
.properties-item__description {
  display: block;
  line-height: 1.4em;
}

.properties-item__description-text {
  display: block;
}

.properties-item__icon {
  display: inline-block;
  position: relative;
  top: -1px;
  margin-right: 5px;
  width: 1.8em;
  height: 1.8em;
  vertical-align: middle;
}

.properties-item__extra span {
  display: inline-block;
  margin-left: 3px;
  width: 10px;
  height: 10px;
  border: 1px solid #888;
}

.properties-item__term {
  color: var(--label-color);
}

.properties-item__strike {
  text-decoration: line-through;
  color: var(--label-color);
}

.properties-item__link {
  margin-left: 5px;
}

@media (min-width: 500px) {
  .properties-item {
    display: flex;
    align-items: center;
  }

  .properties-item__term,
  .properties-item__description {
    line-height: 1.4em;
  }

  .properties-item__term {
    width: var(--term-width-small);
    padding-right: 1em;
    text-align: right;
  }

  .properties-item__description {
    display: inline-flex;
    align-items: center;
    width: calc(100% - var(--term-width-small));
  }
}

@media (min-width: 650px) {
  .properties-item {
    max-width: 420px;
    margin-bottom: 1.5em;
  }

  .properties-item__term {
    width: 120px;
    padding-right: 1em;
    text-align: right;
  }

  .properties-item__description {
    width: 300px;
  }
}
</style>
