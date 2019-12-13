<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!hasOgImage">
        This page does not contain og:image meta data to create a preview.
      </p>

      <figure v-if="hasOgImage">
        <iframe
          ref="iframe"
          title="linkedin preview"
          :src="previewUrl"
          :height="iframeHeight"
          width="100%"
          class="linkedin__preview"
          @load="onResize"
        />
        <figcaption class="linkedin__preview-caption">
          Preview based on
          <external-link href="https://linkedin.com/">
            linkedin.com
          </external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <template>
          <dt>
            <app-tooltip
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <div v-if="og.title">
                og:title
              </div>
              <div v-else>
                og:title
                <InfoIcon
                  class="properties-item__icon"
                />
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
          <dd>{{ og.title || title }}</dd>
        </template>
        <template>
          <dt> 
            <app-tooltip
              v-if="showTooltip"
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <div v-if="og.image">
                og:image
                <InfoIcon
                  v-if="
                    tooltip.image.hasVariation && 
                      tooltip.image.size.width < tooltip.image.requiredSizes.variation.width ||
                      tooltip.image.size.heigth < tooltip.image.requiredSizes.variation.height"
                  class="properties-item__icon"
                />
              </div>
              <div v-else>
                <s>og:image</s>
                <WarningIcon
                  class="properties-item__icon"
                />
              </div>
              <template v-slot:info>
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
        </template>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import InfoIcon from "../assets/icons/info.svg";
import WarningIcon from "../assets/icons/warning.svg";
import { mapState } from "vuex";
import { ExternalLink, 
  PanelSection, 
  PropertiesList, 
  AppTooltip, 
  PropertyData 
} from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from "../lib/find-meta";

export default {
  components: { ExternalLink, PanelSection, PropertiesList, AppTooltip, PropertyData, WarningIcon, InfoIcon },
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
          value: null,
        },

        image: {
          exist: false,
          hasVariation: true,
          required: true,
          requiredSizes: {
            minimum: {
              width: 1,
              height: 1
            },
            variation: {
              width: 400,
              height: 400
            }
          },
          size: {
            width: null,
            height: null
          },
          tag: "og:image",
        }
      }
    };
  },
  computed: {
    ...mapState(["head"]),
    hasOgImage() {
      return Boolean(this.og.image);
    },
    title() {
      return this.head.title || "Weblink"
    },
    og() {
      return {
        title: this.propertyValue("og:title"),
        image: this.absoluteUrl(this.propertyValue("og:image"))
      };
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  created() {
    findImageDimensions(this.head, "og:image").then(imageDimensions => {
      this.imageDimensions = imageDimensions;
      this.setTooltipData(imageDimensions)
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
      if (this.og.title !== null) {
        this.tooltip.title.tag = "og:title"
        this.tooltip.title.value = this.og.title
        this.tooltip.title.exist = true
      } else if (this.head.title !== null) {
        this.tooltip.title.tag = "<title>"
        this.tooltip.title.value = this.head.title
        this.tooltip.title.exist = false
      } else {
        this.tooltip.title.tag = false
        this.tooltip.title.value = false
        this.tooltip.title.exist = false
      }
      this.og.image
        ? this.tooltip.image.exist = true
        : this.tooltip.image.exist = false

      this.tooltip.image.size = imageDimensions
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
      params.set(
        "imageIsBig",
        imageDimensions.height > 400 && imageDimensions.width > 400
      );

      return `/linkedin-preview/linkedin-preview.html?${params}`;
    },
    onResize() {
      this.iframeHeight = parseInt(this.$refs.iframe.contentWindow.document.body.scrollHeight + 2) + "px";
    }
  }
};
</script>

<style>
.linkedin__preview {
  max-width: 521px;
  min-height: 350px;
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.linkedin__preview-caption {
  color: var(--label-color);
}
</style>
