<template>
  <div class="slack">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <preview-iframe
        v-else
        :url="previewUrl"
        iframeClass="slack__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://slack.com/">slack.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-if="!og.title"
          :schema="appMetaSchema"
          :value="head.title"
          key-name="title"
        >
          <template #default>title</template>
        </properties-item>
        <properties-item
          v-if="!og.description"
          :schema="appMetaSchema"
          :value="headDescription"
          key-name="description"
        >
          <template #default>description</template>
        </properties-item>
        <properties-item
          v-for="item in slackProperties"
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
  findAdditionSlackData,
  findFavicons,
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
          required: false,
          tag: 'og:title',
        },

        'og:description': {
          exist: false,
          required: false,
          tag: 'og:description',
          valueLength: {
            max: 700,
            tooLong: false,
          },
        },

        'og:site_name': {
          exist: false,
          required: false,
          tag: 'og:site_name',
        },

        'og:image': {
          exist: false,
          hasVariation: false,
          required: false,
          requiredSizes: {
            minimum: {
              width: 1,
              height: 1,
            },
            variation: {
              width: 202,
              height: 202,
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
    hasRequiredData() {
      return (
        (this.og.title || this.head.title) &&
        (this.og.description || this.headDescription)
      );
    },
    og() {
      return {
        title: this.propertyValue('og:title'),
        description: this.propertyValue('og:description'),
        site_name: this.propertyValue('og:site_name'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
      };
    },
    headDescription() {
      return findMetaContent(this.head, 'description');
    },
    additional() {
      try {
        return {
          favicon: findFavicons(this.head)[0].url,
          additionalData: findAdditionSlackData(this.head),
        };
      } catch (error) {
        return error;
      }
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
      params.set('additionalData', JSON.stringify(this.additional.additionalData));
      params.set('description', this.og.description || this.headDescription);
      params.set('favicon', this.additional.favicon);
      params.set('image', this.og.image);
      params.set('imageIsBig', this.imageDimensions.height > 201 && this.imageDimensions.width > 201);
      params.set('siteName', this.og.site_name);
      params.set('theme', this.themeClass);
      params.set('title', this.og.title || this.head.title || 'Weblink');
      params.set('url', this.head.url);
      params.set('validImage', this.imageDimensions.height > 0 && this.imageDimensions.width > 0);
      return `/previews/slack/slack.html?${ params }`;
    },
    slackProperties() {
      return [
        {
          keyName: 'og:title',
          title: 'og:title',
          value: this.og.title,
        },
        {
          keyName: 'og:description',
          title: 'og:description',
          value: this.og.description,
        },
        {
          keyName: 'og:site_name',
          title: 'og:site_name',
          value: this.og.site_name,
        },
        {
          keyName: 'og:image',
          title: 'og:image',
          value: this.og.image,
        },
      ];
    },
  },
  watch:{
    'og.image'(){
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
    findImageDimensions(){
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

      this.tooltip['og:description'].valueLength.tooLong =
        this.og.description?.length > this.tooltip['og:description'].valueLength.max;
      this.tooltip['og:image'].size = imageDimensions;
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName) || findMetaContent(this.head, propName);
    },
  },
};
</script>

<style>
.slack__preview {
  max-width: 521px;
}

.slack .properties-item__icon {
  margin-left: 4px;
}
</style>
