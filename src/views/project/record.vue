<template>
  <div class="project-record">
    <el-container>
      <transition name="tree">
        <div v-show="isShow" class="main">
          <el-aside v-if="loginInfo.userType !== 3" class="left" :style="siteContentViewHeight" width="280px">
            <el-tree :data="orgList" node-key="id" :default-expanded-keys="[companyId]" :props="defaultProps" @node-click="handleNodeClick">
              <span slot-scope="{ data }" class="custom-tree-node">
                <div class="long-text" :title="data.name">
                  <svg-icon :icon-class="data.id ? 'company' : 'project'" /> {{ data.name }}
                </div>
              </span>
            </el-tree>
          </el-aside>
        </div>
      </transition>

      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="所属项目名称" />
            </el-form-item>
            <el-form-item prop="constructionName">
              <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位名称" />
            </el-form-item>
            <el-form-item prop="teamName">
              <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
            </el-form-item>
            <el-form-item prop="empName">
              <el-input v-model="dataForm.empName" clearable placeholder="人员姓名" />
            </el-form-item>
            <el-form-item prop="deviceSn">
              <el-input v-model="dataForm.deviceSn" clearable placeholder="设备序列号" />
            </el-form-item>
            <el-form-item prop="way">
              <el-select v-model.trim="dataForm.way" clearable style="width:100%" placeholder="通行方式" @change="(e) => searchHandle(e, 'way')">
                <el-option label="人脸识别" :value="1"> 人脸识别 </el-option>
                <el-option label="刷卡" :value="2"> 刷卡 </el-option>
              </el-select>
            </el-form-item>
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
            <el-form-item prop="direction">
              <el-select v-model.trim="dataForm.direction" clearable style="width:100%" placeholder="进出标识" @change="(e) => searchHandle(e, 'direction')">
                <el-option label="进" value="in"> 进 </el-option>
                <el-option label="出" value="out"> 出 </el-option>
                <el-option label="不分进出" value="none"> 不分进出 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="diredeviceTypection">
              <el-select v-model.trim="dataForm.deviceType" clearable style="width:100%" placeholder="考勤类别" @change="(e) => searchHandle(e, 'deviceType')">
                <el-option label="普通考勤" :value="1"> 普通考勤 </el-option>
                <el-option label="手持机考勤" :value="2"> 手持机考勤 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <a v-permit="'project_record_btn_export'" style="margin-left:10px" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
            </div>
          </el-form>
          <div v-if="loginInfo.userType !== 3" class="tree-toggle-style" @click="isShow = !isShow">
            <span v-if="isShow"><i class="el-icon-arrow-left" /></span>
            <span v-else><i class="el-icon-arrow-right" /></span>
          </div>
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
              label="姓名"
            />
            <el-table-column
              prop="jobNo"
              header-align="center"
              align="center"
              width="110"
              label="工号"
            />
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
            <el-table-column
              prop="deviceName"
              header-align="center"
              align="center"
              width="190"
              label="考勤设备名称"
            />
            <el-table-column
              prop="deviceSn"
              header-align="center"
              align="center"
              width="190"
              label="设备序列号"
            />
            <el-table-column
              prop="direction"
              header-align="center"
              align="center"
              width="120"
              label="进出标识"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.direction === 'in'">{{ '进' }}</div>
                <div v-if="scope.row.direction === 'out'">{{ '出' }}</div>
                <div v-if="scope.row.direction === 'none'">{{ '不分进出' }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="way"
              header-align="center"
              align="center"
              width="120"
              label="通行方式"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.way === 1">人脸识别</div>
                <div v-if="scope.row.way === 2">刷卡</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="temperature"
              header-align="center"
              align="center"
              width="120"
              label="体温"
            />
            <el-table-column
              prop="passedTime"
              header-align="center"
              align="center"
              width="160"
              label="打卡时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.passedTime ? parseTime(scope.row.passedTime, '{y}-{m}-{d} {h}:{i}:{s}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="createDate"
              header-align="center"
              align="center"
              width="160"
              label="写入系统时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.createDate ? parseTime(scope.row.createDate, '{y}-{m}-{d} {h}:{i}:{s}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              header-align="center"
              align="center"
              width="160"
              label="对接时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.uploadTime ? parseTime(scope.row.uploadTime, '{y}-{m}-{d} {h}:{i}:{s}') : '' }}</span> </template>
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
          <el-dialog
            :title="row.empName"
            custom-class="record-avatar el-dialog_img"
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
import { treeDataTranslate, parseTime } from '@/utils/index'
import dist from '@/utils/dist'
import { getProjectsTreeList } from '@/api/project/person'
import { getList } from '@/api/project/record'
export default {
  data() {
    return {
      parseTime,
      dist,
      exportUrl: '',
      isShow: false,
      dialogVisible: false,
      row: {},
      dataForm: {
        projectName: '',
        way: '',
        constructionName: '',
        empName: '',
        teamName: '',
        deviceSn: '',
        startTime: '',
        endTime: '',
        deviceType: null,
        direction: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loginInfo: this.$store.state.user.loginInfo,
      companyId: '',
      type: '',
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight },
      set(val) { this.$store.commit('app/updateDocumentClientHeight', val) }
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2 - 90
      if (this.$route.meta.isTab) {
        height -= 40
      }
      return { minHeight: height + 'px' }
    }
  },
  async created() {
    if (this.loginInfo.userType !== 3) {
      const list = await this.getTreeList()
      if (list.length) {
        this.companyId = list[0].id || list[0].projectsId
        this.type = list[0].type
      }
    }
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      const { userType, constructionId, token } = this.loginInfo
      const { timeRange } = this.dataForm
      this.dataForm.startTime = timeRange && timeRange.length ? timeRange[0] : ''
      this.dataForm.endTime = timeRange && timeRange.length ? timeRange[1] : ''
      this.exportUrl = `/attendanceRecord/export?token=${token}&id=${this.companyId}&type=${this.type}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        id: userType === 3 ? constructionId : this.companyId,
        type: userType === 3 ? 3 : this.type,
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records
        this.totalPage = data.result.total
        this.dataListLoading = false
      })
    },
    // 获取树列表
    getTreeList() {
      return new Promise((resolve, reject) => {
        getProjectsTreeList().then(data => {
          this.orgList = treeDataTranslate(data.result, 'id')
          resolve(this.orgList)
        })
      })
    },
    // 点击树中的某条
    handleNodeClick(data) {
      this.companyId = data.id || data.projectsId
      this.type = data.type
      this.getDataList(data.id)
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
      this.getDataList(this.companyId)
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startTime = val && val.length ? val[0] : ''
        this.dataForm.endTime = val && val.length ? val[1] : ''
      }
      this.getDataList()
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
  .project-record {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
  .record-avatar {
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
