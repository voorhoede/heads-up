<template>
  <div>
    <panel-section title="Preview">
      <p
        v-if="!hasDescription"
      >
        This page does not contain an Open Graph description to create a preview.
      </p>
      <figure v-if="hasDescription && previewUrl">
        <iframe
          ref="iframe"
          title="whatsapp preview"
          :src="previewUrl"
          :height="iframeHeight"
          width="100%"
          class="whatsapp__preview"
          @load="onResize"
        />
        <figcaption class="whatsapp__preview-caption">
          Preview based on
          <external-link href="https://web.whatsapp.com/">
            web.whatsapp.com
          </external-link>
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dl>
          <template>
            <dt class="title">
              <p v-if="og.title === null">
                og:title
              </p>
              <app-tooltip
                class="properties-item__tooltip"
                placement="bottom-start"
              >
                <InfoIcon
                  v-if="og.title === null"
                  class="properties-item__icon"
                />
                <p v-else>
                  og:title
                </p>
                <template v-slot:info>
                  <property-data
                    type="og:title"
                    :exist="tooltip.title.exist"
                    :tag="tooltip.title.tag"
                    :value="tooltip.title.content"
                  />
                </template>
              </app-tooltip>
            </dt>
            <dd>{{ title }}</dd>
          </template>
          <template>
            <dt>
              <p
                v-if="og.description === null || tooltip.description.valueLength.tooLong"
              >
                og:description
              </p>
              <app-tooltip
                class="properties-item__tooltip"
                placement="bottom-start"
              >
                <WarningIcon
                  v-if="description === null"
                  class="properties-item__icon"
                />
                <infoIcon
                  v-else-if="tooltip.description.valueLength.tooLong"
                  class="properties-item__icon"
                />

                <p v-else>
                  og:description
                </p>

                <template v-slot:info>
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
            <dd>{{ description }}</dd>
          </template>
          <template>
            <dt>
              <p v-if="og.image === null && imageHasValidSize">
                og:image
              </p>
              <app-tooltip
                v-if="showTooltip"
                class="properties-item__tooltip"
                placement="bottom-start"
              >
                <InfoIcon
                  v-if="og.image === null && imageHasValidSize"
                  class="properties-item__icon"
                />
                <p v-else>
                  og:image
                </p>
                <template v-slot:info>
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
            <dd v-if="og.image">
              <external-link :href="absoluteUrl(og.image)">
                <img
                  alt
                  :src="absoluteUrl(og.image)"
                >
                <span>{{ og.image }}</span>
              </external-link>
              <p
                v-if="imageDimensions"
              >
                ({{ imageDimensions.width }} x {{ imageDimensions.height }}px)
              </p>
            </dd>
          </template>
        </dl>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
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
      </resource-list>
    </panel-section>
  </div>
</template>


<script>
import InfoIcon from "../assets/icons/info.svg";
import WarningIcon from "../assets/icons/warning.svg";
import { mapState } from "vuex";
import {
  ExternalLink,
  PanelSection,
  PropertiesList,
  ResourceList,
  AppTooltip,
  PropertyData
} from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from "../lib/find-meta";

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
    ResourceList,
    AppTooltip,
    PropertyData,
    InfoIcon,
    WarningIcon
  },
  data() {
    return {
      iframeHeight: "auto",
      imageDimensions: { width: undefined, height: undefined },
      previewUrl: "",
      showTooltip: false,
      tooltip: {
        title: {
          exist: null,
          required: false,
          tag: null,
          value: null
        },

        description: {
          exist: null,
          required: true,
          tag: "og:description",
          value: null,
          valueLength: {
            max: 300,
            tooLong: null
          }
        },

        image: {
          exist: false,
          hasVariation: false,
          required: false,
          requiredSizes: {
            minimum: {
              width: 100,
              height: 100
            },
            variation: {
              width: null,
              height: null
            }
          },
          size: {
            width: null,
            height: null
          },
          tag: "og:image"
        }
      }
    };
  },
  computed: {
    ...mapState(["head"]),
    hasDescription() {
      const whatsappDescription = this.propertyValue("og:description");
      if (whatsappDescription !== null && whatsappDescription.length > 0) {
        return true;
      }
      return false;
    },
    title() {
      return this.propertyValue("og:title") || this.head.title || "";
    },
    description() {
      return this.og.description;
    },
    image() {
      if (this.og.image !== undefined) {
        return this.absoluteUrl(this.og.image);
      } else {
        return this.og.image;
      }
    },
    imageHasValidSize() {
      return (
        this.tooltip.image.size.width >=
          this.tooltip.image.requiredSizes.minimum.width &&
        this.tooltip.image.size.height >=
          this.tooltip.image.requiredSizes.minimum.height
      );
    },
    url() {
      return this.head.url;
    },
    og() {
      return {
        title: this.propertyValue("og:title"),
        description: this.propertyValue("og:description"),
        type: this.propertyValue("og:type"),
        image: this.propertyValue("og:image"),
        url: this.propertyValue("og:url")
      };
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  created() {
    findImageDimensions(this.head, "og:image").then(imageDimensions => {
      this.imageDimensions = imageDimensions;
      this.setTooltipData(imageDimensions);
      this.showTooltip = true;

      this.previewUrl = this.getPreviewUrl({ imageDimensions });
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    absoluteUrl(url) {
      if (url !== null) {
        return url.startsWith("http")
          ? url
          : new URL(this.head.url).origin + url;
      }

      return "";
    },
    setTooltipData(imageDimensions) {
      if (this.propertyValue("og:title") !== null) {
        this.tooltip.title.tag = "og:title";
        this.tooltip.title.value = this.propertyValue("og:title");
        this.tooltip.title.exist = true;
      } else if (this.head.title !== null) {
        this.tooltip.title.tag = "<title>";
        this.tooltip.title.value = this.head.title;
        this.tooltip.title.exist = false;
      } else {
        this.tooltip.title.tag = false;
        this.tooltip.title.value = false;
        this.tooltip.title.exist = false;
      }

      if (this.propertyValue("og:description") !== null) {
        this.tooltip.description.value = this.propertyValue("og:description");
        this.tooltip.description.exist = true;
        this.tooltip.description.valueLength.tooLong =
          this.propertyValue("og:description").length > 300;
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
    getPreviewUrl({ imageDimensions }) {
      const params = new URLSearchParams();
      params.set("title", this.og.title || this.title);
      params.set("description", this.description);

      if (imageDimensions.height >= 100 && imageDimensions.width >= 100) {
        params.set("image", this.image);
      }

      params.set("url", this.head.url);
      return `/whatsapp-preview/whatsapp-preview.html?${params}`;
    },
    onResize() {
      this.iframeHeight =
        parseInt(
          this.$refs.iframe.contentWindow.document.body.scrollHeight + 2
        ) + "px";
    }
  }
};
</script>

<style>
.whatsapp__preview {
  max-width: 521px;
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.whatsapp__preview html {
  overflow: hidden;
}

.whatsapp__preview-caption {
  color: var(--label-color);
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
  .properties-item__term * + * {
    margin-left: 0.15rem;
  }
}
.properties-item__icon {
  margin-left: 4px;
}
</style>
