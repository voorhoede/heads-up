<template>
  <div class="slack">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain og:image meta data to create a preview.
      </p>

      <figure v-if="hasRequiredData">
        <iframe
          ref="iframe"
          :src="previewUrl"
          :height="iframeHeight"
          title="Slack preview"
          width="100%"
          class="slack__preview"
          @load="onResize"
        />
        <figcaption class="slack__preview-caption">
          Preview based on
          <external-link href="https://slack.com/">
            slack.com
          </external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <template>
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
          <dd>{{ og.title }}</dd>
        </template>
        <template v-if="og.image">
          <dt>
            <p v-if="og.image === null">
              og:image
            </p>
            <app-tooltip
              v-if="showTooltip"
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <InfoIcon
                v-if="tooltip.image.size.width > 0 && tooltip.image.size.height > 0"
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
          </dt>          <dd>
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
        </template>
        <template>
          <dt>
            <p v-if="!og.description">
              og:description
            </p>
            <app-tooltip
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <InfoIcon
                v-if="og.description === null"
                class="properties-item__icon"
              />
              
              <p>
                og:description
              </p>
              <template v-slot:info>
                <property-data
                  type="og:description"
                  :exist="tooltip.description.exist"
                  :tag="tooltip.description.tag"
                  :value="tooltip.description.content"
                />
              </template>
            </app-tooltip>
          </dt>
          <dd>{{ og.description }}</dd>
        </template>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import InfoIcon from "../assets/icons/info.svg";
import { mapState } from "vuex";
import {
  ExternalLink,
  PanelSection,
  PropertiesList,
  AppTooltip,
  PropertyData
} from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions,
  findFavicons,
  findAdditionSlackData
} from "../lib/find-meta";

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
    AppTooltip,
    PropertyData,
    InfoIcon
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
          required: false,
          tag: "og:description",
          value: null,
          valueLength: {
            max: 700,
            tooLong: null
          }
        },

        image: {
          exist: false,
          hasVariation: false,
          required: true,
          requiredSizes: {
            minimum: {
              width: 1,
              height: 1
            },
            variation: {
              width: 202,
              height: 202
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
    hasRequiredData() {
      return this.og.title !== null || this.og.description !== null;
    },
    og() {
      return {
        title: this.propertyValue("og:title"),
        description: this.propertyValue("og:description"),
        image: this.absoluteUrl(this.propertyValue("og:image"))
      };
    },
    additional() {
      try {
        return {
          favicon: findFavicons(this.head)[0].url,
          additionalData: findAdditionSlackData(this.head)
        };
      } catch (error) {
        return error;
      }
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
      if (!url) return;
      return url.startsWith("http") ? url : new URL(this.head.url).origin + url;
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
      params.set("title", this.og.title || this.head.title || "Weblink");
      params.set("url", this.head.url);
      params.set("image", this.og.image);
      params.set("theme", this.themeClass);
      params.set("description", this.og.description);
      params.set("favicon", this.additional.favicon);
      params.set(
        "additionalData",
        JSON.stringify(this.additional.additionalData)
      );
      params.set(
        "imageIsBig",
        imageDimensions.height > 201 && imageDimensions.width > 201
      );
      params.set(
        "validImage",
        imageDimensions.height > 0 && imageDimensions.width > 0
      );
      return `/slack-preview/slack-preview.html?${params}`;
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
.slack__preview {
  max-width: 521px;
  min-height: 360px;
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.slack__preview-caption {
  color: var(--label-color);
}

.slack .properties-item__icon {
    margin-left: 4px;
}
</style>
