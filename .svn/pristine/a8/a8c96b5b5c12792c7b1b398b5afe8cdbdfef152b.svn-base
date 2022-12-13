<template>
  <div class="statistical-unitAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="planId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" clearable filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="search-btn-style">
          <a v-permit="'project_record_btn_export'" :class="dataForm.projectId ? '' : 'pointer'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary" :disabled="dataForm.projectId === ''">导出</el-button></a>
        </div>
      </el-form-item>
      <!-- <div class="search-btn-style"> -->
      <!-- <el-button type="primary" @click="searchHandle()">查询</el-button> -->
      <!-- </div> -->
    </el-form>
    <h3>{{ `今日参建单位出入情况统计(${dataList.length})` }}</h3>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      show-summary
      stripe
      border
      sum-text="小计"
      tooltip-effect="light"
      highlight-current-row
      :summary-method="summaryHandle"
    >
      <!-- :summary-method="summaryHandle" -->
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        width="400"
      />
      <el-table-column
        prop="crNum"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          出入人数：<span class="num">{{ scope.row.crNum }}</span>个
        </template>
      </el-table-column>
      <el-table-column
        prop="ssNum"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          实时人数：<span class="num">{{ scope.row.ssNum }}</span>个
        </template>
      </el-table-column>
      <el-table-column
        prop="zcNum"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          在场人数：<span class="num">{{ scope.row.zcNum }}</span>个
        </template>
      </el-table-column>
      <el-table-column
        prop="sklv"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <div :class="scope.row.sklv < 50 ? 'sklv-red' : 'sklv-green'">
            刷卡率：<span class="num">{{ scope.row.sklv }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="danger">退场</el-tag>
          <el-tag v-if="scope.row.status === 0" size="small" type="success">在场</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { proOptionList } from '@/api/salary/data'
import { getList } from '@/api/statistical/unitAtt'
export default {
  data() {
    return {
      dataForm: {
        projectId: ''
      },
      exportUrl: '',
      disabled: false,
      loginInfo: this.$store.state.user.loginInfo,
      dataList: [],
      proList: [],
      constructionList: [],
      dataListLoading: false
    }
  },
  async mounted() {
    await this.getProOptionList()
    // this.disabled = true
    // this.dataForm.projectId = this.loginInfo.projectId
    // this.exportUrl = `/statisticalReport/export?projectId=${this.dataForm.projectId}`
    // this.getDataList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      this.disabled = true
      this.getDataList()
      this.exportUrl = `/statisticalReport/export?projectId=${this.dataForm.projectId}`
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      this.exportUrl = `/statisticalReport/export?projectId=${this.dataForm.projectId}`
      this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result || []
          // this.searchHandle()
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
    average(nums) {
      const num = nums.reduce((a, b) => a + b) / nums.length
      return num ? num.toFixed(2) : 0
    },
    summaryHandle(param) {
      // nums.reduce((a, b) => a + b) / nums.length

      const { data } = param
      const crNum = data && data.length ? data.map(item => item.crNum).reduce((acc, val) => acc + val, 0) : 0
      const ssNum = data && data.length ? data.map(item => item.ssNum).reduce((acc, val) => acc + val, 0) : 0
      const zcNum = data && data.length ? data.map(item => item.zcNum).reduce((acc, val) => acc + val, 0) : 0
      const sklv = data && data.length ? this.average(data.map(item => item.sklv)) : 0
      return ['小计', crNum, ssNum, zcNum, sklv + '%', `在场${this.dataList.length}个单位`]
    },
    getProOptionList() {
      return new Promise(resolve => {
        proOptionList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 查询
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      this.getDataList()
    }
  }
}
</script>

<style lang="scss">
  .statistical-unitAtt {
  .pointer {
      pointer-events: none
  }
  .el-table {
    thead {
      display: none;
    }
    tr {
      height: 50px;
      font-size: 15px;
    }
    .num {
      font-weight: 600;
    }
    .sklv-green {
      color: green;
    }
    .sklv-red {
      color: red;
    }
  }
  }
</style>
