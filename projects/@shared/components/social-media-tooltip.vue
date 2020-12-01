<template>
  <app-tooltip class="properties-item__tooltip" placement="bottom-start">
    <p v-if="!tooltipIconType">
      {{ type }}
    </p>
    <p v-else>
      {{ type }}
      <InfoIcon
        v-if="tooltipIconType === 'info'"
        class="properties-item__icon"
      />
      <WarningIcon
        v-if="tooltipIconType === 'warning'"
        class="properties-item__icon properties-item-icon--warning"
      />
    </p>
    <template #info>
      <span>{{ tooltipMessage }}</span>
    </template>
  </app-tooltip>
</template>

<script>
import AppTooltip from '@shared/components/app-tooltip';
import InfoIcon from '@shared/assets/icons/info.svg';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: {
    AppTooltip,
    InfoIcon,
    WarningIcon,
  },
  props: {
    exist: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    valueLength: {
      type: Object,
      default: () => ({}),
    },
    hasVariation: {
      type: Boolean,
      default: false,
    },
    requiredSizes: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tooltipIconType: null,
    };
  },
  computed: {
    tooltipMessage() {
      let result = '';

      this.required ? (result += this.isRequired(this.tag)) : '';
      this.exist ? '' : (result += this.isDefined(this.type));

      if (this.valueLength !== undefined) {
        this.valueLength.tooLong
          ? (result += this.isTooLong(this.valueLength.max))
          : '';
      }

      if (this.type === 'og:image') {
        result += !this.value ? this.isCorrectUrl(this.type, this.exist) : '';
        result += this.isBigImg(
          this.type,
          this.hasVariation,
          this.size,
          this.requiredSizes
        );
      }

      if (result.length === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tooltipIconType = null;
        result += `The ${ this.type } tag is perfectly implemented. `;
      }

      return result;
    },
  },
  methods: {
    isRequired(tag) {
      this.tooltipIconType = 'info';
      return `The ${ tag } is required to create an unfurling link on this platform. `;
    },
    isDefined(tag) {
      const isImg = tag === 'og:image';
      const metaTagContent = isImg ? 'Your source' : 'Your content';

      this.tooltipIconType = this.required ? 'warning' : 'info';
      return `There is no ${ tag } defined. You can create the ${ tag } in the <head> like <meta property="${ tag }" content="${ metaTagContent }."> `;
    },
    isTooLong(length) {
      this.tooltipIconType = this.tooltipIconType ? this.tooltipIconType : 'info';
      return `The content has more than ${ length } characters. Consider shorten your content. `;
    },
    isCorrectUrl(tag, correct) {
      if (correct) {
        return '';
      }

      this.tooltipIconType = 'warning';
      return `The ${ tag } URL can't be reached. `;
    },
    isBigImg(tag, smallVariant, imgSize, requiredSize) {
      const imageHeightIsBigEnough =
        requiredSize.variation.height > imgSize.height;
      const imageWidthIsBigEnough =
        requiredSize.variation.width > imgSize.width;

      if (smallVariant && imageHeightIsBigEnough && imageWidthIsBigEnough) {
        this.tooltipIconType = this.tooltipIconType ? this.tooltipIconType : 'info';
        return `The ${ tag } is ${ imgSize.width } by ${ imgSize.height }px, where ${ requiredSize.variation.width } by ${ requiredSize.variation.height }px is required for a big unfurling preview. `;
      }

      if (
        requiredSize.minimum.width > imgSize.width ||
        requiredSize.minimum.height > imgSize.height
      ) {
        this.tooltipIconType = 'warning';
        return `The ${ tag } sizes are too small for a preview. You need at least an image of ${ requiredSize.minimum.width } by ${ requiredSize.minimum.height }px. `;
      }

      return '';
    },
  },
};
</script>
