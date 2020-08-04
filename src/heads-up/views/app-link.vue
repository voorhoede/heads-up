<template>
  <div>
    <panel-section title="Rel">
      <collapsible-link-list :data="linkListData" />
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://htmlhead.dev/">
            Guide to HTML5 <code>&lt;head&gt;</code> elements
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { CollapsibleLinkList, ExternalLink, PanelSection, ResourceList } from '../components'

  export default {
    components: { CollapsibleLinkList, ExternalLink, PanelSection, ResourceList },
    computed: {
      ...mapState(['head']),
      linkListData() {
        return this.head.link
      },
    },
  }
</script>
