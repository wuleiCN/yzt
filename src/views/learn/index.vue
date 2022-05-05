<template>
  <div class="learn">
    <div class="learn-wrap">
      <el-row>
        <el-col :span="19">
          <div style="margin-left:50px">
            <h1>{{ current.name }}（{{ current.typeStr }}）</h1>
            <div style="padding:5px 10px;background:#000">
              <video class="video-style" :src="current.videoUrl" controls>
                <!-- <source :src="current.videoUrl" type="video/mp4">
                <source :src="current.videoUrl" type="video/webm"> -->
              </video>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="erweima">
            <h4>扫码考试</h4>
            <div id="qrcode" ref="qrcode" />
            <p>视频简介：</p>
            <p class="intro">
              {{ current.intro }}
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="video-menu">
        <h4>视频列表</h4>
        <div class="menu-wrap">
          <div v-for="(item,index) in list" :key="index" class="menu-item">
            <el-row>
              <el-col :span="24">
                <img :src="item.coverImg" @click="handleChangeVideo(item)">
                <div class="video-name">{{ item.name }}</div>
              </el-col>
            </el-row>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { videoList } from '@/api/learn'
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      list: [],
      qrcode: null,
      // http://192.168.1.176/examination.html
      link: '',
      current: {},
      id: this.$router.history.current.query.id
    }
  },
  created() {
    this.getVideoList()
  },
  methods: {
    getVideoList() {
      videoList({ id: this.id }).then(data => {
        this.list = data.result
        this.current = this.list && this.list.length ? this.list[0] : {}
        this.link = this.$http.erweimaUrl(`/#/exam?trainId=${this.$router.history.current.query.id}&videoId=${this.current.id}`)
        this.$nextTick(() => {
          this.qrcodeHandle()
        })
      })
    },
    qrcodeHandle() {
      this.qrcode = new QRCode('qrcode', {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: this.link // 生成二维码的链接
      })
    },
    handleChangeVideo(item) {
      this.$refs.qrcode.innerHTML = ''
      this.current = item
      this.link = this.$http.erweimaUrl(`/#/exam?trainId=${this.$router.history.current.query.id}&videoId=${this.current.id}`)
      this.$nextTick(() => {
        this.qrcodeHandle()
      })
    }
  }
}
</script>

<style lang="scss">
.learn {
  background: #f4f5f5;
  padding-top: 20px;
  .learn-wrap {
    background: #fff;
    height: 100vh;
    width: 1200px;
    margin: 0 auto;

    .video-style {
      width: 100%;
      height: calc(100vh -36)
    }
    .erweima {
      margin-top: 40px;
      margin-left: 20px;
      img {
        // margin-top: 500px;
        width: 95%;
      }
    }
    .video-menu {
      width: 1100px;
      margin: 0 auto;
      .menu-wrap {
        display: flex;
        overflow-x: auto;
        .menu-item {
          // border: 1px solid red;
          margin-right: 10px;
        }
        img {
          width:300px;
          height:180px;
          cursor: pointer;
          margin-bottom: 15px;
        }
        .video-name {
          color: #000;
          // position: absolute;
          padding-bottom: 10px;
          // bottom: -10px;
          // z-index: 100;
          // padding: 10px;
          // text-align: center;
        }
      }

    }
    .intro {
      width:220px;
      word-wrap:break-word;
      text-indent:25px;
      overflow:hidden;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp: 8;
    }
  }
}

</style>
