<template>
  <div v-if="showItem" class="properties-item">
    <dt class="properties-item__terms">

      <app-tooltip v-if="schema" class="properties-item__tooltip" placement="top-start">

        <template v-if="termIsIterable">
          <template v-for="(item, index) in term">
            <span v-if="item" :key="index" class="properties-item__term">
              {{ item }}
            </span>
          </template>
        </template>

        <span v-else class="properties-item__term">
          {{ term }}
        </span>

        <InfoIcon v-if="warnings && !errors" />
        <WarningIcon v-else-if="errors" />

        <template #info>
          <span v-if="warnings && !errors">
            <template v-if="warnings.length === 1">
              {{ warningMessage }}
            </template>
            <ul v-else class="properties-item__error-list">
              <li v-for="(warning, index) in warnings" :key="index" v-html="warning.message" />
            </ul>
          </span>

          <span v-if="errors">
            <template v-if="errors.length === 1">
              {{ errorMessage }}
            </template>
            <ul v-else class="properties-item__error-list">
              <li v-for="(error, index) in errors" :key="index" v-html="error.message" />
            </ul>
          </span>
          <span v-if="!errors && !warnings" v-html="info" />
        </template>

        <template #link>
          <external-link :href="link">Learn more</external-link>
        </template>

      </app-tooltip>

      <template v-if="termIsIterable && !schema">
        <template v-for="(item, index) in term">
          <span v-if="item" :key="index" class="properties-item__term">
            {{ item }}
          </span>
        </template>
      </template>

      <span v-else-if="!schema" class="properties-item__term">
        {{ term }}
      </span>

    </dt>

    <dd v-if="isImageValue" class="properties-item__value properties-item__value--image">
      <img
        class="properties-item__image"
        :src="image.url"
        :alt="image.title ? image.title : ''"
      />
      <external-link :href="image.url">
        <span>{{ image.href }}</span>
      </external-link>
    </dd>

    <dd v-else-if="isLinkValue" class="properties-item__value properties-item__value--link">
      <external-link :href="value">
        {{ value }}
      </external-link>
    </dd>

    <dd v-else-if="isColorValue" class="properties-item__value properties-item__value--color">
      <span>{{ value }}</span>
      <span class="properties-item__color" :style="{ backgroundColor: value }"></span>
    </dd>

    <dd v-else-if="isUrlsValue" class="properties-item__value properties-item__value--urls">
      <div v-for="(item, index) in value" :key="index">
        <template v-if="item.url">
          <external-link :href="item.url">
            <span>{{ item.url }}</span>
          </external-link>
        </template>
        <template v-if="item.attributes">
          <span v-for="(attribute, name) in item.attributes" :key="name">
            {{ name }}: {{ attribute }}
          </span>
        </template>
      </div>
    </dd>

    <dd v-else class="properties-item__value">
      <span>{{ value }}</span>
    </dd>
  </div>
</template>

<script>
import AppTooltip from './app-tooltip';
import ExternalLink from './external-link';
import InfoIcon from '../assets/icons/info.svg';
import WarningIcon from '../assets/icons/warning.svg';

import validateErrorSchema from '../lib/validate-error-schema';
import validateWarningSchema from '../lib/validate-warning-schema';

export default {
  components: { AppTooltip, ExternalLink, InfoIcon, WarningIcon },
  props: {
    attrs: {
      type: Object,
      required: false,
      default: undefined,
    },
    image: {
      type: Object,
      default() {
        return {};
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    schema: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
    term: {
      type: [ Object, String ],
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'string',
      validator: type => [ 'string', 'link', 'urls', 'image', 'color' ].indexOf(type) !== -1,
    },
    value: {
      type: [ Array, Number, String ],
      required: false,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      info: '',
      link: '',
      errors: null,
      warnings: null,
    };
  },
  watch: {
    term() {
      if (this.schema) { this.validateSchema(); }
    },
  },
  computed: {
    errorMessage() {
      if (this.errors && this.errors.length > 0) {
        return this.errors[0].message;
      }
      return null;
    },
    isColorValue() {
      return this.type === 'color';
    },
    isImageValue() {
      return this.type === 'image' && this.image !== null;
    },
    isLinkValue() {
      return this.type === 'link';
    },
    isUrlsValue() {
      return this.type === 'urls';
    },
    showItem() {
      return this.term && this.value;
    },
    termIsIterable() {
      return typeof this.term === 'object';
    },
    warningMessage() {
      if (this.warnings && this.warnings.length > 0) {
        return this.warnings[0].message;
      }
      return null;
    },
  },
  mounted() {
    if (!this.schema) { return; }

    if (this.schema[this.term] && this.schema[this.term].meta) {
      this.info = this.schema[this.term].meta.info;
      this.link = this.schema[this.term].meta.link;
    }

    if (this.schema) { this.validateSchema(); }
  },
  methods: {
    validateSchema() {
      const schemaTemplate = {
        schema: this.schema,
        key: this.term,
        value: this.value,
        attrs: this.attrs,
      };

      this.errors = validateErrorSchema(schemaTemplate);
      this.warnings = validateWarningSchema(schemaTemplate);
    },
  },
};
</script>

<style>
  .properties-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .properties-item__tooltip {
    display: inline-block;
  }

  .properties-item__terms {
    color: var(--label-color);
    flex: 1 1 auto;
    text-align: right;
    word-break: break-word;
    min-width: 120px;
  }

  .properties-item__term {
    display: inline-block;
  }

  .properties-item__value {
    color: var(--value-color);
    flex: 0 0 70%;
    margin-left: 1rem;
    word-break: break-word;
  }

  .properties-item__value--color {
    display: flex;
    align-items: center;
  }

  .properties-item__value--urls div {
    margin-bottom: 6px;
  }

  .properties-item__value--urls span {
    display: block;
  }

  .properties-item__color {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    border: 1px solid #888;
  }

  .properties-item__image {
    display: block;
    max-width: 200px;
    margin-bottom: 4px;
  }
</style>
