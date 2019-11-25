<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!isValidCard">
        This page does not contain og:image meta data to create a preview.
      </p>

      <figure v-if="isValidCard ">
        <iframe
          ref="iframe"
          :src="linkedin.linkedinUrl"
          :height="iframeHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
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
        <template v-if="linkedin.title">
          <dt>og:title</dt>
          <dd>{{ linkedin.title }}</dd>
        </template>
        <template v-if="linkedin.image">
          <dt>og:image</dt>
          <dd>
            <external-link :href="absoluteUrl(linkedin.image)">
              <img
                alt
                :src="absoluteUrl(linkedin.image)"
              >
              <span>{{ linkedin.image }}</span>
            </external-link>
            <p
              v-if="linkedin.imageDimensions"
            >
              w:{{ linkedin.imageDimensions.imgWidth }}px, h:{{ linkedin.imageDimensions.imgHeight }}px
            </p>
            <p
              v-if="linkedin.imageDimensions && !linkedin.imageDimensions.correctImgUrl"
            >
              og.image can't be loaded
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
      linkedin: {}
    };
  },
  computed: {
    ...mapState(["head"]),
    isValidCard() {
      return this.og.image !== undefined ? true : false;
    },

    og() {
      return {
        title: this.propertyValue("og:title") || this.head.title || "Weblink",
        image: this.absoluteUrl(this.propertyValue("og:image"))
      };
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  created() {
    this.imageDimensions("og:image").then(imageDimensions => {
      this.linkedin = {
        imageDimensions: imageDimensions,
        title: this.propertyValue("og:title") || this.head.title || "Weblink",
        image: this.absoluteUrl(this.propertyValue("og:image")),
        linkedinUrl: this.linkedinUrl(imageDimensions)
      };
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
    onResize() {
      this.iframeHeight =
        parseInt(
          this.$refs.iframe.contentWindow.document.body.scrollHeight + 2
        ) + "px";
    },
    imageDimensions(metaName) {
      return findImageDimensions(this.head, metaName).then(imageDimensions => {
        return imageDimensions;
      });
    },
    linkedinUrl(imageDimensions) {
      const params = new URLSearchParams();
      params.set("title", this.og.title);
      params.set("image", this.og.image);
      params.set("url", this.head.url);
      params.set(
        "imageIsBig",
        imageDimensions.imgHeight > 400 && imageDimensions.imgWidth > 400
          ? true
          : false
      );
      return `/linkedin-preview/linkedin-preview.html?${params}`;
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
