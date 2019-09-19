<template>
  <div class="properties-item">
    <app-tooltip>
      <span class="properties-item__term">
        <slot />
      </span>

      <template v-slot:value>
        <span class="properties-item__description">
          <slot name="value" />
        </span>
      </template>

      <template v-slot:info>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span
          v-if="!errors"
          v-html="info"
        />
        <span v-if="errors">
          {{ errorMessage }}
        </span>
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
import { mapState } from 'vuex'
import validateSchema from '../lib/validate-schema'
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
      info: '',
      link: '',
      errors: null
    }
  },
  computed: {
    ...mapState(['head']),
    errorMessage() {
      if (this.errors && this.errors.length > 0) {
        return this.errors[0].message
      }
    }
  },
  mounted() {
    if (!this.schema) {
      return
    }

    console.log(this.$slots.value)
    const keyName = this.$slots.default[0].text
    const value = this.$slots.value[0].text

    if (this.schema[this.keyName] && this.schema[this.keyName].meta) {
      this.info = this.schema[this.keyName].meta.info
      this.link = this.schema[this.keyName].meta.link
    }

    this.errors = validateSchema({
      schema: this.schema,
      key: this.keyName,
      value: value,
      head: this.head
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
}

.properties-item,
.properties-item__description {
  display: block;
  line-height: 1.4em;
}

.properties-item__term {
  color: var(--color-grey-medium);
}

@media (min-width: 500px) {
  .properties-item__term,
  .properties-item__description {
    display: inline-block;
    vertical-align: top;
    line-height: 1.4em;
  }

  .properties-item__term {
    width: var(--term-width-small);
    padding-right: 1em;
    text-align: right;
  }

  .properties-item__description {
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
