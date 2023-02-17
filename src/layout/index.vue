<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div :class="{hasTagsView:needTagsView}" :style="{'margin-left': 0}" class="main-container">
      <div :style="{'width': 'calc(100%)'}" :class="{'fixed-header':fixedHeader}">
        <navbar @childrenRoutes="getroutes" />
        <div v-permit="'project_list_btn_log'" class="async-log" @click="openLog">
          <svg-icon icon-class="laodong" />
          <span>对接日志</span>
        </div>
        <!-- <div class="breadcrumb-wrap">
          <div v-if="childrenRoutes.length" class="sys-title">智慧工地宝管理平台</div>
          <breadcrumb class="breadcrumb-container" />
        </div> -->
        <!-- <tags-view v-if="needTagsView" /> -->

      </div>
      <app-main ref="appMain" :children-routes="childrenRoutes" />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
    <async-dialog ref="asyncDialog" />
  </div>
</template>

<script>
// import RightPanel from '@/components/RightPanel'
// import Breadcrumb from '@/components/Breadcrumb'
import { AppMain, Navbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
// import { AsyncDialog } from '../views/project/list/list-async-log'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    // AsyncDialog+
    AsyncDialog: () => import('../views/project/list/list-async-log')
    // Breadcrumb
    // RightPanel,
    // Settings,
    // TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      // flag: sessionStorage.getItem('flag'),
      // current: { content: AsyncDialog, name: 'asyncDialog' },
      childrenRoutes: []
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.flterRoutes()
  },
  methods: {
    async flterRoutes() {
      const routes = this.$router.getmenuList().filter(item => {
        return !item.hidden
      })
      await this.$store.dispatch('user/setMenu', routes || [])
    },
    getroutes(childrenRoutes) {
      this.childrenRoutes = childrenRoutes
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    openLog() {
      this.$nextTick(() => {
        this.$refs.asyncDialog.init({})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }

    .async-log {
      display: inline-block;
      position: absolute;
      top: 15px;
      right: 360px;
      color: yellowgreen;
      font-weight: 700;
      font-size: 17px;
      cursor: pointer;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .breadcrumb-wrap {
    background: #ebeef0;
    height: 30px;
    padding-left: 210px;
    .sys-title {
      display: inline-block;
      vertical-align: top;
      height: 46px;
      line-height: 46px;
      color: #fff;
      font-size: 17px;
      width: 210px;
      text-align: center;
      background: #3c75c2;
      border-top: 1px solid #346fbe;
      border-bottom: 1px solid #346fbe;
    }
    .breadcrumb-container {
      line-height: 34px;
      margin-left: 20px;
      display: inline-block;
    }
  }
</style>
