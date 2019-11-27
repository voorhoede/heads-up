<template>
  <div>
    <switch-buttons :buttons="switchButtons" :value="mode" @change="toggle"></switch-buttons>
    <!-- <div class="switch-wrapper">
      <label class="switch">
        <span class="switch__text-left">Mobile</span>
        <input checked id="input-switch-mobile" name="toggle" type="radio" @input="toggle()" />
      </label>
      <label class="switch">
        <span class="switch__text-right">Desktop</span>
        <input checked id="input-switch-desktop" name="toggle" type="radio" @input="toggle()" />
      </label>
      <span class="control-indicator" :data-position="mobileView ? 'left' : 'right'"></span>
    </div>-->

    <panel-section title="Preview" v-if="mode === 'mobile'">
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
          <external-link href="https://m.facebook.com/">m.facebook.com</external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Preview" v-else>
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
          <external-link href="https://facebook.com/">facebook.com</external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <template v-if="og.title">
          <dt>og:title</dt>
          <dd>{{ og.title }}</dd>
        </template>
        <template v-if="og.description">
          <dt>og:description</dt>
          <dd>{{ og.description }}</dd>
        </template>
        <template v-if="og.image">
          <dt>og:image</dt>
          <dd>
            <external-link :href="absoluteUrl(og.image)">
              <img alt :src="absoluteUrl(og.image)" />
              <span>{{ og.image }}</span>
            </external-link>
            <p v-if="imageDimensions">({{ imageDimensions.width }} x {{ imageDimensions.height }}px)</p>
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
  SwitchButtons
} from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from "../lib/find-meta";

export default {
  components: { ExternalLink, PanelSection, PropertiesList, SwitchButtons },
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
          label: "Desktop very long text",
          value: "desktop"
        }
      ],
      mode: "mobile"
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
  created() {
    findImageDimensions(this.head, "og:image").then(imageDimensions => {
      this.imageDimensions = imageDimensions;
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
      console.log("TOGGLE");
      this.mode = newMode;
      //this.mobileView = index === 0;
    },
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
      params.set("imageSpecified", this.imageSpecified);
      params.set("description", this.og.description);
      if (this.og.image !== undefined) {
        params.set(
          "imageIsBig",
          (imageDimensions.height > 359 && imageDimensions.width > 359) ||
            (this.imageSpecified &&
              (imageDimensions.height === 0 || imageDimensions.width === 0))
        );
      }
      return `${
        this.mode === "desktop"
          ? `/facebook-preview/facebook-preview.html?${params}`
          : `/facebook-mobile-preview/facebook-mobile-preview.html?${params}`
      }`;
      // return `/facebook-${
      //   this.mode === "desktop" ? `` : `mobile-`
      // }preview/facebook-${
      //   this.mode === "desktop" ? `` : `mobile-`
      // }preview.html?${params}`;
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
  min-height: 350px;
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.facebook__preview-caption {
  color: var(--label-color);
}
</style>
