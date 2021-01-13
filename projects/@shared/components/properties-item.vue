<template>
  <div v-if="showItem" class="properties-item">
    <dt class="properties-item__term">
      <template v-if="termIsIterable">
        <template v-for="(item, index) in term">
          <span v-if="item" :key="index">{{ item }}</span>
        </template>
      </template>
      <span v-else>{{ term }}</span>
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
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    isColorValue() {
      /*
        Required value prop format:
        - String
        - Hex value
       */
      return this.type === 'color';
    },
    isImageValue() {
      /*
        Required value prop format:
        - Object
        - { url: '', title (optional): '', href: '' }
       */
      return this.type === 'image' && this.image;
    },
    termIsIterable() {
      return typeof this.term === 'object';
    },
    isLinkValue() {
      /*
        Required value prop format:
        - String
       */
      return this.type === 'link';
    },
    isUrlsValue() {
      /*
        Required value prop format:
        - Array
        - [ { url: '', attributes (optional): {...} } ]
       */
      return this.type === 'urls';
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
