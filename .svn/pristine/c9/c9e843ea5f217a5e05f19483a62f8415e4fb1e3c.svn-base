<template>
  <div class="epidemic-record">
    <el-container>

      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="projectName">
              <el-input v-model.trim="dataForm.projectName" clearable placeholder="所属项目名称" />
            </el-form-item>
            <el-form-item prop="constructionName">
              <el-input v-model.trim="dataForm.constructionName" clearable placeholder="参建单位名称" />
            </el-form-item>
            <el-form-item prop="teamName">
              <el-input v-model.trim="dataForm.teamName" clearable placeholder="所属班组" />
            </el-form-item>
            <el-form-item prop="empName">
              <el-input v-model.trim="dataForm.empName" clearable placeholder="工人名称" />
            </el-form-item>
            <el-form-item prop="vaccines">
              <el-select v-model.trim="dataForm.vaccines" clearable style="width:100%" placeholder="疫苗接种" @change="(e) => searchHandle(e, 'vaccines')">
                <el-option label="已完成" :value="1"> 已完成 </el-option>
                <el-option label="未完成" :value="0"> 未完成 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="healthCode">
              <el-select v-model.trim="dataForm.healthCode" clearable style="width:100%" placeholder="健康码" @change="(e) => searchHandle(e, 'healthCode')">
                <el-option label="绿码" :value="0"> 绿码 </el-option>
                <el-option label="黄码" :value="1"> 黄码 </el-option>
                <el-option label="红码" :value="2"> 红码 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="healthCode">
              <el-select v-model.trim="staffData" clearable style="width:100%" placeholder="进场人员" @change="(e) => searchHandle(e, 'staff')">
                <el-option label="班组人员" :value="0"> 班组人员 </el-option>
                <el-option label="陌生人" :value="1"> 陌生人 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
              <a v-permit="'project_unit_btn_export'" style="margin-left:10px" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
              <!-- <el-button type="primary" @click="$http.baseUrl(exportUrl)">导出</el-button> -->
            </el-form-item>
          </el-form>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            highlight-current-row
          >
            <el-table-column
              prop="sitePhoto"
              header-align="center"
              align="center"
              fixed="left"
              label="实时头像"
            >
              <template slot-scope="scope">
                <div @click="handleClickImg(scope.row)">
                  <el-avatar
                    icon="el-icon-user-solid"
                    :size="30"
                    :src="scope.row.sitePhoto | http2HttpsFilter"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              fixed="left"
              label="工人名称"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              width="170"
              label="身份证号"
            />
            <el-table-column
              prop="temperature"
              header-align="center"
              align="center"
              label="体温"
            />
            <el-table-column
              prop="nucleicAcid"
              header-align="center"
              align="center"
              label="核酸检测"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.nucleicAcid === 1" type="danger">阳性</el-tag>
                <el-tag v-if="scope.row.nucleicAcid === 0" type="success">阴性</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="mucleicAcidTime"
              header-align="center"
              align="center"
              width="160"
              label="检测时间"
            />
            <el-table-column
              prop="healthCode"
              header-align="center"
              align="center"
              label="健康码"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.healthCode === 0" type="success">绿码</el-tag>
                <el-tag v-if="scope.row.healthCode === 1" type="warning">黄码</el-tag>
                <el-tag v-if="scope.row.healthCode === 2" type="danger">红码</el-tag>
                <el-tag v-if="scope.row.healthCode === 3" type="info">无效码</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="vaccines"
              header-align="center"
              align="center"
              label="疫苗接种"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.vaccines === 1" type="success">已完成</el-tag>
                <el-tag v-if="scope.row.vaccines === 0" type="warning">未完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              width="300"
              :show-overflow-tooltip="true"
              label="项目名称"
            />
            <el-table-column
              prop="constructionName"
              header-align="center"
              align="center"
              width="300"
              label="参建单位名称"
            />
            <el-table-column
              prop="teamName"
              header-align="center"
              align="center"
              width="190"
              label="班组名称"
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
          <el-dialog
            :title="row.empName"
            custom-class="epidemic-record-avatar el-dialog_img"
            append-to-body
            width="400px"
            onselectstart="return false;"
            :close-on-click-modal="true"
            :visible.sync="dialogVisible"
          >
            <div style="width: 100%;margin:0 auto;">
              <img style="width: 100%;" :src="row.sitePhoto | http2HttpsFilter" alt="">
            </div>
          </el-dialog>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { getList } from '@/api/epidemic'
export default {
  data() {
    return {
      dialogVisible: false,
      staffData: '',
      row: {},
      loginInfo: this.$store.state.user.loginInfo,
      exportUrl: '',
      dataForm: {
        projectName: '',
        vaccines: '',
        healthCode: '',
        constructionName: '',
        empName: '',
        teamName: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  async created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records.map(item => {
          item.mucleicAcidTime = item.mucleicAcidTime ? parseTime(item.mucleicAcidTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          return item
        })
        this.totalPage = data.result.total
        this.dataListLoading = false
        const { token } = this.loginInfo
        this.exportUrl = `/attendanceNone/export?token=${token}&id=47&type=1&page=${this.pageIndex}&rows=9999`
        console.log('data', data)
      })
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
    // 导出
    // exprotDataHandle() {
    //   exportData().then(res => {
    //     console.log('export', res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>

<style lang="scss">
  .epidemic-record {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
  .epidemic-record-avatar {
    // margin-top: 15vh !important;
    .el-dialog__header {
      padding: 8px;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
    .el-dialog__body {
      padding: 10px;
    }
    .el-dialog__footer {
      display: none;
    }
  }
</style>
