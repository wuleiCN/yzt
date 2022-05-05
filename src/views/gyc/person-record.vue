<template>
  <div class="gyc-person-record-page">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="objectId">
        <el-select v-model="dataForm.objectId" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'objectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="请选择统计对象" @change="(e) => searchHandle(e, 'type')">
          <el-option label="参建单位" :value="1"> 参建单位 </el-option>
          <el-option label="班组" :value="2"> 班组 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model.trim="dataForm.status" clearable style="width:100%" placeholder="请选择状态" @change="(e) => searchHandle(e, 'status')">
          <el-option label="在场" :value="0"> 在场 </el-option>
          <el-option label="退场" :value="1"> 退场 </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-table
          v-loading="dataListLoading"
          :data="dataList"
          border
          tooltip-effect="light"
          highlight-current-row
          class="left-table"
          show-summary
          @row-click="rowClick"
        >
          <el-table-column
            prop="objectName"
            header-align="center"
            align="center"
            show-overflow-tooltip
            label="名称"
          />
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            show-overflow-tooltip
            label="状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status===0">在场</span>
              <span v-if="scope.row.status===1">退场</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalNum"
            header-align="center"
            align="center"
            label="总人数"
          />
          <el-table-column
            prop="inNum"
            header-align="center"
            align="center"
            label="入住人数"
          />
          <!-- <el-table-column
            prop="proportion"
            header-align="center"
            align="center"
            label="男女比例"
          /> -->
          <el-table-column
            prop="proportion"
            header-align="center"
            align="center"
            label="入住率"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.inNum && scope.row.totalNum ? (divide(scope.row.inNum, scope.row.totalNum) *100).toFixed(2) + '%' : 0 + '%' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="16">
        <el-form :inline="true" :model="dataForm">
          <el-form-item prop="empName">
            <el-input v-model="dataForm.empName" clearable placeholder="姓名" />
          </el-form-item>
          <el-form-item prop="idCode">
            <el-input v-model="dataForm.idCode" clearable placeholder="身份证号码" />
          </el-form-item>
          <el-form-item prop="houseNumber">
            <el-input v-model="dataForm.houseNumber" clearable placeholder="入住宿舍" />
          </el-form-item>
          <el-form-item prop="direction">
            <el-select v-model.trim="dataForm.direction" clearable style="width:100%" placeholder="请选择生活区状态" @change="(e) => searchHandle(e, 'direction')">
              <el-option label="在生活区" value="in"> 在生活区 </el-option>
              <el-option label="外出" value="out"> 外出 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model.trim="dataForm.status2" clearable style="width:100%" placeholder="请选择状态" @change="(e) => searchHandle(e, 'status2')">
              <el-option label="在场" :value="0"> 在场 </el-option>
              <el-option label="退场" :value="1"> 退场 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="(e) => searchHandle(e, 'search')">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="dataListLoading1"
          :data="rightDataList"
          border
          stripe
          tooltip-effect="light"
          highlight-current-row
          class="right-table"
        >
          <el-table-column
            prop="empName"
            header-align="center"
            align="center"
            label="姓名"
          />
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status===0">在场</span>
              <span v-if="scope.row.status===1">退场</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="idCode"
            header-align="center"
            align="center"
            width="170"
            label="身份证号码"
          />
          <el-table-column
            prop="constructionName"
            header-align="center"
            align="center"
            width="220"
            label="参建单位"
          />
          <el-table-column
            prop="teamName"
            header-align="center"
            align="center"
            label="班组"
          />
          <el-table-column
            prop="rzStatus"
            header-align="center"
            align="center"
            label="入住情况"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.rzStatus">未入住</span>
              <span v-if="scope.row.rzStatus===1">已入住</span>
              <span v-if="scope.row.rzStatus===2">已迁出</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="houseNumber"
            header-align="center"
            align="center"
            width="100"
            label="入住宿舍"
          />
          <el-table-column
            prop="direction"
            header-align="center"
            align="center"
            width="100"
            label="生活区状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.direction==='in'">在生活区</span>
              <span v-if="scope.row.direction==='out'">外出</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="passedTime"
            header-align="center"
            align="center"
            width="170"
            label="最后进出时间"
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
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { statistics, statisticsEmp } from '@/api/gyc/in-record'
import { proOptionList } from '@/api/gyc/community'
import { parseTime, divide } from '@/utils'
export default {
  data() {
    return {
      divide,
      dataForm: {
        status: '',
        status2: '',
        type: '',
        objectId: this.$store.state.user.loginInfo.projectId
      },
      dataList: [],
      copyObjectId: '',
      rightDataList: [],
      proList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListLoading1: false
    }
  },
  async created() {
    await this.getProOptionList()
    this.getDataList()
  },
  methods: {
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
    getDataList() {
      this.dataListLoading = true
      statistics({
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result
        }
        this.dataListLoading = false
      })
    },
    getstatisticsEmp() {
      this.dataListLoading1 = true
      statisticsEmp({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm,
        objectId: this.copyObjectId
      }).then((data) => {
        if (data && data.code === 1000) {
          this.rightDataList = data.result.records.map(item => {
            item.passedTime = item.passedTime ? parseTime(item.passedTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
          this.totalPage = data.result.total
        } else {
          this.rightDataList = []
          this.totalPage = 0
        }
        this.dataListLoading1 = false
      })
    },
    rowClick(row) {
      this.pageIndex = 1
      this.copyObjectId = row.id
      this.getstatisticsEmp()
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getstatisticsEmp()
    },
    // 查询
    searchHandle(e, name) {
      this.rightDataList = []
      this.pageIndex = 1
      if (name === 'search' || name === 'direction') {
        this.getstatisticsEmp()
      } else if (name === 'status') {
        this.getDataList()
      } else if (name === 'status2') {
        this.getstatisticsEmp()
      } else {
        this.getDataList()
      }
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getstatisticsEmp()
    }
  }
}
</script>

<style lang="scss">
  .gyc-person-record-page {
    .left-table {
      .el-table__body-wrapper {
        width: 100%;
        height:600px;
        overflow-y:auto;
      }
    }
    .right-table {
      .el-table__body-wrapper {
        width: 100%;
        // height:660px;
        // overflow-y:auto;
      }
    }
  }
</style>
