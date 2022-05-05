<template>
  <div />
</template>

<script>
export default {
  name: 'MixinsMain',
  components: {},
  props: {},
  data() {
    return {
      mixinData: ''
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight },
      set(val) { this.$store.commit('app/updateDocumentClientHeight', val) }
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2 - 90
      if (this.$route.meta.isTab) {
        height -= 40
      }
      return { minHeight: height + 'px' }
    }
  },
  mounted() {},
  methods: {
    mixinFunction() {
      return '我是mixins里面的公共方法'
    }
  }
}
</script>
