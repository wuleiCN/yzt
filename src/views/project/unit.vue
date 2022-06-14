<template>
  <div class="project-unit">
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
              <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
            </el-form-item>
            <el-form-item prop="constructionName">
              <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位名称" />
            </el-form-item>
            <el-form-item prop="suid">
              <el-input v-model="dataForm.suid" clearable placeholder="信用代码" />
            </el-form-item>
            <el-form-item prop="projectState">
              <el-select v-model="dataForm.projectState" clearable placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'status')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
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
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'project_unit_btn_add'" type="primary" @click="addOrUpdateHandle({}, loginInfo.projectId)">新增</el-button>
              <el-button v-permit="'project_unit_btn_in'" type="primary" :disabled="disabled1" @click="getInHandle()">进场</el-button>
              <el-button v-permit="'project_unit_btn_out'" type="primary" :disabled="disabled2" @click="getOutHandle()">退场</el-button>
              <a v-permit="'project_unit_btn_export'" style="margin-left:10px" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
              <el-button v-permit="'project_unit_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
            tooltip-effect="light"
            highlight-current-row
            @selection-change="selectionChangeHandle"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50"
            />
            <el-table-column
              prop="construction.constructionName"
              header-align="center"
              align="center"
              width="250"
              :show-overflow-tooltip="true"
              label="参建单位名称"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="所属项目"
            />
            <el-table-column
              prop="construction.typeStr"
              header-align="center"
              align="center"
              width="145"
              label="单位类型"
            />
            <el-table-column
              prop="construction.suid"
              header-align="center"
              align="center"
              width="190"
              label="信用代码"
            />
            <el-table-column
              prop="construction.contacts"
              header-align="center"
              align="center"
              width="120"
              label="项目负责人"
            />
            <el-table-column
              prop="construction.mobilePhone"
              header-align="center"
              align="center"
              width="110"
              label="负责人电话"
            />
            <el-table-column
              prop="score"
              header-align="center"
              align="center"
              width="110"
              label="积分"
            >
              <template slot-scope="{row}">
                <span :style="{color: row.score && (Math.round(+row.score / +row.initialScore) >= 0.5) ? 'green' : 'red'}">{{ row.score }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="inTime"
              header-align="center"
              align="center"
              width="100"
              label="入场日期"
            >
              <template slot-scope="scope"> <span>{{ scope.row && scope.row.inTime ? parseTime(scope.row.inTime, '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="outTime"
              header-align="center"
              align="center"
              width="100"
              label="退场日期"
            >
              <template slot-scope="scope"> <span>{{ scope.row && scope.row.outTime ? parseTime(scope.row.outTime, '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="status"
              header-align="center"
              align="center"
              width="100"
              label="进退场状态"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="!scope.row.status ? 'success' : 'danger'">{{ dist.inOutTags()[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="basePermit('project_unit_btn_update') || basePermit('project_unit_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="90"
            >
              <template slot-scope="scope">
                <el-button v-permit="'project_unit_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row, scope.row.projectId)">修改</el-button>
                <el-button v-permit="'project_unit_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
          <!-- 弹窗, 新增 / 修改 -->
          <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { treeDataTranslate, parseTime } from '@/utils/index'
import dist from '@/utils/dist'
import AddOrUpdate from './unit-add-or-update'
import { getProjectList, getProjectsTreeList, del, getOut, getIn } from '@/api/project/unit'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      parseTime,
      dist,
      isShow: false,
      loginInfo: this.$store.state.user.loginInfo,
      exportUrl: '',
      dataForm: {
        constructionName: '',
        projectName: '',
        suid: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      companyId: '',
      options: [
        { value: 0, label: '在场' },
        { value: 1, label: '退场' },
        { value: null, label: '全部' }
      ],
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      disabled1: false,
      disabled2: false,
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
      this.exportUrl = `/construction/export?token=${token}&id=${this.companyId}&type=${this.type}`
      // console.log('url', this.companyId)
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      getProjectList({
        page: this.pageIndex,
        rows: this.pageSize,
        id: userType === 3 ? constructionId : this.companyId,
        type: userType === 3 ? 3 : this.type,
        ...this.dataForm }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 获取树列表
    getTreeList() {
      return new Promise((resolve, reject) => {
        getProjectsTreeList().then(data => {
          if (data && data.code === 1000) {
            this.orgList = treeDataTranslate(data.result, 'id')
            resolve(this.orgList)
          }
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
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
      const status = this.dataListSelections.map(item => item.status)
      this.disabled1 = ([...new Set(status)].length > 1 || this.dataListSelections.length <= 0 || status[0] !== 1)
      this.disabled2 = ([...new Set(status)].length > 1 || this.dataListSelections.length <= 0 || status[0] !== 0)
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
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
      this.getDataList()
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('project_unit_btn_update')) this.addOrUpdateHandle(row, row.projectId)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => item.id)
      this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(ids).then((data) => {
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
    }
  }
}
</script>

<style lang="scss">
  .project-unit {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
</style>
