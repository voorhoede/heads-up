<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!isValidCard">This page does not contain og:image meta data to create a preview.</p>

      <figure v-if="isValidCard ">
        <iframe
          ref="iframe"
          :src="linkedinUrl"
          :height="iframeHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          class="linkedin__preview"
          @load="onResize"
        />
        <figcaption class="linkedin__preview-caption">
          Preview based on
          <external-link href="https://linkedin.com/">linkedin.com</external-link>.
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
              <img alt :src="absoluteUrl(og.image)" />
              <span>{{ og.image }}</span>
            </external-link>
          </dd>
        </template>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link
            href="https://developer.linkedin.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html"
          >About linkedin cards</external-link>
        </li>
        <li>
          <external-link
            href="https://developer.linkedin.com/en/docs/tweets/optimize-with-cards/overview/markup"
          >linkedin card markup</external-link>
        </li>
        <li>
          <external-link
            href="https://cards-dev.linkedin.com/validator"
          >linkedin card validator (requires linkedin login)</external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>


<script>
import { mapState } from "vuex";
import {
  ExternalLink,
  PanelSection,
  PropertiesList,
  ResourceList
} from "../components";
import { findMetaContent, findMetaProperty } from "../lib/find-meta";

// const validCards = ["summary", "summary_large_image", "app", "player"];
export const supportedCards = ["summary", "summary_large_image"];

export default {
  components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
  data() {
    return {
      iframeHeight: "auto"
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
    },

    linkedinUrl() {
      const params = new URLSearchParams();
      params.set("title", this.og.title);
      params.set("image", this.og.image);
      params.set("url", this.head.url);
      return `/linkedin-preview/linkedin-preview.html?${params}`;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
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
    }
  }
};
</script>

<style>
.linkedin__preview {
  max-width: 521px;
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.linkedin__preview-caption {
  color: var(--label-color);
}
</style>
