<template>
  <div v-if="showItem" class="properties-item">
    <dt class="properties-item__terms">

      <app-tooltip v-if="showTooltip" class="properties-item__tooltip" placement="top-start">

        <template v-if="termIsArray">
          <template v-for="(item, index) in term">
            <span
              v-if="item"
              :key="index"
              class="properties-item__term"
              :class="{'properties-item__term--not-supported': isNotSupported}"
            >
              {{ item }}
            </span>
          </template>
        </template>

        <span
          v-else
          class="properties-item__term"
          :class="{'properties-item__term--not-supported': isNotSupported}"
        >
          {{ term }}
        </span>

        <InfoIcon v-if="hasWarnings && !hasErrors" class="properties-item__icon" />
        <WarningIcon v-else-if="hasErrors" class="properties-item__icon properties-item__icon--warning" />

        <template #info>
          <div v-if="hasWarnings && !hasErrors">
            <span v-if="warningMessage" v-html="warningMessage" />
            <ul v-else class="properties-item__error-list">
              <li v-for="(warning, index) in warnings" :key="index" v-html="warning.message" />
            </ul>
          </div>

          <div v-if="hasErrors">
            <span v-if="errorMessage" v-html="errorMessage" />
            <ul v-else class="properties-item__error-list">
              <li v-for="(error, index) in errors" :key="index" v-html="error.message" />
            </ul>
          </div>
          <div v-if="!hasErrors && !hasWarnings">
            <span v-html="tooltip.info.trim()" />
          </div>
        </template>

        <template v-if="tooltip.link" #link>
          <external-link class="app-tooltip__link" :href="tooltip.link.trim()">Learn more</external-link>
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

    <dd v-else-if="isCodeValue" class="properties-item__value properties-item__value--code">
      <code>{{ value }}</code>
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

    <dd v-else-if="valueExceedsLimit" class="properties-item__value">
      <span>{{ splittedStringStart }}</span>
      <span class="properties-item__strikethrough">{{ splittedStringEnd }}</span>
    </dd>

    <dd
      v-else
      class="properties-item__value"
      :class="{'properties-item__value--not-supported': isNotSupported}"
    >
      <span v-if="value">{{ value }}</span>
    </dd>
  </div>
</template>

<script>
import AppTooltip from './app-tooltip';
import ExternalLink from './external-link';
import InfoIcon from '../assets/icons/info.svg';
import WarningIcon from '../assets/icons/warning.svg';

export default {
  components: {
    AppTooltip,
    ExternalLink,
    InfoIcon,
    WarningIcon,
  },
  props: {
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
    term: {
      type: [ Array, String ],
      required: true,
    },
    tooltip: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      required: false,
      default: 'string',
      validator: type => [
        'code',
        'color',
        'image',
        'link',
        'string',
        'urls',
      ].indexOf(type) !== -1,
    },
    validation: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: [ Array, Number, String ],
      required: false,
      default() {
        return '';
      },
    },
  },
  computed: {
    errorMessage() {
      return this.errors?.[0]?.message.trim();
    },
    errors() {
      return this.validation.errors.filter(item => (item.path[0] === this.term));
    },
    hasErrors() {
      return this.validation.errors && this.errors.length;
    },
    hasWarnings() {
      return this.validation.warnings && this.warnings.length;
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
    isCodeValue() {
      return this.type === 'code' && this.value;
    },
    isUrlsValue() {
      return this.type === 'urls' && this.value;
    },
    isNotSupported() {
      return this.type === 'notSupported' && this.value;
    },
    showItem() {
      return this.term && this.value || this.required;
    },
    showTooltip() {
      return Boolean(this.term && this.tooltip.info) || Boolean(this.hasErrors || this.hasWarnings);
    },
    termIsArray() {
      return Array.isArray(this.term);
    },
    warningMessage() {
      return this.warnings?.[0]?.message.trim();
    },
    warnings() {
      return this.validation.warnings.filter(item => (item.path[0] === this.term));
    },
    valueExceedsLimit() {
      return this.hasErrors && this.validation.errors
        .find(item => (item.path[0] === this.term && item?.context?.limit > 0));
    },
    splittedStringStart() {
      const { limit } = this.valueExceedsLimit.context;
      return this.value.substring(0, limit);
    },
    splittedStringEnd() {
      const { limit } = this.valueExceedsLimit.context;
      return this.value.substring(limit);
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
    word-wrap: break-word;
  }

  .properties-item__term--not-supported,
  .properties-item__value--not-supported {
    text-decoration: line-through;
  }

  .properties-item__value--not-supported {
    opacity: .5;
  }

  .properties-item__value--image {
    word-break: break-all;
  }

  .properties-item__value--code {
    background-color: #eee;
    border-radius: 2px;
    color: #555;
    flex: initial;
    line-height: 1.15;
    padding: 0.125rem 0.25rem 0.25rem;
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

  .properties-item__strikethrough {
    text-decoration: line-through;
    opacity: .5;
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
