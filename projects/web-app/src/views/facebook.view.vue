<template>
  <div>
    <tab-selecter
      v-model="openTab"
      :tabs="TABS"
    />

    <panel-section
      v-if="openTab === 'mobile'"
      title="Preview"
    >
      This is specific for mobile
    </panel-section>
    <panel-section
      v-if="openTab === 'desktop'"
      title="Preview"
    >
        This is specific for desktop
    </panel-section>

    <panel-section title="Properties">
      This is the Facebook data
    </panel-section>
  </div>
</template>

<script>
import { ref } from 'vue';
import PanelSection from '@shared/components/panel-section';
import TabSelecter from '@shared/components/tab-selecter';

const TABS = [
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'Desktop',
    value: 'desktop',
  },
];

export default {
  setup() {
    const openTab = ref(TABS[0].value);

    return {
      TABS,
      openTab,
    };
  },

  components: {
    PanelSection,
    TabSelecter,
  },
};
</script>
