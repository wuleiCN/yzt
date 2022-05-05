<template>

  <div class="monitor-work">
    <el-form :inline="true" :model="dataForm">
      <!-- <el-form-item prop="hxzFactory">
        <el-input v-model.trim="dataForm.hxzFactory" placeholder="制造厂商" />
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
        <el-button type="primary" style="margin-right:10px" @click="searchHandle()">查询</el-button>
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
    >
      <el-table-column
        prop="deviceName"
        header-align="center"
        align="center"
        label="设备名称"
      />
      <el-table-column
        prop="hxzFactory"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="制造厂商"
      />
      <el-table-column
        prop="startFloor"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="起始楼层"
      />
      <el-table-column
        prop="endFloor"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="结束楼层"
      />
      <el-table-column
        prop="startHeight"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="起始高度"
      />
      <el-table-column
        prop="endHeight"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="结束高度"
      />
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="操作人员"
      />
      <el-table-column
        prop="peopleCnt"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="人数"
      />
      <el-table-column
        prop="workNo"
        header-align="center"
        align="center"
        label="工号"
      />
      <el-table-column
        prop="workTime"
        header-align="center"
        align="center"
        width="120"
        label="持续时长(秒)"
      />
      <el-table-column
        prop="workStartTime"
        header-align="center"
        align="center"
        width="180"
        label="开始时间"
      />
      <el-table-column
        prop="workEndTime"
        header-align="center"
        align="center"
        width="180"
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
import { dataList } from '@/api-zhgd/zhgd-elevator'
import { parseTime } from '@/utils'
export default {
  props: {
    elevatorId: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      dataForm: {
        // hxzFactory: '',
        workStartTime: '',
        workEndTime: ''
      },
      timeRange: '',
      dataList: [],
      exportUrl: `/eleWorkData/export`,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  watch: {
    elevatorId: {
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
    getDataList(elevatorId) {
      this.dataListLoading = true
      this.exportUrl = `/eleWorkData/export?elevatorId=${this.elevatorId}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      dataList({
        elevatorId: elevatorId,
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
      this.getDataList(this.elevatorId)
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList(this.elevatorId)
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList(this.elevatorId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList(this.elevatorId)
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
