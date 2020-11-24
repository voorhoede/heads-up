<template>
  <div class="facebook">
    <tab-selecter
      v-model="openTab"
      :tabs="TABS"
    />

    <panel-section
      v-if="openTab === 'mobile'"
      title="Preview"
    >
      <preview-iframe
        :url="previewUrl"
        iframeClass="facebook__preview"
      >
        <template v-slot:caption>
          Preview based on
          <external-link href="https://m.facebook.com/">
            m.facebook.com
          </external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section
      v-if="openTab === 'desktop'"
      title="Preview"
    >
      <preview-iframe
        :url="previewUrl"
        class="facebook__preview"
      >
        <template v-slot:caption>
          Preview based on
          <external-link href="https://facebook.com/">
            facebook.com
          </external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in facebookMetaData"
          :key="item.keyName"
          :key-name="item.keyName"
        >
          <template #default>
            {{ item.title }}
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
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from '@shared/lib/find-meta';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import ExternalLink from '@shared/components/external-link';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import TabSelecter from '@shared/components/tab-selecter';

const TABS = [
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'Desktop',
    value: 'desktop',
  },
];

export default {
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
    TabSelecter,
  },
  data() {
    return {
      imageDimensions: { width: 0, height: 0 },
      imageSpecified: true,
      TABS,
      openTab: TABS[0].value,
      tooltip: {
        title: {
          exist: null,
          required: false,
          tag: null,
          value: null,
        },

        description: {
          exist: null,
          required: false,
          tag: 'og:description',
          value: null,
          valueLength: {
            max: 250,
            tooLong: null,
          },
        },

        image: {
          exist: false,
          hasVariation: true,
          required: false,
          requiredSizes: {
            minimum: {
              width: 100,
              height: 100,
            },
            variation: {
              width: 415,
              height: 415,
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
    og() {
      return {
        title: this.propertyValue('og:title'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
        description: this.propertyValue('og:description'),
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
      params.set('title', this.og.title || this.head.title);
      params.set('url', this.head.url);
      params.set('image', this.og.image);
      params.set('theme', this.themeClass);
      params.set('imageSpecified', this.imageSpecified);
      params.set('description', this.og.description);
      if (this.og.image !== undefined) {
        params.set(
          'mobileImgIsBig',
          (this.imageDimensions.height > 359 && this.imageDimensions.width > 359) ||
            (this.imageSpecified &&
              (this.imageDimensions.height === 0 || this.imageDimensions.width === 0))
        );
      }
      params.set(
        'desktopImgIsBig',
        this.imageDimensions.height >= 415 && this.imageDimensions.width >= 415
      );
      return `${
        this.openTab === 'desktop'
          ? `/previews/facebook-desktop/facebook-desktop.html?${ params }`
          : `/previews/facebook-mobile/facebook-mobile.html?${ params }`
      }`;
    },
    facebookMetaData() {
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
      if (this.propertyValue('og:title') !== null) {
        this.tooltip.title.tag = 'og:title';
        this.tooltip.title.value = this.propertyValue('og:title');
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

      if (this.propertyValue('og:description') !== null) {
        this.tooltip.description.value = this.propertyValue('og:description');
        this.tooltip.description.exist = true;
        this.tooltip.description.valueLength.tooLong =
          this.propertyValue('og:description').length > 250;
      } else {
        this.tooltip.description.exist = false;
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
.facebook__preview {
  max-width: 521px;
  min-height: 400px;
}

.facebook .properties-item__icon {
  margin-left: 4px;
}
</style>
