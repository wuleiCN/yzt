<template>
  <div class="project-team">
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

            <el-form-item prop="teamName">
              <el-input v-model="dataForm.teamName" clearable placeholder="班组名称" />
            </el-form-item>
            <el-form-item prop="status">
              <el-select v-model="dataForm.status" placeholder="请选择状态" @change="selectChangeHandle">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'project_team_btn_add'" type="primary" @click="addOrUpdateHandle(null, loginInfo.projectId)">新增</el-button>
              <el-button v-permit="'project_team_btn_transfer'" type="primary" :disabled="dataListSelections.length <= 0" @click="transferOrmerge('transfer', loginInfo.projectId)">班组调动</el-button>
              <el-button v-permit="'project_team_btn_merge'" type="primary" :disabled="dataListSelections.length <= 0" @click="transferOrmerge('merge', loginInfo.projectId)">班组合并</el-button>
              <el-button v-permit="'project_team_btn_in'" type="primary" :disabled="disabled1" @click="getInHandle()">进场</el-button>
              <el-button v-permit="'project_team_btn_out'" type="primary" :disabled="disabled2" @click="getOutHandle()">退场</el-button>
              <el-button v-permit="'project_team_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
            </div></el-form>
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
              prop="constructionName"
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
              prop="teamName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="班组名称"
            />
            <el-table-column
              prop="inTime"
              header-align="center"
              align="center"
              width="100"
              label="入场日期"
            >
              <template slot-scope="scope"> <span>{{ scope.row.inTime ? parseTime(scope.row.inTime, '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="outTime"
              header-align="center"
              align="center"
              width="100"
              label="退场日期"
            >
              <template slot-scope="scope"> <span>{{ scope.row.outTime ? parseTime(scope.row.outTime, '{y}-{m}-{d}') : '' }}</span> </template>
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
              v-if="basePermit('project_team_btn_update') || basePermit('project_team_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="90"
            >
              <template slot-scope="scope">
                <el-button v-permit="'project_team_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row.id, scope.row.projectId)">修改</el-button>
                <el-button v-permit="'project_team_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
          <!-- 弹窗, 调动 / 合并 -->
          <transferOrmerge v-if="visible" ref="transferOrmerge" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { treeDataTranslate, parseTime } from '@/utils/index'
import dist from '@/utils/dist'
import AddOrUpdate from './team-add-or-update'
import transferOrmerge from './team-transfer-merge'
import { getList, getProjectsTreeList, del, getOut, getIn } from '@/api/project/team'
export default {
  components: {
    AddOrUpdate,
    transferOrmerge
  },
  data() {
    return {
      parseTime,
      dist,
      isShow: false,
      disabled1: true,
      disabled2: true,
      loginInfo: this.$store.state.user.loginInfo,
      dataForm: {
        projectName: '',
        constructionName: '',
        teamName: '',
        inTime: '',
        outTime: '',
        status: null
      },
      options: [
        { value: 0, label: '在场' },
        { value: 1, label: '退场' },
        { value: null, label: '全部' }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      companyId: '',
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      visible: false
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
      const { userType, constructionId } = this.loginInfo
      getList({
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
    addOrUpdateHandle(id, pId) {
      if (pId) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, pId)
        })
      } else {
        this.$message.error('项目账号才能做此操作!')
      }
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('project_team_btn_update')) this.addOrUpdateHandle(row.id, this.loginInfo.projectId)
    },
    // 调动 / 合并
    transferOrmerge(type, pId) {
      if (pId) {
        this.visible = true
        this.$nextTick(() => {
          const ids = this.dataListSelections.map(item => item.id)
          if (ids.length > 1 && type === 'transfer') {
            return this.$message.error('班组调动，只能选择一条')
          } else if (type === 'merge') {
            const ids = this.dataListSelections.map(item => item.constructionId)
            const selectIds = this.dataListSelections.map(item => item.id)
            if (Array.from(new Set(this.dataListSelections.map(item => item.constructionId))).length > 1) {
              return this.$message.error('班组合并，只能选择同一个参建单位')
            }
            this.$refs.transferOrmerge.init(ids, type, selectIds)
          } else {
            this.$refs.transferOrmerge.init(ids, type)
          }
        })
      } else {
        this.$message.error('项目账号才能做此操作!')
      }
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
    selectChangeHandle(val) {
      this.dataForm.status = val
      this.getDataList()
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
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
  .project-team {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
</style>
