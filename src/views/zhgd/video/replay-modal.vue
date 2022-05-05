<template>
  <el-dialog
    custom-class="zhgd-video-manager-modal"
    title="视频回放"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="timeRange">
        <el-date-picker
          v-model="dataForm.timeRange"
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="(e) => selectChangeHandle(e, 'timeRange')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle">查询</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { videoMonitorList } from '@/api-zhgd/video-device'
export default {
  data() {
    return {
      dataForm: {
        startTime: '',
        endTime: '',
        timeRange: []
      },
      visible: false
    }
  },
  methods: {
    // 获取数据列表
    getVideoMonitorList() {
      return new Promise(resolve => {
        this.loading = true
        videoMonitorList({ videoSn: this.row.videoSn, ...this.dataForm, type: 3 }).then(data => {
          if (data && data.code === 1000) {
            this.loading = false
            var arr = data.result.result.records
            arr.length = this.activeClass
            this.visible = true
            this.videoList = []
            for (let index = 0; index < this.activeClass; index++) {
              const element = arr[index]
              this.videoList.push(element)
            }
            this.$nextTick(() => {
              if (this.visible) {
                this.videoList.map((item, index) => {
                  if (item) this.show({ ...item, index })
                })
              }
            })
            resolve(true)
          } else {
            this.loading = false
          }
        })
      })
    },
    // 打开弹窗
    init(row) {
      this.row = row
      this.visible = true
      this.$nextTick(() => {

      })
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startTime = val && val.length ? val[0] : ''
        this.dataForm.endTime = val && val.length ? val[1] : ''
      }
    },
    searchHandle() {
      this.getVideoMonitorList()
    }
  }
}
</script>
<style lang="scss">
  .zhgd-video-manager-modal {
    width: 700px;
  }
</style>
