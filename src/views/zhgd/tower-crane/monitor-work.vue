<template>

  <div class="monitor-work">
    <el-form :inline="true" :model="dataForm">
      <!-- <el-form-item prop="hxzFactory">
        <el-input v-model.trim="dataForm.hxzFactory" placeholder="厂商名称" />
      </el-form-item> -->
      <el-form-item prop="time">
        <el-date-picker
          v-model="timeRange"
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
        <!-- <el-button type="primary" style="margin-right:10px" @click="searchHandle()">查询</el-button> -->
        <a
          target="_blank"
          :href="$httpZhgd.baseUrl(exportUrl)"
        ><el-button type="primary">导出</el-button></a>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        prop="hxzFactory"
        header-align="center"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
        label="黑匣子厂家"
      />
      <el-table-column
        prop="hxzId"
        header-align="center"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
        label="黑匣子编号"
      />
      <el-table-column
        prop="workStartAngle"
        header-align="center"
        align="center"
        label="开始角度"
      />
      <el-table-column
        prop="workEndAngle"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="结束角度"
      />
      <el-table-column
        prop="workStartHeight"
        header-align="center"
        align="center"
        label="开始高度"
      />
      <el-table-column
        prop="workEndHeight"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="结束高度"
      />
      <el-table-column
        prop="workMinHeight1"
        header-align="center"
        align="center"
        label="最小高度"
      />
      <el-table-column
        prop="workMaxHeight1"
        header-align="center"
        align="center"
        label="最大高度"
      />
      <el-table-column
        prop="workMaxHeight"
        header-align="center"
        align="center"
        width="120"
        :show-overflow-tooltip="true"
        label="高度变化量"
      />
      <el-table-column
        prop="workMaxForce"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="最大力矩"
      />
      <el-table-column
        prop="workMaxRange"
        header-align="center"
        align="center"
        width="140"
        label="最大力矩时的幅度"
      />
      <el-table-column
        prop="workMaxTorque"
        header-align="center"
        align="center"
        width="140"
        label="最大力矩百分比"
      />
      <el-table-column
        prop="workMaxWindSpeed"
        header-align="center"
        align="center"
        label="最大风速"
      />

      <el-table-column
        prop="workNo"
        header-align="center"
        align="center"
        label="工号"
      />
      <el-table-column
        prop="workStartRange"
        header-align="center"
        align="center"
        label="开始幅度"
      />
      <el-table-column
        prop="workTime"
        header-align="center"
        align="center"
        label="持续时长"
      />
      <el-table-column
        prop="workWeight"
        header-align="center"
        align="center"
        width="140"
        label="最大力矩时的吊重"
      />
      <el-table-column
        prop="workStartTime"
        header-align="center"
        align="center"
        width="180"
        fixed="right"
        label="开始时间"
      />
      <el-table-column
        prop="workEndTime"
        header-align="center"
        align="center"
        width="180"
        fixed="right"
        :show-overflow-tooltip="true"
        label="结束时间"
      />
    </el-table>
    <el-pagination
      background
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
  </div>
</template>

<script>
import { dataList } from '@/api-zhgd/zhgd-tower-crane'
import { parseTime } from '@/utils'
export default {
  props: {
    craneId: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    // const { token } = this.$store.state.user.loginInfo
    return {
      dataForm: {
        // hxzFactory: '',
        workStartTime: '',
        workEndTime: ''
      },
      timeRange: '',
      dataList: [],
      exportUrl: `/craneWorkData/export`,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  watch: {
    craneId: {
      handler(newVal, oldVal) {
        return newVal && this.getDataList(newVal)
      },
      immediate: true
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList(craneId) {
      this.dataListLoading = true
      this.exportUrl = `/craneWorkData/export?craneId=${this.craneId}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      dataList({
        craneId: craneId,
        ...this.dataForm,
        'page': this.pageIndex,
        'rows': this.pageSize
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.workStartTime = item.workStartTime ? parseTime(item.workStartTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            item.workEndTime = item.workEndTime ? parseTime(item.workEndTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.workStartTime = val && val.length ? val[0] : ''
        this.dataForm.workEndTime = val && val.length ? val[1] : ''
      }
      // this.dataForm[type] = val
      this.getDataList(this.craneId)
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList(this.craneId)
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList(this.craneId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList(this.craneId)
    }
  }
}
</script>

<style lang="scss">
.monitor-work {
  .el-table {
    width: 100%;
    margin-top:10px
  }
}
</style>
