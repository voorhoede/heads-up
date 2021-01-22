<template>
  <v-popover
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
</template>

<script>
import getTheme from '../lib/theme';
import VPopover from './v-popover/components/Popover';

export default {
  props: {
    placement: {
      type: String,
      default: 'top-end',
    },
  },
  data: () => ({
    slotname: 'popover',
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
  components: {
    VPopover,
  },
};
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
  max-width: calc(75vw - var(--sidebar-width));
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
}

.tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(2);
}

.tooltip .tooltip-inner {
  z-index: 1;
  padding: 6px 8px 5px;
  border-radius: 3px;
}

.tooltip .tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  transform: rotate(45deg);
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  bottom: -5px;
  margin: 0 5px;
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
</style>
