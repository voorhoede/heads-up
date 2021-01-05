<template>
  <div class="linkedin">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <preview-iframe
        v-else
        :url="previewUrl"
        iframeClass="linkedin__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://linkedin.com/">linkedin.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
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
              :value-length="tooltip[item.keyName].valueLength"
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
  findMetaContent,
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
          exist: false,
          required: true,
          tag: 'og:title',
        },

        'og:image': {
          exist: false,
          hasVariation: true,
          required: true,
          requiredSizes: {
            minimum: {
              height: 1,
              width: 1,
            },
            variation: {
              height: 400,
              width: 400,
            },
          },
          size: {
            height: null,
            width: null,
          },
          tag: 'og:image',
        },

        'og:description': {
          exist: false,
          required: true,
          tag: 'og:description',
        },

        'og:url': {
          exist: false,
          required: true,
          tag: 'og:url',
        },
      },
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    hasRequiredData() {
      return (
        Boolean(this.og.title) &&
        Boolean(this.og.image) &&
        Boolean(this.og.description) &&
        Boolean(this.og.url)
      );
    },
    og() {
      return {
        title: this.propertyValue('og:title'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
        description: this.propertyValue('og:description'),
        url: this.propertyValue('og:url'),
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
      params.set('title', this.og.title);
      params.set('image', this.og.image);
      params.set('description', this.og.description);
      params.set('url', this.og.url);
      params.set('theme', this.themeClass);
      params.set('imageIsBig', this.imageDimensions.height >= 400 && this.imageDimensions.width >= 400);

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
        {
          keyName: 'og:description',
          title: 'og:description',
          value: this.og.description,
        },
        {
          keyName: 'og:url',
          title: 'og:url',
          value: this.og.url,
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
      for (const [ key, value ] of Object.entries(this.og)) {
        this.tooltip[`og:${ key }`].exist = Boolean(value);
      }

      this.tooltip['og:image'].size = imageDimensions;
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName) || findMetaContent(this.head, propName);
    },
  },
};
</script>

<style>
.linkedin__preview {
  max-width: 520px;
}

.linkedin .properties-item__icon {
  margin-left: 4px;
}
.properties-item-icon--warning {
  fill: #eac250;
}
</style>
