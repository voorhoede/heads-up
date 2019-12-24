<template>
  <div>
    <switch-buttons
      :buttons="switchButtons"
      :value="mode"
      @change="toggle"
    />

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
        <template v-if="og.title">
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
            </app-tooltip>
          </dt>
          <dd>{{ og.title }}</dd>
        </template>
        <template v-if="og.description">
          <dt>
            <p>og:description</p>
            <app-tooltip
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <InfoIcon class="properties-item__icon" />
            </app-tooltip>
          </dt>
          <dd>{{ og.description }}</dd>
        </template>
        <template v-if="og.image">
          <dt>
            <p>og:image</p>
            <app-tooltip
              class="properties-item__tooltip"
              placement="bottom-start"
            >
              <InfoIcon class="properties-item__icon" />
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
        </template>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  ExternalLink,
  PanelSection,
  PropertiesList,
  SwitchButtons,
  AppTooltip,
  InfoIcon
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
    SwitchButtons,
    AppTooltip,
    InfoIcon
  },
  data() {
    return {
      iframeHeight: "auto",
      imageDimensions: { width: 0, height: 0 },
      previewUrl: "",
      imageSpecified: true,
      switchButtons: [
        {
          label: "Mobile",
          value: "mobile"
        },
        {
          label: "Desktop",
          value: "desktop"
        }
      ],
      mode: "mobile",
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
            max: 250,
            tooLong: null
          }
        },

        image: {
          exist: false,
          hasVariation: true,
          required: false,
          requiredSizes: {
            minimum: {
              width: 100,
              height: 100
            },
            variation: {
              width: 415,
              height: 415
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
    og() {
      return {
        title: this.propertyValue("og:title"),
        image: this.absoluteUrl(this.propertyValue("og:image")),
        description: this.propertyValue("og:description")
      };
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  hasOgData() {
    return (
      this.propertyValue("og:title") ||
      this.absoluteUrl(this.propertyValue("og:image")) ||
      this.propertyValue("og:description")
    );
  },
  created() {
    findImageDimensions(this.head, "og:image").then(imageDimensions => {
      this.imageDimensions = imageDimensions;
      this.setTooltipData(imageDimensions);
      console.log(this);
      this.previewUrl = this.getPreviewUrl({ imageDimensions });
      if (imageDimensions.height === 0 || imageDimensions.width === 0) {
        console.log(`og.image can't be loaded`);
      }
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    toggle(newMode) {
      this.mode = newMode;
      this.previewUrl = this.getPreviewUrl({
        imageDimensions: this.imageDimensions
      });
    },
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
          this.propertyValue("og:description").length > 250;
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
      params.set("title", this.og.title || this.head.title);
      params.set("url", this.head.url);
      params.set("image", this.og.image);
      params.set("imageSpecified", this.imageSpecified);
      params.set("description", this.og.description);
      if (this.og.image !== undefined) {
        params.set(
          "mobileImgIsBig",
          (imageDimensions.height > 359 && imageDimensions.width > 359) ||
            (this.imageSpecified &&
              (imageDimensions.height === 0 || imageDimensions.width === 0))
        );
      }
      params.set(
        "desktopImgIsBig",
        imageDimensions.height >= 415 && imageDimensions.width >= 415
      );
      return `${
        this.mode === "desktop"
          ? `/facebook-desktop-preview/facebook-desktop-preview.html?${params}`
          : `/facebook-mobile-preview/facebook-mobile-preview.html?${params}`
      }`;
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
</style>
