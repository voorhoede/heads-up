<template>
  <div>
    <panel-section title="Preview">
      <p
        v-if="!hasDescription"
      >This page does not contain an Open Graph description to create a preview.</p>
      <figure v-if="hasDescription && whatsapp">
        <iframe
          ref="iframe"
          title="whatsapp preview"
          :src="whatsapp.whatsappUrl"
          :height="iframeHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          class="whatsapp__preview"
          @load="onResize"
        />
        <figcaption class="whatsapp__preview-caption">
          Preview based on
          <external-link href="https://web.whatsapp.com/">web.whatsapp.com</external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dl>
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
              <p
                v-if="whatsapp.imageDimensions"
              >w:{{ whatsapp.imageDimensions.imgWidth }}px, h:{{ whatsapp.imageDimensions.imgHeight }}px</p>
              <p
                v-if="whatsapp.imageDimensions && whatsapp.imageDimensions.imgHeight < 100 && whatsapp.imageDimensions.imgWidth >= 100 "
              >The image height is too small. You need at least 100px instead of {{ whatsapp.imageDimensions.imgHeight }}px</p>
              <p
                v-if="whatsapp.imageDimensions && whatsapp.imageDimensions.imgWidth < 100 && whatsapp.imageDimensions.imgHeight >= 100"
              >The image width is too small. You need at least 100px instead of {{ whatsapp.imageDimensions.imgWidth }}px</p>
              <p
                v-if="whatsapp.imageDimensions && whatsapp.imageDimensions.imgWidth < 100 && whatsapp.imageDimensions.imgHeight < 100"
              >The image width and height is too small. You need at least 100px of width instead of {{ whatsapp.imageDimensions.imgWidth }}px and 100px of height instead of {{ whatsapp.imageDimensions.imgHeight }}px</p>
            </dd>
          </template>
          <template v-if="og.url">
            <dt>og:url</dt>
            <dd>{{ og.url }}</dd>
          </template>
        </dl>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <ul>
          <li>
            <external-link
              href="https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing"
            >2019 unfurl standards</external-link>
          </li>
        </ul>
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
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from "../lib/find-meta";

const ogDescription = "og:description";

export default {
  components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
  data() {
    return {
      iframeHeight: "auto",
      whatsapp: {}
    };
  },
  computed: {
    ...mapState(["head"]),
    hasDescription() {
      const whatsappDescription = this.propertyValue(ogDescription);
      if (whatsappDescription !== null && whatsappDescription.length > 0) {
        return true;
      }
      return false;
    },
    title() {
      return this.head.title || "";
    },
    description() {
      return this.og.description;
    },
    image() {
      if (this.og.image !== undefined) {
        return this.absoluteUrl(this.og.image);
      }
      return this.og.image;
    },
    url() {
      return this.head.url;
    },
    og() {
      return {
        title: this.propertyValue("og:title"),
        description: this.propertyValue(ogDescription),
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
    this.imageDimensions("og:image").then(imageDimensions => {
      this.whatsapp = {
        imageDimensions,
        title: this.propertyValue("og:title"),
        description: this.propertyValue(ogDescription),
        type: this.propertyValue("og:type"),
        image: this.propertyValue("og:image"),
        url: this.propertyValue("og:url"),
        whatsappUrl: this.getWhatsappUrl(imageDimensions)
      };
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
    metaValue(metaName) {
      return findMetaContent(this.head, metaName);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName);
    },
    getWhatsappUrl(imageDimensions) {
      const params = new URLSearchParams();
      params.set("title", this.og.title || this.title);
      params.set("description", this.og.description);
      params.set("image", this.image);
      params.set(
        "imageIsBigEnough",
        imageDimensions.imgHeight >= 100 && imageDimensions.imgWidth >= 100
          ? true
          : false
      );
      params.set("url", this.head.url);
      return `/whatsapp-preview/whatsapp-preview.html?${params}`;
    },
    imageDimensions(metaName) {
      return findImageDimensions(this.head, metaName).then(imageDimensions => {
        return imageDimensions;
      });
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

.whatsapp__preview-caption {
  color: var(--label-color);
}
</style>
