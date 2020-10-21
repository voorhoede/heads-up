<template>
  <div class="facebook">
    <!-- <switch-buttons
      :buttons="switchButtons"
      :value="mode"
      @change="toggle"
    /> -->

    <panel-section
      v-if="mode === 'mobile'"
      title="Preview"
    >
      <figure>
        <iframe
          ref="iframe"
          :src="previewUrl"
          :height="iframeHeight"
          width="100%"
          class="facebook__preview"
          @load="onResize"
        />
        <figcaption class="facebook__preview-caption">
          Preview based on
          <external-link href="https://m.facebook.com/">
            m.facebook.com
          </external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section
      v-if="mode === 'desktop'"
      title="Preview"
    >
      <figure>
        <iframe
          ref="iframe"
          :src="previewUrl"
          :height="iframeHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          class="facebook__preview"
          @load="onResize"
        />
        <figcaption class="facebook__preview-caption">
          Preview based on
          <external-link href="https://facebook.com/">
            facebook.com
          </external-link>.
        </figcaption>
      </figure>
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
            <InfoIcon
              v-if="!og.title"
              class="properties-item__icon"
            />
            <p v-else>
              og:title
            </p>
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
        <dd>{{ og.title }}</dd>
        <template v-if="og.description">
          <dt>
            <p v-if="!og.description">
              og:description
            </p>
            <app-tooltip
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <InfoIcon
                v-if="!og.description"
                class="properties-item__icon"
              />
              <p v-else>
                og:description
              </p>
              <template #info>
                <property-data
                  type="og:description"
                  :exist="tooltip.description.exist"
                  :required="tooltip.description.required"
                  :tag="tooltip.description.tag"
                  :value="tooltip.description.value"
                  :value-length="tooltip.description.valueLength"
                />
              </template>
            </app-tooltip>
          </dt>
          <dd>{{ og.description }}</dd>
        </template>
        <dt>
          <p v-if="!og.image">
            og:image
          </p>
          <app-tooltip
            class="properties-item__tooltip"
            placement="bottom-start"
          >
            <InfoIcon
              v-if="!og.image"
              class="properties-item__icon"
            />
            <p v-else>
              og:image
            </p>
            <template #info>
              <property-data
                type="og:image"
                :exist="tooltip.image.exist"
                :has-variation="tooltip.image.hasVariation"
                :required-sizes="tooltip.image.requiredSizes"
                :size="tooltip.image.size"
                :tag="tooltip.image.tag"
              />
            </template>
          </app-tooltip>
        </dt>
        <dd>
          <external-link :href="absoluteUrl(og.image)">
            <img
              alt
              :src="absoluteUrl(og.image)"
            >
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
import getTheme from '@shared/lib/theme';
import InfoIcon from '@shared/assets/icons/info.svg';
import PanelSection from '@shared/components/panel-section.vue';
import ExternalLink from '@shared/components/external-link.vue';
import PropertiesList from '@shared/components/properties-list.vue';
import AppTooltip from '@shared/components/app-tooltip.vue';

import {
  // SwitchButtons,
  PropertyData
} from '../components';
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
    // SwitchButtons,
    AppTooltip,
    InfoIcon,
    PropertyData,
  },
  data() {
    return {
      iframeHeight: 'auto',
      imageDimensions: { width: 0, height: 0 },
      imageSpecified: true,
      switchButtons: [
        {
          label: 'Mobile',
          value: 'mobile',
        },
        {
          label: 'Desktop',
          value: 'desktop',
        },
      ],
      mode: 'mobile',
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
        this.mode === 'desktop'
          ? `/previews/facebook-desktop/facebook-desktop.html?${ params }`
          : `/previews/facebook-mobile/facebook-mobile.html?${ params }`
      }`;
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
    toggle(newMode) {
      this.mode = newMode;
      this.previewUrl = this.previewUrl({
        imageDimensions: this.imageDimensions,
      });
    },
    absoluteUrl(url) {
      if (!url) return;
      return url.startsWith('http') ? url : new URL(this.head.url).origin + url;
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
    onResize() {
      this.iframeHeight =
        parseInt(
          this.$refs.iframe.contentWindow.document.body.scrollHeight + 2
        ) + 'px';
    },
  },
};
</script>

<style>
.facebook__preview {
  max-width: 521px;
  min-height: 400px;
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.facebook__preview-caption {
  color: var(--label-color);
}

.facebook .properties-item__icon {
  margin-left: 4px;
}
</style>
