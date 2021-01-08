<template>
  <div v-if="showItem" class="properties-item">
    <dt class="properties-item__term">
      <span>{{ term }}</span>
    </dt>

    <dd v-if="isImageValue" class="properties-item__value">
      <external-link :href="image.url">
        <img
          class="properties-item__image"
          :src="image.url"
          :alt="image.title ? image.title : ''"
        />
      </external-link>
      <span>{{ image.href }}</span>
    </dd>

    <dd v-else-if="isUrlValue" class="properties-item__value">
      <external-link :href="value">
        {{ value }}
      </external-link>
    </dd>

    <dd v-else-if="isColorValue" class="properties-item__value">
      <span>{{ value }}</span>
      <span class="properties-item__color" :style="{ backgroundColor: value }"></span>
    </dd>

    <dd v-else class="properties-item__value">
      <span>{{ value }}</span>
    </dd>
  </div>
</template>

<script>
import ExternalLink from './external-link';
// import AppTooltip from './app-tooltip';

export default {
  components: { ExternalLink },
  props: {
    image: {
      type: Object,
      default() {
        return null;
      },
      validator: image => (image.url && image.href),
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
      type: [ String, Array ],
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'string',
      validator: type => [ 'string', 'url', 'image', 'color' ].indexOf(type) !== -1,
    },
    value: {
      type: [ String, Number ],
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    isColorValue() {
      return this.type === 'color';
    },
    isImageValue() {
      return this.type === 'image' && this.image;
    },
    isUrlValue() {
      return this.type === 'url';
    },
    showItem() {
      return this.term && this.value || this.required;
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

  .properties-item__term {
    color: var(--label-color);
    flex: 1 1 auto;
    text-align: right;
    word-break: break-word;
    min-width: 120px;
  }

  .properties-item__value {
    color: var(--value-color);
    flex: 0 0 70%;
    margin-left: 1rem;
  }

  .properties-item__color {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-left: 3px;
    border: 1px solid #888;
  }

  .properties-item__image {
    display: block;
    max-width: 200px;
  }
</style>
