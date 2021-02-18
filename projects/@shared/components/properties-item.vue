<template>
  <div v-if="showItem" class="properties-item">
    <dt class="properties-item__terms">

      <app-tooltip v-if="showTooltip" class="properties-item__tooltip" placement="top-start">

        <template v-if="termIsArray">
          <template v-for="(item, index) in term">
            <span v-if="item" :key="index" class="properties-item__term">
              {{ item }}
            </span>
          </template>
        </template>

        <span v-else class="properties-item__term">
          {{ term }}
        </span>

        <InfoIcon v-if="warnings && !errors" class="properties-item__icon" />
        <WarningIcon v-else-if="errors" class="properties-item__icon properties-item__icon--warning" />

        <template #info>
          <span v-if="warnings && !errors">
            <template v-if="warningMessage">
              {{ warningMessage }}
            </template>
            <ul v-else class="properties-item__error-list">
              <li v-for="(warning, index) in warnings" :key="index" v-html="warning.message" />
            </ul>
          </span>

          <span v-if="errors">
            <template v-if="errorMessage">
              {{ errorMessage }}
            </template>
            <ul v-else class="properties-item__error-list">
              <li v-for="(error, index) in errors" :key="index" v-html="error.message" />
            </ul>
          </span>
          <span v-if="!errors && !warnings" v-html="info" />
          <span v-if="link">&nbsp;</span>
        </template>

        <template v-if="link" #link>
          <external-link :href="link">Learn more</external-link>
        </template>

      </app-tooltip>

      <template v-if="termIsArray && !showTooltip">
        <template v-for="(item, index) in term">
          <span v-if="item" :key="index" class="properties-item__term">
            {{ item }}
          </span>
        </template>
      </template>

      <span v-else-if="!showTooltip" class="properties-item__term">
        {{ term }}
      </span>

    </dt>

    <dd v-if="isImageValue" class="properties-item__value properties-item__value--image">
      <img
        class="properties-item__image"
        :src="image.url"
        :alt="image.title || ''"
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
      <span v-if="value">{{ value }}</span>
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
      required: false,
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
      type: [ Array, String ],
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
      return this.warnings?.[0]?.message;
    },
    isColorValue() {
      return this.type === 'color' && this.value;
    },
    isImageValue() {
      return this.type === 'image' && this.image !== null && this.value;
    },
    isLinkValue() {
      return this.type === 'link' && this.value;
    },
    isUrlsValue() {
      return this.type === 'urls' && this.value;
    },
    showItem() {
      return this.term && this.value || this.required;
    },
    showTooltip() {
      return this.schema && this.term && this.info;
    },
    termIsArray() {
      return Array.isArray(this.term);
    },
    warningMessage() {
      return this.warnings?.[0]?.message;
    },
  },
  mounted() {
    if (!this.schema) { return; }

    if (this.schema[this.term] && this.schema[this.term].meta) {
      this.info = this.schema[this.term].meta.info;

      // Set tooltip link if available.
      if (this.schema[this.term].meta.link) {
        this.link = this.schema[this.term].meta.link;
      }
    }

    this.validateSchema();
  },
  methods: {
    async validateSchema() {
      const schemaTemplate = {
        schema: this.schema,
        key: this.term,
        value: this.value,
        attrs: this.attrs,
      };

      this.errors = validateErrorSchema(schemaTemplate);
      this.warnings = await validateWarningSchema(schemaTemplate);
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
    flex: 0 1 40%;
    max-width: 200px;
    color: var(--label-color);
    text-align: right;
    word-break: break-word;
  }

  .properties-item__term {
    display: block;
  }

  .properties-item__tooltip .properties-item__term {
    display: inline-block;
  }

  .properties-item__icon {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 15px;
    height: 15px;
    margin-left: 4px;
    fill: currentcolor;
    vertical-align: middle;
    cursor: help;
  }

  .properties-item__icon--warning {
    fill: #eac250;
  }

  .properties-item__value {
    color: var(--value-color);
    flex: 0 1 60%;
    line-height: 1;
    margin-left: 1rem;
    max-width: 500px;
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

  /* tooltip */
  .tooltip {
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.2);
  }

  .tooltip .tooltip-inner {
    background: #ededed;
    color: #333333;
  }

  .-theme-with-dark-background.tooltip-inner {
    background: #3c3c3c;
    color: #dadada;
  }

  .tooltip .tooltip-arrow {
    border: 5px solid #ededed;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.2);
  }

  .-theme-with-dark-background.tooltip-arrow {
    border: 5px solid #3c3c3c;
  }
</style>
