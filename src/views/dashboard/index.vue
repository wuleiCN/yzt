<template>
  <div class="test">
    <el-select v-model="input" clearable filterable class="search-input" placeholder="请选择或者输入项目名称" @change="changeHandle">
      <el-option
        v-for="item in markers"
        :key="item.id"
        :label="item.projectName"
        :value="item.id"
      />
    </el-select>
    <div class="toggle" @click="handleClick">
      <span v-if="isShow"><i class="el-icon-s-unfold" />收起</span>
      <span v-else><i class="el-icon-s-fold" />展开</span>
    </div>
    <div v-if="isShow" class="right-modal">

      <transition name="moveR">
        <div v-if="isShow" class="main">
          <div class="centent">
            <div style="height: 20px">
              <el-cascader
                placeholder="深圳市"
                :value="city"
                style="width:30%;float:left"
                :props="props"
                :show-all-levels="false"
                @change="handleChange"
                @clear="handleClear"
              />
            </div>
            <div class="center">
              <el-row>
                <el-col :span="9">
                  <div style="margin-bottom: 10px">今日考勤率</div>
                  <img style="width:150px;height:150px" src="../../assets/rote.gif" alt="">
                  <span class="todayAttendRate">{{ statistics.todayAttendRate }}</span>
                  <!-- <dv-decoration-9 style="width:150px;height:150px;margin: 0 auto"><div style="font-size: 30px;">{{ statistics.todayAttendRate }}</div></dv-decoration-9> -->
                </el-col>
                <el-col style="margin-top: 60px" :span="5">
                  <div style="margin-bottom: 10px">在建分包</div>
                  <div class="item-num">{{ statistics.constractionCount }}</div>
                </el-col>
                <el-col style="margin-top: 60px" :span="5">
                  <div style="margin-bottom: 10px">在建人数</div>
                  <div class="item-num">{{ statistics.workersCount }}</div>
                </el-col>
                <el-col style="margin-top: 60px" :span="5">
                  <div style="margin-bottom: 10px">在场人数</div>
                  <div class="item-num">{{ statistics.inWorkersCount }}</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pro-list">
            <div class="list-title" style="font-weight: 600"><svg-icon class-name="size-icon" icon-class="list" /> 项目列表</div>
            <ul class="list-style">
              <dv-scroll-board v-if="config.data && config.data.length" :config="config" style="width:100%;height:300px;" />
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div id="container" class="amap-class" :style="siteContentViewHeight" />
  </div>
</template>
<script>
import MapLoader from '@/utils/AMap.js'
import { parseTime } from '@/utils'
import { getTree } from '@/api/sys/area'
import { getList, detail, getStatistics } from '@/api/home.js'
export default {
  name: 'Test',
  data() {
    return {
      input: '',
      city: [],
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      isShow: true,
      markers: [],
      statistics: {},
      config: {
        rowNum: 9,
        oddRowBGC: 'rgba(255,255,255,0.3)',
        evenRowBGC: 'rgba(255,255,255,0.3)',
        data: []
      },
      map: null
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight },
      set(val) { this.$store.commit('app/updateDocumentClientHeight', val) }
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2 - 70
      if (this.$route.meta.isTab) {
        height -= 40
      }
      return { minHeight: height + 'px' }
    }
  },
  async created() {
    const data = (await this.getMarkerList()).map(item => [item.projectName])
    this.$set(this.config, 'data', data)
    console.log('router', this.$router.getmenuList())
  },
  async mounted() {
    this.getStatisticsHandle()
    this.markers = (await this.getMarkerList()).filter(item => item.longitude)
    MapLoader().then(
      AMap => {
        this.AMap = AMap
        this.map = new AMap.Map('container', {
          center: [114.02597366, 22.54605355], // 深圳
          zoom: 10
        })
        this.handleChange(this.city)
        var InfoWindow
        this.markers.map(item => {
          if (item.latitude) {
            // 创建一个 Icon
            var startIcon = new AMap.Icon({
              // 图标尺寸
              size: new AMap.Size(25, 34),
              // 图标的取图地址
              image: this.$http.staticUrl('/makers.png'),
              // 图标所用图片大小
              // imageSize: new AMap.Size(120, 30)
              // 图标取图偏移量
              imageOffset: new AMap.Pixel(item.projectState === '0' ? -6 : item.projectState === '1' ? -36 : -66, -10)
            })
            var marker = new AMap.Marker({
              title: item.projectName,
              draggable: false,
              icon: startIcon,
              // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
              offset: new AMap.Pixel(-13, -30),
              // cursor: 'move',
              // 设置拖拽效果
              // raiseOnDrag: true,
              position: [+item.longitude, +item.latitude]
            })
            item.marker = marker
            this.map.add(marker)
            marker.on('click', async() => {
              var detailInfo = await this.getdetail(item.id)
              InfoWindow = new AMap.InfoWindow({
                content: `
                <div class="dashboard-pro-detail" style="padding:0px;">
                  <div class="pro-title" style="text-align:center">
                    <img style="vertical-align: middle;width:18px;height:18px" src="${this.$http.staticUrl('/pro-icon.png')}" alt="">
                    <b>项目详情</b>
                  </div>
                  <div class="detail-item-wrap">
                    <div class="detail-item label">项目名称</div>
                    <div class="detail-item value">${detailInfo.projectName}</div>
                  </div>
                  <div class="detail-item-wrap">
                    <div class="detail-item label">项目状态</div>
                    <div class="detail-item value">${detailInfo.projectState === '0' ? '在建' : detailInfo.projectState === '1' ? '停工' : '竣工'}</div>
                  </div>
                  <div class="detail-item-wrap">
                    <div class="detail-item label">项目地址</div>
                    <div class="detail-item value">${detailInfo.projectAddress}</div>
                  </div>
                  <div class="detail-item-wrap">
                    <div class="detail-item label">施工许可证</div>
                    <div class="detail-item value">${detailInfo.builderLicense}</div>
                  </div>
                  <div class="detail-item-wrap">
                    <div class="detail-item label">开工时间</div>
                    <div class="detail-item value">${detailInfo.startingTime ? parseTime(detailInfo.startingTime, '{y}-{m}-{d}') : ''}</div>
                    <div class="detail-item label">完成时间</div>
                    <div class="detail-item value">${detailInfo.finishTime ? parseTime(detailInfo.finishTime, '{y}-{m}-{d}') : ''}</div>
                  </div>
                  </div>
                </div>
                `
              })
              InfoWindow.open(this.map, marker.getPosition())
            })
          }
        })
        this.map.on('click', () => {
          if (InfoWindow !== undefined) InfoWindow.close()
        })
      },
      e => {
        console.log('地图加载失败', e)
      }
    )
  },
  methods: {
    getdetail(id) {
      return new Promise(resolve => {
        detail({ id }).then(res => {
          resolve(res.result)
        })
      })
    },
    handleClick() {
      this.isShow = !this.isShow
    },
    changeHandle(id) {
      const select = this.markers.filter(item => item.id === id)
      const marker = select.length ? select[0].marker : {}
      var circle = new this.AMap.Circle({
        center: new this.AMap.LngLat(marker.getPosition().lng, marker.getPosition().lat), // 圆心位置
        radius: 200, // 半径
        strokeColor: '#F33', // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 3, // 线粗细度
        fillColor: '#ee2200', // 填充颜色
        fillOpacity: 0.35 // 填充透明度
      })
      this.map.add(circle)
      this.map.setFitView()
      this.map.setCenter(marker.getPosition())
      this.map.setZoom(15)
      setTimeout(() => {
        this.map.remove(circle)
      }, 5000)
    },
    handleChange(value) {
      const city = value && value.length ? value[value.length - 1] : ''
      if (city) this.map.setCity(city)
      // this.map.setZoom(12)
    },
    handleClear() {
      this.map.setCity('深圳市') // 深圳
      this.map.setZoom(15)
    },
    lazyLoad(node, resolve) {
      if (node.level === 0) {
        this.getTreeChild(100000, resolve)
        // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
      } else if (node.level === 1) {
        getTree({ id: node.data.id }).then(data => {
          if (data && data.code === 1000) {
            const list = data.result.map(item => {
              return { label: item.text, value: item.text, leaf: true }
            })
            resolve(list)
          }
        })
      }
    },
    getTreeChild(id, resolve) {
      //  这里可以替换成向后台发起的请求修改data,为了演示我用的是写死的数据,获取到data后,resolve出去就好了
      getTree({ id: id || 100000 }).then(data => {
        if (data && data.code === 1000) {
          const list = data.result.map(item => {
            item.label = item.text
            item.value = item.id
            item.edit = false
            item.leaf = item.state === 'open'
            return item
          })
          resolve(list)
        }
      })
    },
    getStatisticsHandle(id) {
      getStatistics({ id }).then(res => {
        this.statistics = res.result
      })
    },
    getMarkerList() {
      return new Promise(resolve => {
        getList().then(res => {
          const markers = res.result.length ? res.result : []
          resolve(markers)
        })
      })
    }
  }
}
</script>

<style lang="scss">
.amap-class {
  position: relative;
  width: 100%;
  // height: 830px;
  .content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
  }

  .content-window-card p {
    height: 2rem;
  }

  .custom-info {
    border: solid 1px silver;
  }

  div.info-top {
    position: relative;
    background: none repeat scroll 0 0 #f9f9f9;
    border-bottom: 1px solid #ccc;
    border-radius: 5px 5px 0 0;
  }

  div.info-top div {
    display: inline-block;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    line-height: 31px;
    padding: 0 10px;
  }

  div.info-top img {
    position: absolute;
    top: 10px;
    right: 10px;
    transition-duration: 0.25s;
  }

  div.info-top img:hover {
    box-shadow: 0px 0px 5px #000;
  }

  div.info-middle {
    font-size: 12px;
    padding: 10px 6px;
    line-height: 20px;
  }

  div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
  }

  div.info-bottom img {
    position: relative;
    z-index: 104;
  }

  span {
    margin-left: 5px;
    font-size: 11px;
  }

  .info-middle img {
    float: left;
    margin-right: 6px;
  }
}
.search-input {
  position: absolute;
  z-index: 1000;
  width: 300px;
  margin: 20px;
}
.toggle {
  float: left;
  color:#666;
  border: 1px solid #999;
  background: #fff;
  width: 70px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  z-index: 1001;
  right: 20px;
  height: 30px;
  line-height: 30px;
}
.right-modal {
  position: absolute;
  width: 500px;
  height: 500px;
  z-index: 1000;
  // background: rgba(255, 255, 255, 0.9);
  right: 20px;
  // padding: 10px;

  .centent {
    opacity: 1;
    color: #000;
  }
  .main {
    background: rgba(255, 255, 255, 0.9);
    padding: 0 10px;
  }
  .center {
    margin-top: 30px;
    width: 100%;
    opacity: 1;
    text-align: center;
    .item-num {
      color: #3c75c2;
      font-size: 30px;
    }
    .todayAttendRate {
      position: absolute;
      left: 80px;
      top: 95px;
    }
  }
  .pro-list {
    margin-top: 40px;
  }
  .list-title {
    padding: 5px;
    border: 1px solid #d3cdcd;
  }
  .list-style {
    height: 300px;
    overflow: auto;
    list-style-type:none;
    padding: 0;
    .row-item {
      color: #333;
      // border: 1px dashed #62cdfc;
    }
  }
  .moveR-enter-active,  .moveR-leave-active {
    transition: all 0.3s linear;
    transform: translateX(0);
  }
   .moveR-enter,  .moveR-leave {
    transform: translateX(100%);
  }
   .moveR-leave-to{
     transform: translateX(100%);
   }

}
.amap-info-close {
  margin-right: 30px;
  margin-top: 18px;
  font-size: 30px;
}
.amap-info-content {
  padding: 10px;
}
.dashboard-pro-detail {
  width: 500px;
  font-weight: 500;
  color:rgba(51,51,51,1);
  .pro-title {
    font-size: 18px;
    background: #DAEFFB;
    border:1px solid #B1E3FD;
    padding: 8px;
    margin-right: -1px;
  }
  .detail-item-wrap {
    display: flex;
    .detail-item {
      background: #EFF8FD;
      border:1px solid #B1E3FD;
      padding: 8px;
      margin-top:-1px;
      margin-right: -1px;
    }
    .col {
      flex: 1;
      .label {
        border-right: 1px solid #B1E3FD;
      }
    }
    .detail-item-start {
      display: flex;
    }
    .label {
      width: 115px;
      text-align: center;
    }
    .value {
      flex: 1;
    }
  }
}
</style>
