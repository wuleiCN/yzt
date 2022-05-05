<template>
  <section class="app-main">
    <!-- fade-transform -->
    <el-container>
      <el-aside class="app-main-aside" :width="childrenRoutes.length >= 2 && collapse ? '356px' : collapse ? '146px' : ''" style="position: fixed;height: 100%;">
        <div class="subbar-router-wrap">
          <div v-if="collapse" :style="{ 'margin': '-10px 0 20px;'}" class="side-bar">
            <el-menu
              background-color="#3c75c2"
              active-text-color="#fff"
              text-color="#fff"
              :default-active="defaultPath"
              :router="true"
              mode="vertical"
              @select="handleSelect"
            >
              <el-menu-item v-for="(route) in menu" :key="route.path" :index="route.path">
                <svg-icon :icon-class="route.meta.icon" />
                <span slot="title">{{ route.meta.title }}</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div v-if="childrenRoutes.length >= 2 && collapse" :style="{ 'margin': '-10px 0 20px;'}" class="sub-side-bar">
            <el-menu
              background-color="#fff"
              active-text-color="#000"
              text-color="#909399"
              :default-active="fullPath"
              :router="true"
              mode="vertical"
              @select="handleSubSelect"
            >
              <template v-for="(route) in childrenRoutes">
                <el-menu-item v-if="!route.children || (route.children && route.children.length === 0)" :key="route.path" :index="route.path">
                  <svg-icon :icon-class="route.meta.icon" />
                  <span slot="title">{{ route.meta.title }}</span>
                </el-menu-item>
                <el-submenu v-else :key="route.path" :index="route.path">
                  <template slot="title">
                    <!-- <svg-icon :icon-class="route.meta.icon" /> -->
                    <span slot="title">{{ route.meta.title }}</span>
                  </template>
                  <el-menu-item v-for="(ele) in route.children" :key="ele.path" :index="ele.path">
                    <svg-icon :icon-class="ele.meta.icon" />
                    <span slot="title">{{ ele.meta.title }}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </div>
        </div>

      </el-aside>
      <el-main :style="childrenRoutes.length >= 2 && collapse ? 'margin-left: 356px;': collapse ? 'margin-left: 146px;' : ''">
        <span class="collapse" @click="toggleCollapse"><i :class="!collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" /></span>
        <breadcrumb class="breadcrumb-container" />
        <el-card :body-style="siteContentViewHeight">
          <keep-alive :include="cachedViews">
            <router-view :key="key" />
          </keep-alive>
        </el-card>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data() {
    return {
      fullPath: '',
      defaultPath: ''
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight },
      set(val) { this.$store.commit('app/updateDocumentClientHeight', val) }
    },
    menu: {
      get() {
        return this.$store.state.user.menu.filter(item => {
          return (item.children.length > 1 || !item.isTop) && item.path !== '/statistic-dashboard'
        })
      }
    },
    childrenRoutes() {
      return this.$store.state.permission.childrenRoutes || []
    },
    collapse() {
      return this.$store.state.app.collapse
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2 - 30
      if (this.$route.meta.isTab) {
        height -= 40
      }
      return { minHeight: height + 'px' }
    },
    key() {
      return this.$route.path
    },
    sysType() {
      return this.$route.meta.sysType
    }
  },
  watch: {
    $route() {
      this.defaultPath = '/' + this.$route.fullPath.split('/')[1]
    }
  },
  mounted() {
    this.resetDocumentClientHeight()
    this.fullPath = this.$route.fullPath
    this.defaultPath = '/' + this.$route.fullPath.split('/')[1]
  },
  methods: {
    toggleCollapse(collapse) {
      this.$store.dispatch('app/toggleSideBar', !this.collapse)
    },
    handleSelect() {
      setTimeout(() => {
        this.fullPath = this.childrenRoutes[0].path
      }, 0)
    },
    handleSubSelect(path) {
      setTimeout(() => {
        this.fullPath = this.$route.path
      }, 0)
    },
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #eef1f3;
  .el-card {
    position: relative;
    // margin: 20px 20px 20px 20px;
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 50px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.app-main {
  // padding-top: 20px !important;
  .el-main {
    padding-top: 5px;
    .collapse {
      cursor: pointer;
      display: inline-block;
      margin-top:6px;
      vertical-align: top;
      color: #DA0051 !important;
      font-size: 20px !important;
    }
  }
  .app-main-aside {
    background:#3c75c2;
    li svg {
      vertical-align: middle;
    }
    .subbar-router-wrap {
      display: flex;
      .side-bar {
        flex: 1;
        .el-menu {
          border-right: none;
        }
        .is-active {
          background: #2f6aba !important;
        }
      }
      .sub-side-bar {
        flex: 1;
        height: 100vh;
        .el-menu {
          width: 210px;
          border-right: none;
          height: 100%;
        }
        .is-active {
          color: #1890ff !important;
          background-color: #e8f4ff !important;
        }
      }
    }
  }
  .breadcrumb-container {
    // background: pink;
    height: 30px;
    line-height: 30px;

    .el-breadcrumb {
      margin-left: 0px !important;
    }
    .el-breadcrumb__item {
      height: 30px;
      line-height: 32px;
    }

  }
}
</style>
