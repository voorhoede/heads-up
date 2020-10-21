<template>
  <v-popover
    v-if="!IS_WEB_APP"
    trigger="hover"
    :placement="placement"
    :delay="{ show: 500 }"
    offset="10"
    :popover-inner-class="[themeClass, 'tooltip-inner']"
    :popover-arrow-class="[themeClass, 'tooltip-arrow']"
  >
    <slot />

    <template #[slotname]>
      <slot name="info" />
      <slot name="link" />
    </template>
  </v-popover>
  <div v-else>
    <slot />
  </div>
</template>

<script>
import getTheme from '../lib/theme';
// @TEMPORARY :: Turn off tooltips until both apps are in Vue3
// and we can use the updated v-tooltip package
const IS_WEB_APP = process.env.VUE_APP_IS_WEB_APP === 'true';

export default {
  props: {
    placement: {
      type: String,
      default: 'top-end',
    },
  },
  data: () => ({
    slotname: 'popover',
    IS_WEB_APP,
  }),
  computed: {
    themeClass() {
      /**
       * class '-theme-with-dark-background' is taken from original dev tools repo
       * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
       */
      return getTheme() === 'dark' ? '-theme-with-dark-background' : '';
    },
  },
};
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: #ededed;
  color: hsl(0, 0%, 20%);
  border-radius: 2px;
  padding: 5px 10px 4px;
  z-index: 1;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  position: absolute;
  border: 5px solid #ededed;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.2);
  left: calc(50% - 5px);
  transform: rotate(45deg);
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  bottom: -5px;
  margin: 0 5px;
}

.tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 0;
  height: 100%;
  width: 100%;
  transform: scaleY(2);
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  top: -5px;
  margin: 0 5px;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  left: -5px;
  margin: 5px 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  right: -5px;
  margin: 5px 0;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.2);
  max-width: calc(75vw - var(--sidebar-width));
}

.-theme-with-dark-background.tooltip-inner {
  background: #3c3c3c;
  color: #dadada;
}

.-theme-with-dark-background.tooltip-arrow {
  border: 5px solid #3c3c3c;
}
</style>
