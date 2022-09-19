<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实时数据" name="monitor">
        <realtime-data />
        <formwork-line :id="'formwork-line'" :title="'深层水平位移监测'" :width="'100%'" :height="'15.38rem'" :unit="'mm'" />
        <formwork-line :id="'groundwater-line'" :title="'地下水位监测'" :width="'100%'" :height="'15.38rem'" :unit="'kN'" />
        <formwork-line :id="'bolt-line'" :title="'锚杆内力监测'" :width="'100%'" :height="'15.38rem'" :unit="'mm'" />
        <formwork-line :id="'Surface-line'" :title="'周边地表竖向位移监测'" :width="'100%'" :height="'15.38rem'" :unit="'mm'" />
        <formwork-line :id="'Column-line'" :title="'立柱竖向位移监测'" :width="'100%'" :height="'15.38rem'" :unit="'mm'" />
        <formwork-line :id="'Foundation-line'" :title="'基坑周边沉降'" :width="'100%'" :height="'15.38rem'" :unit="'mm'" />
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="second">
        <realtime-data />
        <el-form class="monitor-select" :inline="true" :model="dataForm1">
          <el-form-item prop="timeRange">
            <el-date-picker
              v-model="dataForm.timeRange"
              clearable
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="e => selectChangeHandle(e, 'timeRange')"
            />
          </el-form-item>
          <el-form-item prop="pointType">
            <el-select
              v-model="dataForm.pointType"
              filterable
              clearable
              style="width:100%"
              placeholder="请选择监测类型"
              @change="e => selectChangeHandle(e, 'pointType')"
            >
              <el-option v-for="(item, index) in pointTypeList" :key="index" :label="item.label" :value="index" />
            </el-select>
          </el-form-item>
          <el-form-item prop="monitorType">
            <el-select
              v-model="dataForm.monitorType"
              filterable
              clearable
              style="width:100%"
              placeholder="请选择报警类型"
              @change="e => selectChangeHandle(e, 'monitorType')"
            >
              <el-option v-for="(item, idx) in monitorTypeList" :key="idx" :label="item.label" :value="idx" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-table
          ref="realtimeTable"
          v-loading="dataListLoading"
          :data="dataList"
          border
          stripe
          tooltip-effect="light"
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column
            prop="pointNo"
            header-align="center"
            align="center"
            fixed="left"
            label="测点编号"
          />
          <el-table-column
            prop="pointType"
            header-align="center"
            align="center"
            label="监测类型"
          />
          <el-table-column
            prop="calculated"
            header-align="center"
            align="center"
            label="计算值"
          />
          <el-table-column
            prop="changeValue"
            header-align="center"
            align="center"
            label="变化值"
          />
          <el-table-column
            prop="rate"
            header-align="center"
            align="center"
            label="变化率"
          />
          <el-table-column
            prop="alarmType"
            header-align="center"
            align="center"
            label="报警类型"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.alarmType === 0"
                size="small"
                type="success"
              >正常</el-tag>
              <el-tag
                v-if="scope.row.alarmType === 1"
                size="small"
                type="danger"
              >报警</el-tag>
              <el-tag
                v-if="scope.row.alarmType === 3"
                size="small"
                type="warning"
              >维修</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="dataTime"
            header-align="center"
            align="center"
            width="160"
            label="监测时间"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.dataTime
                  ? parseTime(new Date(scope.row.dataTime), "{y}-{m}-{d}")
                  : ""
              }}</span>
            </template>
          </el-table-column>
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
      </el-tab-pane>
    </el-tabs>
    <el-form class="select-pro" :inline="true" :model="dataForm1">
      <el-form-item label="项目名称">
        <el-select
          v-model="dataForm1.projectId"
          clearable
          filterable
          placeholder="请选择项目名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in proList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          >
            <span style="float: left">{{ item.projectName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="dataForm1.projectId"
          clearable
          filterable
          placeholder="请选择设备名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in devList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          >
            <span style="float: left">{{ item.projectName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { vehicleProList } from '@/api-zhgd/vehicle-monitor'
import RealtimeData from './realtime-data.vue'
import FormworkLine from './component/formwork-line.vue'
import { parseTime } from '@/utils/index'
export default {
  components: {
    RealtimeData,
    FormworkLine
  },
  // mixins: [common],
  data() {
    return {
      dataForm1: {
        deviceName: '',
        projectId: this.$store.state.user.loginInfo.projectId
      },
      parseTime,
      dataForm: {
        pointNo: '',
        pointType: '',
        calculated: '',
        changeValue: '',
        rate: '',
        alarmType: '',
        dataTime: ''
      },
      monitorTypeList: [],
      pointTypeList: [],
      dataList: [

      ],
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      activeName: 'monitor',
      proList: [],
      devList: [],
      tableData: []
    }
  },
  async mounted() {
    this.proList = await this.vehicleProListHandle()
    if (this.proList.length) {
      this.proName = this.proList[0].projectName
    }
  },
  methods: {
    vehicleProListHandle() {
      return new Promise(resolve => {
        vehicleProList().then(data => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          }
        })
      })
    },
    handleClick(e) {
      console.log(e)
    },
    searchHandle() {},
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs {
  position: relative;
  .monitor-select {
    margin-top: 20px;
  }
}
.select-pro {
  position: absolute;
  top: 20px;
  left: 30%;
}
</style>
