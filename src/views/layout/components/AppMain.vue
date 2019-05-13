<template>
  <section v-if="iframUrl!==null">
    <iframe :src="iframUrl" :style="siteContentViewHeight" width="100%" height="100%" frameborder="0" scrolling="yes" />
  </section>
  <section v-else class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      documentClientHeight: 0
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    iframUrl() {
      if (this.$route.fullPath.startsWith('/iframe__')) {
        // encodeURIComponent()
        return decodeURIComponent(this.$route.fullPath.substring(9))
      }
      return null
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2
      // if (this.$route.meta.isTab) {
      //   height -= 40
      //   return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
      // }
      // return { minHeight: height + 'px' }
      return {
        // padding: '0 15px 15px',
        height: height + 'px'
      }
    }
  },
  mounted() {
    this.resetDocumentClientHeight()
  },
  methods: {
    // 调整高度
    resetDocumentClientHeight() {
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>

