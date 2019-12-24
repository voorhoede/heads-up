<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain og:image meta data to create a preview.
      </p>

      <figure v-if="hasRequiredData">
        <iframe
          ref="iframe"
          :src="previewUrl"
          :height="iframeHeight"
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
        <template v-if="og.title">
          <dt>og:title</dt>
          <dd>{{ og.title }}</dd>
        </template>
        <template v-if="og.image">
          <dt>og:image</dt>
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
        <template v-if="og.description">
          <dt>og:description</dt>
          <dd>{{ og.description }}</dd>
        </template>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ExternalLink, PanelSection, PropertiesList } from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions,
  findFavicons,
  findAdditionSlackData
} from "../lib/find-meta";

export default {
  components: { ExternalLink, PanelSection, PropertiesList },
  data() {
    return {
      iframeHeight: "auto",
      imageDimensions: { width: undefined, height: undefined },
      previewUrl: ""
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
</style>
