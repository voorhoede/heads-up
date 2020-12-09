<template>
  <div class="whatsapp">
    <panel-section title="Preview">
      <p v-if="!hasDescription">
        This page does not contain an Open Graph description to create a
        preview.
      </p>
      <preview-iframe
        v-if="hasDescription && previewUrl"
        :url="previewUrl"
        iframeClass="whatsapp__preview"
      >
        <template v-slot:caption>
          Preview based on
          <external-link href="https://web.whatsapp.com/">
            web.whatsapp.com
          </external-link>
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
          v-for="item in whatsappProperties"
          :key="item.keyName"
          :key-name="item.keyName"
        >
          <template #default>
            <social-media-tooltip
              :exist="tooltip[item.keyName].exist"
              :has-variation="tooltip[item.keyName].hasVariation"
              :ignore="tooltip[item.keyName].ignore"
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

    <panel-section title="Resources">
      <ul class="resource-list">
        <ul>
          <li>
            <external-link
              href="https://stackoverflow.com/a/43154489"
            >
              2019 WhatsApp sharing standards (on StackOverflow)
            </external-link>
          </li>
          <li>
            <external-link
              href="https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing"
            >
              Unfurl mechanism used by WhatsApp for sharing
            </external-link>
          </li>
        </ul>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  findMetaProperty,
  findImageDimensions
} from '@shared/lib/find-meta';
import appMetaSchema from '@shared/lib/schemas/app-meta-schema';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
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

        'og:description': {
          exist: null,
          required: true,
          tag: 'og:description',
          valueLength: {
            max: 300,
            tooLong: null,
          },
        },

        'og:type': {
          ignore: true,
        },

        'og:image': {
          exist: false,
          hasVariation: false,
          required: false,
          requiredSizes: {
            minimum: {
              width: 100,
              height: 100,
            },
            variation: {
              width: null,
              height: null,
            },
          },
          size: {
            width: null,
            height: null,
          },
          tag: 'og:image',
        },

        'og:url': {
          ignore: true,
        },
      },
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    og() {
      return {
        title: this.propertyValue('og:title'),
        description: this.propertyValue('og:description'),
        type: this.propertyValue('og:type'),
        image: this.propertyValue('og:image'),
        url: this.propertyValue('og:url'),
      };
    },
    description() {
      return this.og.description;
    },
    hasDescription() {
      return this.og.description !== null && this.og.description.length > 0;
    },
    image() {
      if (this.og.image !== undefined) {
        return this.absoluteUrl(this.og.image);
      } else {
        return this.og.image;
      }
    },
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.og.title || this.title);
      params.set('description', this.description);

      if (this.imageDimensions.height >= 100 && this.imageDimensions.width >= 100) {
        params.set('image', this.image);
      }

      params.set('url', this.head.url);
      return `/previews/whatsapp/whatsapp.html?${ params }`;
    },
    whatsappProperties() {
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
          keyName: 'og:type',
          title: 'og:type',
          value: this.og.type,
        },
        {
          keyName: 'og:image',
          title: 'og:image',
          value: this.absoluteUrl(this.og.image),
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
      if (this.propertyValue('og:title') !== null) {
        this.tooltip['og:title'].tag = 'og:title';
        this.tooltip['og:title'].exist = true;
      } else if (this.head.title !== null) {
        this.tooltip['og:title'].tag = '<title>';
        this.tooltip['og:title'].exist = false;
      } else {
        this.tooltip['og:title'].tag = false;
        this.tooltip['og:title'].exist = false;
      }

      if (this.propertyValue('og:description') !== null) {
        this.tooltip['og:description'].exist = true;
        this.tooltip['og:description'].valueLength.tooLong =
          this.propertyValue('og:description').length > 300;
      } else {
        this.tooltip['og:description'].exist = false;
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
.whatsapp__preview {
  max-width: 521px;
}

.properties-item__tooltip {
  display: inline-block;
}

@media (min-width: 500px) {
  .properties-item {
    display: flex;
    align-items: flex-start;
  }
  .properties-item__term {
    display: flex;
    justify-content: flex-end;
    width: var(--term-width-small);
    padding-right: 5px;
  }
  .whatsapp .properties-item__term * + * {
    margin-left: 0.15rem;
  }
}
.whatsapp .properties-item__icon {
  margin-left: 4px;
}

.properties-item-icon--warning {
  fill: #eac250;
}
</style>
