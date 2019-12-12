<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!hasOgImage">
        This page does not contain og:image meta data to create a preview.
      </p>

      <figure v-if="hasOgImage">
        <iframe
          ref="iframe"
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
        <template v-if="og.title">
          <dt>og:title</dt>
          <dd>{{ og.title }}</dd>
        </template>
        <template v-if="og.image">
          <dt>og:image</dt>
          <dd>
            <external-link :href="absoluteUrl(og.image)">
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
import { mapState } from "vuex";
import { ExternalLink, PanelSection, PropertiesList } from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
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
    hasOgImage() {
      return Boolean(this.og.image);
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
