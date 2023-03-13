<template>
  <div class="project-person">
    <el-container>
      <transition name="tree">
        <div v-show="isShow" class="main">
          <el-aside v-if="loginInfo.userType !== 3" class="left" :style="siteContentViewHeight" width="280px">
            <el-tree :data="orgList" :default-expanded-keys="[companyId]" :props="defaultProps" @node-click="handleNodeClick">
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
              <el-input v-model="dataForm.teamName" clearable placeholder="所属班组名称" />
            </el-form-item>
            <el-form-item prop="enterAndRetreatCondition">
              <el-select v-model="dataForm.enterAndRetreatCondition" clearable placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'enterAndRetreatCondition')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="empName">
              <el-input v-model="dataForm.empName" clearable placeholder="人员姓名" />
            </el-form-item>
            <el-form-item prop="idCode">
              <el-input v-model="dataForm.idCode" clearable placeholder="身份证号" />
            </el-form-item>
            <el-form-item prop="empPhon">
              <el-input v-model="dataForm.empPhon" clearable placeholder="手机号码" />
            </el-form-item>
            <el-form-item prop="jobName">
              <el-input v-model="dataForm.jobName" clearable placeholder="工种名称" />
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
            <el-form-item prop="noPassDays">
              <el-select v-model="dataForm.noPassDays" filterable clearable style="width:100%" placeholder="请选择未打卡天数" @change="(e) => selectChangeHandle(e, 'noPassDays')">
                <el-option label="1天未打卡" :value="1"> 1天未打卡 </el-option>
                <el-option label="3天未打卡" :value="3"> 3天未打卡 </el-option>
                <el-option label="7天未打卡" :value="7"> 7天未打卡 </el-option>
                <el-option label="15天未打卡" :value="15"> 15天未打卡 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="isTrain">
              <el-select v-model.trim="dataForm.isTrain" clearable style="width:100%" placeholder="安全培训是否合格" @change="(e) => selectChangeHandle(e, 'isTrain')">
                <el-option label="不合格" :value="0"> 不合格 </el-option>
                <el-option label="合格" :value="1"> 合格 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="dataSources">
              <el-select v-model.trim="dataForm.dataSources" clearable style="width:100%" placeholder="采集来源" @change="(e) => selectChangeHandle(e, 'dataSources')">
                <el-option label="PC端" :value="1"> PC端 </el-option>
                <el-option label="APP" :value="2"> APP </el-option>
                <el-option label="小智" :value="3"> 小智 </el-option>
                <el-option label="外部平台" :value="4"> 外部平台 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'project_person_btn_add'" type="primary" @click="addOrUpdateHandle({}, loginInfo.projectId)">新增</el-button>
              <el-button v-permit="'project_person_btn_in'" type="primary" :disabled="disabled1 || !disabled3" @click="getInHandle()">进场</el-button>
              <el-button v-permit="'project_person_btn_out'" type="primary" :disabled="disabled2 || !disabled3" @click="getOutHandle()">退场</el-button>
              <el-button v-if="isRegion" v-permit="'project_person_btn_out'" type="primary" :disabled="disabled4" @click="getTemporaryOut()">暂退场</el-button>
              <el-button v-permit="'project_person_btn_audit'" type="primary" :disabled="disabled3" @click="auditStateHandle()">审核</el-button>
              <el-button v-if="loginInfo.userType !== 2" v-permit="'project_person_btn_audit'" type="danger" :disabled="disabled3" @click="rejectStateHandle()">驳回</el-button>
              <el-popover
                v-model="popoverVisible"
                placement="bottom"
                width="auto"
                trigger="click"
              >
                <div class="sublit-btn"><el-button type="primary" @click="popoverBtnClick">确定</el-button></div>
                <el-checkbox-group v-model="checkList" class="checkbox-group-style">
                  <el-checkbox v-for="(item, index) in trintTypes" :key="index" :label="item.id">{{ index + 1 }}、{{ item.name }}</el-checkbox>
                </el-checkbox-group>
                <div v-if="!trintTypes.length">暂未设置打印模板</div>
                <el-button slot="reference" v-permit="'project_person_btn_allPrint'" style="margin-left:10px" :disabled="dataListSelections.length <= 0" type="primary" @click="allPrintHandle">批量打印</el-button>
              </el-popover>
              <a v-permit="'project_person_btn_export'" style="margin-left:10px" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
              <a id="exportYZ" v-permit="'project_person_btn_exportyz'" style="margin-left:10px" @click="handleExportYZ"><el-button type="primary">导出云筑模板</el-button></a>
              <el-button v-permit="'project_person_btn_import'" style="margin-left:10px" type="primary" @click="showImportModal()">导入</el-button>
              <el-button v-permit="'project_person_btn_ic_set'" type="primary" @click="showIcModal()">证卡设置</el-button>
              <el-button v-permit="'project_person_btn_bind_ic'" type="primary" size="small" :disabled="dataListSelections.length <= 0" @click="icBindHandle()">绑定IC卡号</el-button>
              <el-button v-permit="'project_person_btn_to_cardNo'" :loading="toCardLoading" type="primary" size="small" @click="toCardHandle()">工号转卡号</el-button>
            </div>
          </el-form>
          <div v-if="loginInfo.userType !== 3" class="tree-toggle-style" @click="isShow = !isShow">
            <span v-if="isShow"><i class="el-icon-arrow-left" /></span>
            <span v-else><i class="el-icon-arrow-right" /></span>
          </div>
          <el-table
            ref="multiTable"
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            tooltip-effect="light"
            highlight-current-row
            :row-key="getRowKeys"
            @selection-change="selectionChangeHandle"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              header-align="center"
              align="center"
              width="50"
            />
            <el-table-column
              prop="faceUrl"
              header-align="center"
              align="center"
              width="90"
              fixed="left"
              label="人脸照片"
            >
              <template slot-scope="scope">
                <div @click="handleClickImg(scope.row)">
                  <el-avatar
                    icon="el-icon-user-solid"
                    :size="30"
                    :src="scope.row.faceUrl | http2HttpsFilter"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              width="120"
              fixed="left"
              label="人员姓名"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              width="170"
              label="身份证号"
            />
            <el-table-column
              prop="jobNo"
              header-align="center"
              align="center"
              width="110"
              label="工号"
            />
            <el-table-column
              prop="icCardNo"
              header-align="center"
              align="center"
              width="110"
              label="IC卡号"
            />
            <el-table-column
              prop="empPhon"
              header-align="center"
              align="center"
              width="110"
              label="手机号码"
            />
            <el-table-column
              prop="enterAndRetreatCondition"
              header-align="center"
              align="center"
              width="100"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.enterAndRetreatCondition === 0" size="small" type="success">在场</el-tag>
                <el-tag v-if="scope.row.enterAndRetreatCondition === 1" size="small" type="danger">退场</el-tag>
                <el-tag v-if="scope.row.enterAndRetreatCondition === 2" size="small" type="info">未同步</el-tag>
                <el-tag v-if="scope.row.enterAndRetreatCondition === 3" size="small" type="warning">暂退场</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="isExamine"
              header-align="center"
              align="center"
              width="100"
              label="审核状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isExamine === 0" size="small" type="danger">未审核</el-tag>
                <el-tag v-if="scope.row.isExamine === 1" size="small" type="info">已审核</el-tag>
                <el-tag v-if="scope.row.isExamine === 2" size="small" type="info">驳回</el-tag>
                <el-tag v-if="scope.row.isExamine === 3 || scope.row.isExamine === 4" size="small" type="warning">审核中</el-tag>

              </template>
            </el-table-column>
            <el-table-column
              prop="dataSources"
              header-align="center"
              align="center"
              width="100"
              :show-overflow-tooltip="true"
              label="采集来源"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.dataSources === 1">{{ 'PC端' }}</span>
                <span v-if="scope.row.dataSources === 2">{{ 'APP' }}</span>
                <span v-if="scope.row.dataSources === 3">{{ '小智' }}</span>
                <span v-if="scope.row.dataSources === 4">{{ '外部平台' }}</span>
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
              label="班组"
            />
            <el-table-column
              prop="jobNameTitle"
              header-align="center"
              align="center"
              width="190"
              label="工种"
            />
            <el-table-column
              prop="isTeam"
              header-align="center"
              align="center"
              width="100"
              label="是否班组长"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isTeam ? '是' : '否' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="isTrain"
              header-align="center"
              align="center"
              width="140"
              label="安全培训是否合格"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.isTrain ? '是' : '否' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              header-align="center"
              align="center"
              width="160"
              label="入场时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.startTime ? parseTime(new Date(scope.row.startTime), '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="endTime"
              header-align="center"
              align="center"
              width="160"
              label="退场时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.endTime ? parseTime(new Date(scope.row.endTime), '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="lastPassTime"
              header-align="center"
              align="center"
              width="160"
              label="最近打卡时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.lastPassTime ? parseTime(scope.row.lastPassTime, '{y}-{m}-{d} {h}:{i}:{s}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              v-if="basePermit('project_person_btn_print') || basePermit('project_person_btn_update') || basePermit('project_person_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="180"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="left"
                  width="auto"
                  trigger="click"
                >
                  <div v-for="(item, index) in trintTypes" :key="index" class="temp-name" @click="showPrint(scope.row.id, item.id)">{{ index + 1 }}、{{ item.name }}</div>
                  <el-button slot="reference" v-permit="'project_person_btn_print'" style="margin-right:5px" type="text" @click="getPrintTypeHandle(scope.row.projectId)">打印</el-button>
                </el-popover>
                <el-button v-permit="'project_person_btn_update'" type="text" size="small" :disabled="scope.row.isExamine === 3 || scope.row.isExamine === 4" @click="addOrUpdateHandle(scope.row, scope.row.projectId)">修改</el-button>
                <el-button v-permit="'project_person_btn_ic_print'" type="text" size="small" @click="icPrintHandle(scope.row)">证卡打印</el-button>
                <!-- <el-button v-permit="'project_person_btn_delete'" style="color: rgb(254, 27, 54);" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> -->
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
          <el-dialog
            :title="row.empName"
            custom-class="person-avatar el-dialog_img"
            append-to-body
            width="400px"
            onselectstart="return false;"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
          >
            <!-- <div style="height: 500px;width: 100%;margin:0 auto;text-align:center"> -->
            <img
              style="width: 100%;height:600px"
              :src="row.faceUrl | http2HttpsFilter"
              alt=""
            >
            <!-- </div> -->
          </el-dialog>
          <!-- 弹窗, 新增 / 修改 -->
          <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
          <print v-if="printVisible" ref="print" />
          <ic-print v-if="icardVisible" ref="icard" />
          <ic-bind v-if="icardBindVisible" ref="icardBind" @refreshDataList="getDataList" />
          <import-modal v-if="importVisible" ref="importModal" @refreshDataList="getDataList" />
          <ic-modal v-if="icVisible" ref="icModal" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { treeDataTranslate, parseTime, myPrint } from '@/utils/index'
import dist from '@/utils/dist'
import AddOrUpdate from './person-add-or-update'
import print from './person-print'
import IcPrint from './person-ic-print'
import IcBind from './person-ic-bind'
import ImportModal from './person-import'
import IcModal from './person-ic'
import { getList, getProjectsTreeList, getOut, getTemporary, getIn, getPrintType, oneKeyPrint, auditState, jobNoToCardNo, GXjobNoToCardNo, toExamine, projectRegion } from '@/api/project/person'
import { detail } from '@/api/project/project'
export default {
  components: {
    AddOrUpdate,
    ImportModal,
    IcModal,
    IcPrint,
    IcBind,
    print
  },
  data() {
    return {
      parseTime,
      dist,
      row: {},
      projectRegion: false,
      dialogVisible: false,
      toCardLoading: false,
      icardVisible: false,
      icardBindVisible: false,
      icVisible: false,
      exportUrl: '',
      exportUrl1: '',
      isShow: false,
      isRegion: false,
      disabled1: true,
      disabled2: true,
      disabled3: true,
      disabled4: true,
      popoverVisible: false,
      importVisible: false,
      trintTypes: [],
      checkList: [],
      loginInfo: this.$store.state.user.loginInfo,
      projectId: JSON.parse(sessionStorage.getItem('result')).projectId,
      dataForm: {
        constructionName: '',
        projectName: '',
        teamName: '',
        enterAndRetreatCondition: 0,
        empName: '',
        idCode: '',
        empPhon: '',
        noPassDays: '',
        isTrain: '',
        startDate: '',
        endDate: '',
        jobName: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      options: [
        { value: 0, label: '在场' },
        { value: 1, label: '退场' },
        { value: 2, label: '未同步' },
        { value: 3, label: '暂退场' },
        { value: null, label: '全部' }
      ],
      companyId: '',
      type: '',
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      printVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false
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
  // async created() {
  //   if (this.loginInfo.userType !== 3) {
  //     const list = await this.getTreeList()
  //     if (list.length) {
  //       this.companyId = list[0].id || list[0].projectsId
  //       this.type = list[0].type
  //     }
  //   }
  //   this.getDataList()
  // },
  async mounted() {
    if (this.loginInfo.userType !== 3) {
      const list = await this.getTreeList()
      if (list.length) {
        this.companyId = list[0].id || list[0].projectsId
        this.type = list[0].type
      }
    }
    this.getDataList()
    this.isRegion = await this.getProDetail(this.projectId)
    this.projectRegion = await this.getProjectRegion()
    console.log(this.projectRegion)
  },
  methods: {
    // 获取数据列表
    getDataList() {
      const { userType, constructionId, token } = this.loginInfo
      this.exportUrl = `/workers/export?token=${token}&id=${this.companyId}&type=${this.type}`
      this.exportUrl1 = `/workers/exportYZ?token=${token}&id=${this.companyId}&type=${this.type}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
            this.exportUrl1 += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      this.dataListLoading = true
      this.$refs.multiTable.clearSelection()
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        id: userType === 3 ? constructionId : this.companyId,
        type: userType === 3 ? 3 : this.type,
        ...this.dataForm
      }).then((data) => {
        if (data.code === 1000 && data.result) {
          this.dataList = data.result.records
          this.totalPage = data.result.total
        } else {
          this.$message.error(data.message)
        }
        this.dataListLoading = false
      })
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    // 获取项目详情
    getProDetail(id) {
      return new Promise((resolve, reject) => {
        detail({ id }).then((data) => {
          this.isShowInfo = true
          if (data && data.code === 1000) {
            const region = data.result.projectRegion.split(',')[0] === '350000'
            resolve(region)
          } else {
            resolve(false)
          }
        })
      })
    },
    // 获取项目地区
    getProjectRegion(id) {
      return new Promise((resolve, reject) => {
        projectRegion().then((data) => {
          if (data && data.code === 1000) {
            const region = data.result
            resolve(region)
          } else {
            resolve(false)
          }
        })
      })
    },
    // 项目打印
    getPrintTypeHandle(projectId) {
      getPrintType({ projectId }).then((data) => {
        this.trintTypes = data.result
        if (!this.trintTypes.length) {
          this.$message.error('暂未设置打印模板')
        } else {
          // this.trintTypes.unshift({ name: '全部打印' })
        }
      })
    },
    // 多选
    selectionChangeHandle(val) {
      this.popoverVisible = false
      this.dataListSelections = val
      const status = this.dataListSelections.map(item => item.enterAndRetreatCondition)
      const isExamine = this.dataListSelections.map(item => item.isExamine)
      this.disabled1 = status[0] === 2 ? false : ([...new Set(status)].length > 1 || this.dataListSelections.length <= 0 || status.some(v => v === 0))
      if (isExamine.includes(0)) this.disabled1 = true
      this.disabled2 = status[0] === 2 ? true : ([...new Set(status)].length > 1 || this.dataListSelections.length <= 0 || status[0] !== 0)
      this.disabled4 = status[0] === 2 ? true : ([...new Set(status)].length > 1 || this.dataListSelections.length <= 0 || status[0] !== 0)
      if (isExamine.includes(0) || isExamine.includes(3) || isExamine.includes(4)) this.disabled3 = false
      if (this.dataListSelections.length <= 0) this.disabled3 = true
      const { token } = this.loginInfo
      if (this.dataListSelections.length) {
        this.exportUrl1 = `/workers/exportYZGX?token=${token}&ids=${this.dataListSelections.map(item => item.id).toString()}`
      } else {
        this.exportUrl1 = `/workers/exportYZ?token=${token}&id=${this.companyId}&type=${this.type}`
        for (const key in this.dataForm) {
          if (this.dataForm.hasOwnProperty(key)) {
            const element = this.dataForm[key]
            if (element || element === 0) {
              this.exportUrl += `&${key}=${this.dataForm[key]}`
              this.exportUrl1 += `&${key}=${this.dataForm[key]}`
            }
          }
        }
      }
    },
    handleExportYZ() {
      if (this.dataListSelections.length === 0) {
        if (this.totalPage > 65536) {
          return this.$message.error('当前导出数据为' + this.totalPage + '，只能导出65536条数据')
        } else {
          document.getElementById('exportYZ').target = '_blank'
          document.getElementById('exportYZ').href = this.$http.baseUrl(this.exportUrl1)
        }
      } else {
        document.getElementById('exportYZ').target = '_blank'
        document.getElementById('exportYZ').href = this.$http.baseUrl(this.exportUrl1)
      }
    },
    getRowKeys(row) {
      return row.id
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
      // 翻页取消勾选
      // this.$refs.multiTable.clearSelection()
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList(this.companyId)
    },
    // 当前页
    currentChangeHandle(val) {
      // 翻页取消勾选
      // this.$refs.multiTable.clearSelection()
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(row, pId) {
      if (pId) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init({ ...row })
        })
      } else {
        this.$message.error('项目账号才能做此操作!')
      }
    },
    // 证卡打印
    icPrintHandle(row) {
      this.icardVisible = true
      this.$nextTick(() => {
        this.$refs.icard.init({ ...row })
      })
    },
    // 绑定IC卡号
    icBindHandle() {
      this.icardBindVisible = true
      this.$nextTick(() => {
        this.$refs.icardBind.init([...this.dataListSelections])
      })
    },
    // 工号转卡号
    toCardHandle() {
      this.$confirm(`您确定进行一键工号转卡号的操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 勾选的情况下
        if (this.dataListSelections.length) {
          var ids = this.dataListSelections.map(item => item.id)
          GXjobNoToCardNo(ids).then((data) => {
            this.toCardLoading = true
            if (data && data.code === 1000) {
              this.toCardLoading = false
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
              this.toCardLoading = false
            }
          })
        } else {
          // 不勾选的情况下
          jobNoToCardNo().then((data) => {
            this.toCardLoading = true
            if (data && data.code === 1000) {
              this.toCardLoading = false
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
              this.toCardLoading = false
            }
          })
        }
      }).catch(() => {})
    },
    // 删除
    // deleteHandle(id) {
    //   var ids = id ? [id] : this.dataListSelections.map(item => {
    //     return item.id
    //   })
    //   this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     workersDel(ids).then((data) => {
    //       if (data && data.code === 1000) {
    //         this.$message({
    //           message: '操作成功',
    //           type: 'success',
    //           duration: 1000,
    //           onClose: () => {
    //             this.getDataList()
    //           }
    //         })
    //       } else {
    //         this.$message.error(data.msg)
    //       }
    //     })
    //   }).catch(() => {})
    // },
    popoverBtnClick() {
      this.popoverVisible = false
      if (this.checkList.length) {
        oneKeyPrint({ empIds: this.dataListSelections.map(item => item.id), tempIds: this.checkList }).then(data => {
          const printList = data.result
          let str = ''
          let ele = ''
          for (var i = 0; i < printList.length; i++) {
            ele = printList[i].replace(/http:\/\//g, this.$http.baseUrl(`/user/getImg?orgUrl=http://`))
            if (i !== (printList.length - 1)) {
              // 批量打印 换页
              str = str + ele + '<div  style="page-break-before:always;"><br /></div>'
            } else {
              str = str + ele
            }
          }
          myPrint(str)
          this.checkList = []
        })
      }
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('project_person_btn_update')) this.addOrUpdateHandle(row, row.projectId)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 打印弹窗
    showPrint(id, tempId) {
      this.printVisible = true
      this.$nextTick(() => {
        this.$refs.print.init(id, tempId)
      })
    },
    // 导入
    showImportModal(id, tempId) {
      this.importVisible = true
      this.$nextTick(() => {
        this.$refs.importModal.init()
      })
    },
    // 证卡设置
    showIcModal(id, tempId) {
      this.icVisible = true
      this.$nextTick(() => {
        this.$refs.icModal.init()
      })
    },
    // 打印全部
    allPrintHandle(id) {
      this.checkList = []
      if (this.loginInfo.projectId) this.getPrintTypeHandle(this.loginInfo.projectId)
      // allPrint({ id }).then(data => {
      //   const printList = data.result
      //   for (var i = 0; i < printList.length; i++) {
      //     myPrint(printList[i])
      //   }
      // })
    },
    // 退场
    getOutHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => item.id)
      this.$confirm(`您确定进行[${id ? '删除' : '退场'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getOut(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 暂退场
    getTemporaryOut(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => item.id)
      this.$confirm(`您确定进行暂退场操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getTemporary(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 审核
    auditStateHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => item.id)
      this.$confirm(`您确定对当前的人员进行审核操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const isExamine1 = this.dataListSelections.filter(item => item.isExamine === 3)
        const isExamine2 = this.dataListSelections.filter(item => item.isExamine === 4)
        const id3 = isExamine1.map(item => item.id)
        const id4 = isExamine2.map(item => item.id)
        if (isExamine1.length !== 0 && this.loginInfo.userType !== 2) {
          toExamine({
            ids: [...id3],
            lx: 1,
            isExamine: 1
          }).then(res => {
            if (res && res.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (isExamine2.length !== 0 && this.loginInfo.userType !== 2) {
          toExamine({
            ids: [...id4],
            lx: 2,
            isExamine: 1
          }).then(data => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (this.projectRegion) { // 东莞地区
          this.$message.warning('暂无权限，请联系管理人员进行相应操作!')
        } else {
          auditState(ids).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      }).catch(() => {})
    },
    rejectStateHandle() {
      this.$confirm(`您确定对当前的人员进行驳回操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const isExamine1 = this.dataListSelections.filter(item => item.isExamine === 3)
        const isExamine2 = this.dataListSelections.filter(item => item.isExamine === 4)
        const id3 = isExamine1.map(item => item.id)
        const id4 = isExamine2.map(item => item.id)
        if (isExamine1.length !== 0 && this.userType !== 2) {
          toExamine({
            ids: [...id3],
            lx: 1,
            isExamine: 2
          }).then(res => {
            if (res && res.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(res.message)
            }
          })
        } else if (isExamine2.length !== 0 && this.userType !== 2) {
          toExamine({
            ids: [...id4],
            lx: 2,
            isExamine: 2
          }).then(data => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    // 进场
    getInHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => item.id)
      this.$confirm(`您确定进行[${id ? '删除' : '进场'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getIn(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
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

<style lang="scss">
  .project-person {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
  .temp-name {
    padding-bottom:3px;
    margin: 8px 0;
    cursor: pointer;
    border-bottom: 1px solid #dcdfe6;
  }
  .temp-name:hover{
    color: #1682e6;
    // border-bottom: 1px solid #1682e6;
  }
  .sublit-btn {
    width: 100%;
    text-align: right;
    border-bottom: 1px solid #dcdfe6;
    padding-bottom: 5px;
    margin-bottom: 5px;
    .el-button {
      height: 25px;
      padding: 5px;
    }
  }
  .checkbox-group-style {
    .el-checkbox {
      margin: 0;
      display: block;
      margin-bottom: 5px;
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .person-avatar {
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
