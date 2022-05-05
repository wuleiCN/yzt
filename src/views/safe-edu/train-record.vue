<template>
  <div class="project-train-record">
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
            <el-form-item prop="empName">
              <el-input v-model="dataForm.empName" clearable placeholder="员工名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <el-form-item>
              <a v-permit="'product_io_export'" style="margin-left:10px" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
            </el-form-item>
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
          >
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              width="300"
              :show-overflow-tooltip="true"
              label="所属项目"
            />
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              label="员工名称"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              label="身份证号"
            />

            <el-table-column
              prop="empPhon"
              header-align="center"
              align="center"
              label="手机号"
            />
            <el-table-column
              v-if="basePermit('sys_train-record_btn_view')"
              fixed="right"
              header-align="center"
              align="center"
              width="120"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'sys_train-record_btn_view'" type="text" size="small" @click="showDatalModal(scope.row)">查看详情</el-button>
                <!-- <el-button v-permit="'sys_train-record_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> -->
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
          <record-modal v-if="recordModalVisible" ref="recordModal" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils/index'
import { getProjectsTreeList } from '@/api/project/person'
import { getList, del } from '@/api/project/train-record'
import RecordModal from './train-record-detail'
import { parseTime } from '@/utils'
export default {
  components: {
    RecordModal
  },
  data() {
    return {
      isShow: false,
      exportUrl: '',
      recordModalVisible: false,
      dataForm: {
        projectName: '',
        empName: ''
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
      selectList: [],
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
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        id: userType === 3 ? constructionId : this.companyId,
        type: userType === 3 ? 3 : this.type,
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records.map(item => {
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          return item
        })
        this.totalPage = data.result.total
        this.dataListLoading = false
      })
      const id = userType === 3 ? constructionId : this.companyId
      const type = userType === 3 ? 3 : this.type
      this.exportUrl = `/workerTrainRecord/export?token=${token}&id=${id}&page=${this.pageIndex}&empName=${this.dataForm.empName}&rows=${this.pageSize}&type=${type}`
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
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 点击树中的某条
    handleNodeClick(data) {
      this.companyId = data.id || data.projectsId
      this.type = data.type
      this.getDataList(data.id)
    },
    // 显示详情弹窗
    showDatalModal(row) {
      this.recordModalVisible = true
      this.$nextTick(() => {
        this.$refs.recordModal.init(row)
      })
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
  .project-train-record {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
</style>
