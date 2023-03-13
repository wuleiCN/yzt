<template>
  <div class="zhgd-material-history">
    <el-form :inline="true" :model="dataForm">
      <el-form-item label="项目名称">
        <el-select
          v-if="userType === 1 || userType === 0"
          v-model="dataForm.projectId"
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
        <span v-else class="title">{{ proName }}</span>
      </el-form-item>
      <el-divider direction="vertical" />
      <el-form-item prop="isControl">
        <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="设备名称" @change="searchHandle">
          <el-option label="2#" :value="0"> 123 </el-option>
          <el-option label="3#" :value="8"> 321 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="videoName">
        <el-date-picker
          v-model="timeRange"
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="(e) => selectChangeHandle(e)"
        />
      </el-form-item>
      <el-form-item prop="isControl">
        <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="报警状态" @change="searchHandle">
          <el-option label="正常" :value="0"> 正常 </el-option>
          <el-option label="异常" :value="8"> 异常 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle">查询</el-button>
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
        label="设备名称"
        header-align="center"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <div @click="handleClickImg(scope.row)">
            <el-avatar
              icon="el-icon-user-solid"
              :size="40"
              :src="scope.row.image | http2HttpsFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="location"
        header-align="center"
        align="center"
        label="设备编号"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="报警状态"
      >
        <template slot-scope="scope">
          <span> {{ AiEnum[scope.row.type].name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdTime"
        header-align="center"
        align="center"
        label="创建时间"
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
import { videoProList, photoRecordList } from '@/api-zhgd/video-AI'
import { getAiEnum } from '@/api/statistic-dashboard/ai'
// import { parseTime } from '@/utils'
export default {
  data() {
    return {
      dataForm: {
        type: 0,
        startTime: '',
        endTime: '',
        projectId: this.$store.state.user.loginInfo.projectId
      },
      timeRange: [],
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      proName: '',
      proList: [],
      dataList: [],
      AiEnum: {},
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dialogVisible: false,
      row: {},
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async created() {
    this.proList = await this.videoProListHandle()
    if (this.proList.length) {
      this.proName = this.proList[0].projectName
      this.dataForm.projectId = this.proList[0].id
    }
    this.getViolationAlarmData()
    this.getDataList()
  },
  methods: {
    // 获取项目列表
    videoProListHandle() {
      return new Promise(resolve => {
        videoProList().then(data => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          }
        })
      })
    },
    // 获取报警类型字典
    getViolationAlarmData() {
      getAiEnum().then(v => {
        if (v.code === 1000 && v.result) {
          v.result.map(v => {
            if (v.type !== '') this.AiEnum[v.type] = { ...v }
          })
        }
      })
    },
    getDataList() {
      this.dataListLoading = true
      photoRecordList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        console.log(data)
        this.dataListLoading = false
      })
    },
    selectChangeHandle(val) {
      this.dataForm.startTime = val && val.length ? val[0] : ''
      this.dataForm.endTime = val && val.length ? val[1] : ''
      this.getDataList()
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    }
  }
}
</script>

<style lang="scss">
  .zhgd-material-history {
    .el-form {
      margin-bottom: 20px;
      .el-divider {
        width: .13rem;
        height: 2rem;
      }
    }
  }
</style>
