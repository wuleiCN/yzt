<template>
  <div class="project-reward-punish">
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
            <el-form-item prop="type2">
              <el-select v-model.trim="dataForm.type2" clearable placeholder="请选择类型" @change="(e) => searchHandle(e, 'category')">
                <el-option label="奖励" :value="1"> 奖励 </el-option>
                <el-option label="惩罚" :value="2"> 惩罚 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="所属项目名称" />
            </el-form-item>
            <el-form-item prop="constructionName">
              <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位" />
            </el-form-item>
            <el-form-item prop="teamName">
              <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
            </el-form-item>
            <el-form-item prop="empName">
              <el-input v-model="dataForm.empName" clearable placeholder="姓名" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'project_reward-punish_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
              <el-button v-permit="'project_reward-punish_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
          >
            <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50"
            />
            <el-table-column
              prop="newType"
              header-align="center"
              align="center"
              width="100"
              label="类别"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              width="200"
              :show-overflow-tooltip="true"
              label="所属项目"
            />
            <el-table-column
              prop="constructionName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="参建单位"
            />
            <el-table-column
              prop="teamName"
              header-align="center"
              align="center"
              label="班组"
            />

            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              width="100"
              label="姓名"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              width="190"
              label="身份证号"
            />
            <el-table-column
              prop="amount"
              header-align="center"
              align="center"
              width="140"
              label="奖惩金额"
            />
            <el-table-column
              prop="categoryName"
              header-align="center"
              align="center"
              width="140"
              label="奖惩类别"
            />
            <el-table-column
              prop="levelName"
              header-align="center"
              align="center"
              width="140"
              label="奖惩级别"
            />
            <el-table-column
              prop="createTime"
              header-align="center"
              align="center"
              width="160"
              label="创建时间"
            />
            <el-table-column
              v-if="basePermit('project_reward-punish_btn_update') || basePermit('project_reward-punish_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              width="100"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'project_reward-punish_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
                <el-button v-permit="'project_reward-punish_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
          <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :select-list="selectList" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { treeDataTranslate, parseTime } from '@/utils/index'
import AddOrUpdate from './reward-punish-add-or-update'
import { getProjectsTreeList } from '@/api/project/person'
import MixinItem from '@/components/mixin'
import { getList, del } from '@/api/project/reward-punish'
export default {
  components: {
    AddOrUpdate
  },
  mixins: [MixinItem],
  data() {
    return {
      isShow: false,
      dataForm: {
        type2: '',
        projectName: '',
        empName: '',
        constructionName: '',
        teamName: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loginInfo: this.$store.state.user.loginInfo,
      companyId: '',
      type: '',
      dataList: [],
      dataListSelections: [],
      orgList: [],
      selectList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
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
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records.map(item => {
          item.newType = item.type === 1 ? '奖励' : '惩罚'
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          return item
        })
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
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // rowDblclick(row) {
    //   if (this.basePermit('project_reward-punish_btn_update')) this.addOrUpdateHandle(row)
    // },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
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
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      this.getDataList(this.companyId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
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
    }
  }
}
</script>

<style lang="scss">
  .project-reward-punish {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
</style>
