<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!isValidCard">
        This page does not contain the required meta data to create a preview.
      </p>
      <p v-if="isValidCard && !isSupportedCard">
        Preview is not yet available for
        <code>{{ card }}</code> cards.
        <br>Card preview is currently supported for:
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="supportedCards.map(v => `<code>${v}</code>`).join(', ')" />.
      </p>
      <figure v-if="isValidCard && isSupportedCard">
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
          <external-link href="https://linkedin.com/">
            linkedin.com
          </external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dt>linkedin:card</dt>
        <dd>{{ linkedin.card }}</dd>
        <dt>linkedin:title</dt>
        <dd>{{ linkedin.title }}</dd>
        <dt>linkedin:description</dt>
        <dd>{{ linkedin.description }}</dd>
        <template v-if="linkedin.image">
          <dt>linkedin:image</dt>
          <dd>
            <external-link :href="absoluteUrl(linkedin.image)">
              <img
                alt
                :src="absoluteUrl(linkedin.image)"
              >
              <span>{{ linkedin.image }}</span>
            </external-link>
          </dd>
        </template>
        <template v-for="username in ['creator', 'site']">
          <dt
            v-if="linkedin[username]"
            :key="`${username}-key`"
          >
            linkedin:{{ username }}
          </dt>
          <dd
            v-if="linkedin[username]"
            :key="`${username}-value`"
          >
            <external-link
              :href="`https://linkedin.com/${linkedin[username].slice(1)}`"
            >
              {{ linkedin[username] }}
            </external-link>
          </dd>
        </template>

        <template v-if="og.type">
          <dt>og:type</dt>
          <dd>{{ og.type }}</dd>
        </template>
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
              <img
                alt
                :src="absoluteUrl(og.image)"
              >
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
          >
            About linkedin cards
          </external-link>
        </li>
        <li>
          <external-link
            href="https://developer.linkedin.com/en/docs/tweets/optimize-with-cards/overview/markup"
          >
            linkedin card markup
          </external-link>
        </li>
        <li>
          <external-link
            href="https://cards-dev.linkedin.com/validator"
          >
            linkedin card validator (requires linkedin login)
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>


<script>
import getTheme from "../lib/theme";
import { mapState } from "vuex";
import {
  ExternalLink,
  PanelSection,
  PropertiesList,
  ResourceList
} from "../components";
import { findMetaContent, findMetaProperty } from "../lib/find-meta";

const validCards = ["summary", "summary_large_image", "app", "player"];
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
    card() {
      /**
       * If an og:type, og:title and og:description exist in the markup
       * but linkedin:card is absent, then a summary card may be rendered.
       * @see https://developer.linkedin.com/en/docs/tweets/optimize-with-cards/overview/markup#overview-of-all-linkedin-card-tags
       */
      if (this.linkedin.card) {
        return this.linkedin.card;
      } else if (this.og.type && this.og.title && this.og.description) {
        return "summary";
      }
      return undefined;
    },
    supportedCards() {
      return supportedCards;
    },
    isValidCard() {
      return validCards.includes(this.card);
    },
    isSupportedCard() {
      return supportedCards.includes(this.card);
    },
    title() {
      return this.linkedin.title || this.og.title || this.head.title || "";
    },
    description() {
      return (
        this.linkedin.description ||
        this.og.description ||
        this.metaValue("description") ||
        ""
      );
    },
    image() {
      return this.absoluteUrl(this.linkedin.image || this.og.image);
    },
    og() {
      return {
        type: this.propertyValue("og:type"),
        title: this.propertyValue("og:title"),
        description: this.propertyValue("og:description"),
        image: this.propertyValue("og:image")
      };
    },
    linkedin() {
      return {
        card: this.metaValue("linkedin:card"),
        title: this.metaValue("linkedin:title"),
        description: this.metaValue("linkedin:description"),
        image: this.metaValue("linkedin:image"),
        site: this.metaValue("linkedin:site"),
        creator: this.metaValue("linkedin:creator")
      };
    },
    linkedinUrl() {
      const params = new URLSearchParams();
      params.set("card", this.linkedin.card);
      params.set("title", this.title);
      params.set("description", this.description);
      params.set("image", this.image);
      params.set("url", this.head.url);
      params.set("theme", getTheme() !== "default" && "dark");
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
