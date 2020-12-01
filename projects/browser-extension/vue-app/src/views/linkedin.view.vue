<template>
  <div class="linkedin">
    <panel-section title="Preview">
      <p v-if="!hasOgImage">
        This page does not contain the necessary metadata to create a preview.
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
        <properties-item
          v-if="head.title !== og.title"
          :schema="appMetaSchema"
          :value="head.title"
          key-name="title"
        >
          <template #default>title</template>
        </properties-item>
        <properties-item
          v-for="item in linkedinProperties"
          :key="item.keyName"
          :key-name="item.keyName"
        >
          <template #default>
            <social-media-tooltip
              :exist="tooltip[item.keyName].exist"
              :has-variation="tooltip[item.keyName].hasVariation"
              :required-sizes="tooltip[item.keyName].requiredSizes"
              :required="tooltip[item.keyName].required"
              :size="tooltip[item.keyName].size"
              :tag="tooltip[item.keyName].tag"
              :type="item.keyName"
            />
          </template>
          <template v-if="item.value && item.keyName.includes(':image')" #value>
            <external-link :href="absoluteUrl(item.value)">
              <img :src="absoluteUrl(item.value)" alt="" />
              <span>{{ item.value }}</span>
            </external-link>
          </template>
          <template v-else-if="item.value" #value>
            {{ item.value }}
          </template>
        </properties-item>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  findImageDimensions,
  findMetaProperty
} from '@shared/lib/find-meta';
import appMetaSchema from '@shared/lib/schemas/app-meta-schema';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import getTheme from '@shared/lib/theme';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import SocialMediaTooltip from '@shared/components/social-media-tooltip';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
    SocialMediaTooltip,
  },
  data() {
    return {
      appMetaSchema,
      imageDimensions: {
        height: undefined,
        width: undefined,
      },
      tooltip: {
        'og:title': {
          exist: null,
          required: false,
          tag: null,
        },

        'og:image': {
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
    og() {
      return {
        title: this.propertyValue('og:title'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
      };
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
      params.set('imageIsBig', this.imageDimensions.height > 400 && this.imageDimensions.width > 400);

      return `/previews/linkedin/linkedin.html?${ params }`;
    },
    linkedinProperties() {
      return [
        {
          keyName: 'og:title',
          title: 'og:title',
          value: this.og.title,
        },
        {
          keyName: 'og:image',
          title: 'og:image',
          value: this.og.image,
        },
      ];
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
      });
    },
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    setTooltipData(imageDimensions) {
      if (this.og.title !== null) {
        this.tooltip['og:title'].tag = 'og:title';
        this.tooltip['og:title'].exist = true;
      } else if (this.head.title !== null) {
        this.tooltip['og:title'].tag = '<title>';
        this.tooltip['og:title'].exist = false;
      } else {
        this.tooltip['og:title'].tag = false;
        this.tooltip['og:title'].exist = false;
      }
      this.og.image
        ? (this.tooltip['og:image'].exist = true)
        : (this.tooltip['og:image'].exist = false);

      this.tooltip['og:image'].size = imageDimensions;
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
