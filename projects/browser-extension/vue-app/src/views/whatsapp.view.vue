<template>
  <div class="whatsapp">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <preview-iframe
        v-else
        :url="previewUrl"
        iframeClass="whatsapp__preview"
        :loading-height="122"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://web.whatsapp.com/">web.whatsapp.com</external-link>.
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
  findImageDimensions,
  findMetaContent,
  findMetaProperty
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
          exist: false,
          required: false,
          tag: 'og:title',
        },

        'og:url': {
          exist: false,
          required: false,
          tag: 'og:url',
        },

        'og:description': {
          exist: false,
          required: false,
          tag: 'og:description',
        },

        'og:image': {
          exist: false,
          required: false,
          tag: 'og:image',
          requiredSizes: {
            minimum: {
              height: 200,
              width: 300,
            },
          },
          size: {
            height: null,
            width: null,
          },
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
        url: this.propertyValue('og:url'),
        description: this.propertyValue('og:description'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
      };
    },
    headDescription() {
      return findMetaContent(this.head, 'description');
    },
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.og.title || this.head.title);
      params.set('url', this.og.url || this.head.url);
      params.set('description', this.og.description || this.headDescription);
      if (this.imageDimensions.height >= 200 && this.imageDimensions.width >= 300) {
        params.set('image', this.og.image);
      }

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
          keyName: 'og:url',
          title: 'og:url',
          value: this.og.url,
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

      this.tooltip['og:image'].size = imageDimensions;
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName) || findMetaContent(this.head, propName);
    },
  },
};
</script>

<style>
.whatsapp__preview {
  max-width: 520px;
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
