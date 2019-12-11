<template>
  <div>
    <panel-section title="Preview">
      <p
        v-if="!hasDescription"
      >
        This page does not contain an Open Graph description to create a preview.
      </p>
      <figure v-if="hasDescription && previewUrl">
        <iframe
          ref="iframe"
          title="whatsapp preview"
          :src="previewUrl"
          :height="iframeHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          class="whatsapp__preview"
          @load="onResize"
        />
        <figcaption class="whatsapp__preview-caption">
          Preview based on
          <external-link href="https://web.whatsapp.com/">
            web.whatsapp.com
          </external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dl>
          <template>
            <dt class="title">
              <app-tooltip      
                class="properties-item__tooltip"
                placement="bottom-start"
              >
                og:title
                <template v-slot:info>
                  <property-data 
                    type="og:title" 
                    :exist="tooltip.title.exist" 
                    :tag="tooltip.title.tag" 
                    :value="tooltip.title.content" 
                  />
                </template>

                <template v-slot:link>
                  <!-- eslint-disable-next-line vue/singleline-html-element-content-newline, vue/max-attributes-per-line -->
                  <external-link class="properties-item__link" :href="'/'">Learn more</external-link>
                </template>         
              </app-tooltip>
            </dt>   
            <dd>
              {{ title }}
            </dd>
          </template>
          <template>
            <dt>
              <app-tooltip      
                class="properties-item__tooltip"
                placement="bottom-start"
              >
                og:description
                <template v-slot:info>
                  <property-data 
                    type="og:description" 
                    :exist="tooltip.description.exist" 
                    :required="tooltip.description.required" 
                    :tag="tooltip.description.tag" 
                    :value="tooltip.description.value" 
                    :valuelength="tooltip.description.valuelength"
                  />
                </template>

                <template v-slot:link>
                  <!-- eslint-disable-next-line vue/singleline-html-element-content-newline, vue/max-attributes-per-line -->
                  <external-link class="properties-item__link" :href="'/'">Learn more</external-link>
                </template>         
              </app-tooltip>
            </dt>
            <dd>
              {{ description }}
            </dd>
          </template>
          <template>
            <dt>
              <app-tooltip      
                v-if="imageDimensions"
                class="properties-item__tooltip"
                placement="bottom-start"
              >
                og:image
                <template v-slot:info>
                  <!-- eslint-disable-next-line vue/no-v-html, vue/max-attributes-per-line -->
                  <property-data 
                    type="og:image"
                    :exist="tooltip.image.exist" 
                    :hasvariation="tooltip.image.hasVariation"
                    :requiredsizes="tooltip.image.requiredSizes"
                    :size="tooltip.image.size"
                    :tag="tooltip.image.tag" 
                  />
                </template>
                <template v-slot:link>
                  <!-- eslint-disable-next-line vue/singleline-html-element-content-newline, vue/max-attributes-per-line -->
                  <external-link class="properties-item__link" :href="'/'">Learn more</external-link>
                </template>         
              </app-tooltip>
            </dt>
            <dd v-if="og.image">
              <external-link :href="absoluteUrl(og.image)">
                <img
                  alt
                  :src="absoluteUrl(og.image)"
                >

                <span>{{ og.image }}</span>
              </external-link>
              <p
                v-if="imageDimensions"
              >
                ({{ imageDimensions.width }} x {{ imageDimensions.height }}px)
              </p>
            </dd>
          </template>
        </dl>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <ul>
          <li>
            <external-link
              href="https://stackoverflow.com/a/43154489"
            >
              2019 WhatsApp sharing standards (on StackOverflow)
            </external-link>
          </li>
          <li>
            <external-link
              href="https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing"
            >
              Unfurl mechanism used by WhatsApp for sharing
            </external-link>
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
  ResourceList,
  AppTooltip,
  PropertyData} from "../components";
import {
  findMetaContent,
  findMetaProperty,
  findImageDimensions
} from "../lib/find-meta";

const description = "og:description"

export default {
  components: { ExternalLink, PanelSection, PropertiesList, ResourceList, AppTooltip, PropertyData },
  data() {
    return {
      iframeHeight: "auto",
      imageDimensions: { width: undefined, height: undefined },
      previewUrl: "",
      tooltip:{
        title:{
          exist:"",
          required:false, 
          tag: "", 
          value: "", 
        },

        description:{
          exist:"", 
          required: true, 
          tag: description, 
          value: "", 
          valuelength:{
            max: 300, 
            tooLong:""
          },  
        },

        image:{
          exist:"", 
          hasvariation:false, 
          required:false, 
          requiredsizes:{
            minimim:{
              width:100, 
              height:100
            }, 
            variation:{
              width:"", 
              height:""
            }
          }, 
          size:{
            width:"", 
            height:""
          },  
          tag: "og:image", 
        }
      }
    };
  },
  computed: {
    ...mapState(["head"]),
    hasDescription() {
      const whatsappDescription = this.propertyValue(description);
      if (whatsappDescription !== null && whatsappDescription.length > 0) {
        return true;
      }
      return false;
    },
    title() {
      // if(this.propertyValue("og:title") !== null){
      //   this.tooltip.title.tag = "og:title"
      //   this.tooltip.title.value = this.propertyValue("og:title")
      //   this.tooltip.title.exist = true
      // }      
      // else if(this.head.title !== null) 
      // {
      //   this.tooltip.title.tag = "<title>"
      //   this.tooltip.title.value = this.head.title
      //   this.tooltip.title.exist = false
      // }
      // else{
      //   this.tooltip.title.tag = false
      //   this.tooltip.title.value = false
      //   this.tooltip.title.exist = false
      // }

      return this.propertyValue("og:title")||this.head.title || "";
    },
    description() {
      // if(this.propertyValue(description) !== null){
      //   this.tooltip.description.value = this.propertyValue(description)
      //   this.tooltip.description.exist = true
      //   this.tooltip.description.valueLength.tooLong = this.propertyValue(description).length > 300
      // }      
      // else{
      //   this.tooltip.description.exist = false
      // }
      return this.og.description;
    },
    image() {
      if (this.og.image !== undefined) {
        return this.absoluteUrl(this.og.image);
      }
      else{
      return this.og.image;
      }
    },
    url() {
      return this.head.url;
    },
    og() {
      return {
        title: this.propertyValue("og:title"),
        description: this.propertyValue(description),
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
    findImageDimensions(this.head, "og:image").then(imageDimensions => {
      
      this.imageDimensions = imageDimensions;
      this.setTooltipData(imageDimensions)

      this.previewUrl = this.getPreviewUrl({ imageDimensions });
      // const { width, height } = imageDimensions;

      
      // if (width >= 100 && height < 100) {
      //   console.log(
      //     `The image height is too small. You need at least 100px instead of ${height}px`
      //   );
      // }
      // if (width < 100 && height >= 100) {
      //   console.log(
      //     `The image width is too small. You need at least 100px instead of ${width}px`
      //   );
      // }
      // if (width < 100 && height < 100) {
      //   console.log(
      //     `The image width and height are too small. You need at least 100px of width instead of ${width}px and 100px of height instead of ${height}px`
      //   );
      // }
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
    setTooltipData(imageDimensions){
      if(this.propertyValue("og:title") !== null){
        this.tooltip.title.tag = "og:title"
        this.tooltip.title.value = this.propertyValue("og:title")
        this.tooltip.title.exist = true
      }      
      else if(this.head.title !== null) 
      {
        this.tooltip.title.tag = "<title>"
        this.tooltip.title.value = this.head.title
        this.tooltip.title.exist = false
      }
      else{
        this.tooltip.title.tag = false
        this.tooltip.title.value = false
        this.tooltip.title.exist = false
      }

      if(this.propertyValue(description) !== null){
        this.tooltip.description.value = this.propertyValue(description)
        this.tooltip.description.exist = true
        this.tooltip.description.valuelength.tooLong = this.propertyValue(description).length > 300
      }      
      else{
        this.tooltip.description.exist = false
      }
      this.og.image !== undefined? this.tooltip.image.exist=true: this.tooltip.image.exist=false
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
      params.set("title", this.og.title || this.title);
      params.set("description", this.description);
      if (imageDimensions.height >= 100 && imageDimensions.width >= 100) {
        params.set("image", this.image);
      }
      params.set("url", this.head.url);
      return `/whatsapp-preview/whatsapp-preview.html?${params}`;
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

.properties-item__tooltip{
  display: inline-block;
}

@media (min-width: 500px) {
  .properties-item {
    display: flex;
    align-items: flex-start;
  }
  .properties-item__term {
    display: flex;
    justify-content: flex-end;
    width: var(--term-width-small);
    padding-right: 5px;
  }
  .properties-item__term * + * {
    margin-left: 0.15rem;
  }
  }
</style>
