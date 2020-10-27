<template>
  <div class="properties-item">
    <dt class="properties-item__term">
      <span v-if="warnings || errors">
        <slot />
      </span>

      <app-tooltip
        v-if="schema"
        class="properties-item__tooltip"
        placement="top-start"
      >
        <InfoIcon
          v-if="warnings && !errors"
          class="properties-item__icon"
        />
        <WarningIcon
          v-else-if="errors"
          class="properties-item__icon properties-item-icon--warning"
        />
        <span v-else>
          <slot />
        </span>

        <template #info>
          <span v-if="warnings && !errors">
            <template v-if="warnings.length === 1">
              {{ warningMessage }}
            </template>
            <ul
              v-else
              class="properties-item__error-list"
            >
              <li
                v-for="warning in warnings"
                :key="warning.message"
                v-html="warning.message"
              />
            </ul>
          </span>

          <span v-if="errors">
            <template v-if="errors.length === 1">
              {{ errorMessage }}
            </template>
            <ul
              v-else
              class="properties-item__error-list"
            >
              <li
                v-for="error in errors"
                :key="error.message"
                v-html="error.message"
              />
            </ul>
          </span>
          <span
            v-if="!errors && !warnings"
            v-html="info"
          />
        </template>

        <template #link>
          <external-link class="properties-item__link" :href="link">Learn more</external-link>
        </template>
      </app-tooltip>

      <slot v-else />
    </dt>

    <dd class="properties-item__description">
      <span
        v-if="!valueWithExceededLength && isUrl"
        :class="{ 'properties-item__strike': errors && !valueWithExceededLength }"
      >
        <external-link v-if="value" :href="value">{{ value }}</external-link>
      </span>
      <span
        v-else-if="!valueWithExceededLength"
        :class="{ 'properties-item__strike': errors && !valueWithExceededLength }"
      >
        {{ value }}
      </span>
      <span v-if="valueWithExceededLength">
        {{ valueMinusExceededLength }}
      </span>
      <span v-if="valueWithExceededLength" class="properties-item__strike">
        {{ valueWithExceededLength }}
      </span>
      <span v-if="valueSlot" class="properties-item__extra">
        <slot name="value" />
      </span>
    </dd>
  </div>
</template>

<script>
import validateErrorSchema from '../lib/validate-error-schema';
import validateWarningSchema from '../lib/validate-warning-schema';
import ExternalLink from './external-link';
import AppTooltip from './app-tooltip';
import InfoIcon from '../assets/icons/info.svg';
import WarningIcon from '../assets/icons/warning.svg';

export default {
  components: { AppTooltip, ExternalLink, InfoIcon, WarningIcon },
  props: {
    schema: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
    keyName: {
      type: String,
    },
    value: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    isUrl: {
      type: Boolean,
      required: false,
      default: false,
    },
    attrs: {
      type: Object,
      required: false,
      default: undefined,
    },
    refreshOn: {
      type: Array,
    },
  },
  data() {
    return {
      info: '',
      link: '',
      errors: null,
      warnings: null,
      valueSlot: null,
    };
  },
  computed: {
    errorMessage() {
      if (this.errors && this.errors.length > 0) {
        return this.errors[0].message;
      }
      return null;
    },
    warningMessage() {
      if (this.warnings && this.warnings.length > 0) {
        return this.warnings[0].message;
      }
      return null;
    },
    valueWithExceededLength() {
      if (this.errors && this.errors.length > 0 && this.errors[0]['length']) {
        return this.value.slice(this.errors[0]['length'] * -1);
      }
      return null;
    },
    valueMinusExceededLength() {
      if (this.errors && this.errors.length > 0 && this.errors[0]['length']) {
        return this.value.slice(
          0,
          this.value.length - this.errors[0]['length']
        );
      }
      return null;
    },
  },
  watch:{
    refreshOn() {
      if (this.schema) { this.validateSchema(); }
    },
  },
  mounted() {
    if (this.$slots && this.$slots.value) {
      this.valueSlot = this.$slots.value;
    }

    if (!this.schema) { return; }

    if (this.schema[this.keyName] && this.schema[this.keyName].meta) {
      this.info = this.schema[this.keyName].meta.info;
      this.link = this.schema[this.keyName].meta.link;
    }

    if (this.schema) { this.validateSchema(); }
  },
  methods:{
    validateSchema() {
      const schemaTemplate = {
        schema: this.schema,
        key: this.keyName,
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
  width: 100%;
}

.properties-item .properties-item__term {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  color: var(--label-color);
}

.properties-item__icon {
  display: inline-block;
  position: relative;
  top: -1px;
  width: 18px;
  height: 18px;
  margin-left: 5px;
  fill: currentcolor;
  vertical-align: middle;
  cursor: help;
}

.properties-item-icon--warning {
  fill: #eac250;
}

.properties-item__extra > span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 3px;
  border: 1px solid #888;
}

.properties-item__strike {
  color: var(--label-color);
  text-decoration: line-through;
}

.properties-item__error-list {
  margin-left: 1rem;
}
</style>
