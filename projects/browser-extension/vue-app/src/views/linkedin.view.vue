<template>
  <div class="linkedin">
    <panel-section title="Preview">
      <p v-if="!hasOgImage">
        This page does not contain og:image meta data to create a preview.
      </p>
      <preview-iframe
        v-if="hasOgImage"
        :url="previewUrl"
        iframeClass="linkedin__preview"
      >
        <template v-slot:caption>
          Preview based on
          <external-link href="https://linkedin.com/">
            linkedin.com
          </external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dt>
          <p v-if="!og.title">
            og:title
          </p>
          <app-tooltip
            class="properties-item__tooltip"
            placement="bottom-start"
          >
            <div v-if="og.title">
              og:title
            </div>
            <div v-else>
              <InfoIcon class="properties-item__icon" />
            </div>
            <template #info>
              <property-data
                type="og:title"
                :exist="tooltip.title.exist"
                :tag="tooltip.title.tag"
                :value="tooltip.title.content"
              />
            </template>
          </app-tooltip>
        </dt>
        <dd>{{ og.title || title }}</dd>
        <dt>
          <p v-if="!og.image || hasSmallImage">
            og:image
          </p>
          <app-tooltip
            v-if="showTooltip"
            class="properties-item__tooltip"
            placement="bottom-start"
          >
            <InfoIcon
              v-if="og.image && hasSmallImage"
              class="properties-item__icon"
            />
            <WarningIcon
              v-else-if="!og.image"
              class="properties-item__icon properties-item-icon properties-item-icon--warning"
            />
            <p v-else>
              og:image
            </p>
            <template #info>
              <property-data
                type="og:image"
                :exist="tooltip.image.exist"
                :has-variation="tooltip.image.hasVariation"
                :required="tooltip.image.required"
                :required-sizes="tooltip.image.requiredSizes"
                :size="tooltip.image.size"
                :tag="tooltip.image.tag"
              />
            </template>
          </app-tooltip>
        </dt>
        <dd>
          <external-link
            v-if="og.image"
            :href="absoluteUrl(og.image)"
          >
            <img :src="absoluteUrl(og.image)">
            <span>{{ og.image }}</span>
          </external-link>
          <p v-if="imageDimensions">
            ({{ imageDimensions.width }} x {{ imageDimensions.height }}px)
          </p>
        </dd>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import getTheme from '@shared/lib/theme';
import InfoIcon from '@shared/assets/icons/info.svg';
import WarningIcon from '@shared/assets/icons/warning.svg';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import AppTooltip from '@shared/components/app-tooltip';
import PropertyData from '@/components/property-data';
import PreviewIframe from '@shared/components/preview-iframe';
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from '@shared/lib/find-meta';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
    AppTooltip,
    PropertyData,
    PreviewIframe,
    WarningIcon,
    InfoIcon,
  },
  data() {
    return {
      imageDimensions: { width: undefined, height: undefined },
      showTooltip: false,
      tooltip: {
        title: {
          exist: null,
          required: false,
          tag: null,
          value: null,
        },

        image: {
          exist: false,
          hasVariation: true,
          required: true,
          requiredSizes: {
            minimum: {
              width: 1,
              height: 1,
            },
            variation: {
              width: 400,
              height: 400,
            },
          },
          size: {
            width: null,
            height: null,
          },
          tag: 'og:image',
        },
      },
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    hasOgImage() {
      return Boolean(this.og.image);
    },
    title() {
      return this.head.title || 'Weblink';
    },
    og() {
      return {
        title: this.propertyValue('og:title'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
      };
    },
    hasSmallImage() {
      return (
        (this.tooltip.image.hasVariation &&
          this.tooltip.image.size.width <
            this.tooltip.image.requiredSizes.variation.width) ||
        this.tooltip.image.size.heigth <
          this.tooltip.image.requiredSizes.variation.height
      );
    },
    themeClass() {
      /**
       * class '-theme-with-dark-background' is taken from original dev tools repo
       * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
       */
      return getTheme() === 'dark' ? '-theme-with-dark-background' : '';
    },
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.og.title || this.head.title || 'Weblink');
      params.set('url', this.head.url);
      params.set('image', this.og.image);
      params.set('theme', this.themeClass);
      params.set(
        'imageIsBig',
        this.imageDimensions.height > 400 && this.imageDimensions.width > 400
      );

      return `/previews/linkedin/linkedin.html?${ params }`;
    },
  },
  watch: {
    'og.image'() {
      this.findImageDimensions();
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  created() {
    this.findImageDimensions();
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    findImageDimensions() {
      findImageDimensions(this.head, 'og:image').then(imageDimensions => {
        this.imageDimensions = imageDimensions;
        this.setTooltipData(imageDimensions);
        this.showTooltip = true;
      });
    },
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    setTooltipData(imageDimensions) {
      if (this.og.title !== null) {
        this.tooltip.title.tag = 'og:title';
        this.tooltip.title.value = this.og.title;
        this.tooltip.title.exist = true;
      } else if (this.head.title !== null) {
        this.tooltip.title.tag = '<title>';
        this.tooltip.title.value = this.head.title;
        this.tooltip.title.exist = false;
      } else {
        this.tooltip.title.tag = false;
        this.tooltip.title.value = false;
        this.tooltip.title.exist = false;
      }
      this.og.image
        ? (this.tooltip.image.exist = true)
        : (this.tooltip.image.exist = false);

      this.tooltip.image.size = imageDimensions;
    },
    metaValue(metaName) {
      return findMetaContent(this.head, metaName);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName);
    },
  },
};
</script>

<style>
.linkedin__preview {
  max-width: 521px;
  min-height: 350px;
}

.linkedin .properties-item__icon {
  margin-left: 4px;
}
.properties-item-icon--warning {
  fill: #eac250;
}
</style>
