<template>
  <div class="allot">
    <el-container>
      <transition name="tree">
        <div v-show="isShow" class="main">
          <el-aside v-if="userType === 1 || userType === 0" class="left" width="280px">
            <el-tree :data="orgList" node-key="id" :default-expanded-keys="[companyId]" :props="defaultProps" @node-click="handleNodeClick" />
          </el-aside>
        </div>
      </transition>

      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
              <el-button v-permit="'salary_allot_set_bank'" :disabled="!id" type="primary" @click="setBlankHandle()">绑定项目账户</el-button>
            </el-form-item></el-form>
          <div v-if="userType === 1 || userType === 0" class="tree-toggle-style" @click="isShow = !isShow">
            <span v-if="isShow"><i class="el-icon-arrow-left" /></span>
            <span v-else><i class="el-icon-arrow-right" /></span>
          </div>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            highlight-current-row
            @row-dblclick="rowDblclick"
          >
            <el-table-column header-align="center" align="center" label="" width="55">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row" @change.native="radioChangeHandle(scope.row)"><span /></el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="projectName"
              header-align="center"
              align="left"
              width="500"
              label="项目名称"
            />
            <el-table-column
              prop="builderLicense"
              header-align="center"
              align="center"
              label="施工许可证"
            />
            <el-table-column
              prop="workersNum"
              header-align="center"
              align="center"
              label="项目人员数"
            />
            <el-table-column
              prop="projectState"
              header-align="center"
              align="center"
              label="项目状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.projectState == 0" size="small" type="success">在建</el-tag>
                <el-tag v-if="scope.row.projectState == 1" size="small" type="danger">停工</el-tag>
                <el-tag v-if="scope.row.projectState == 2" size="small" type="info">竣工</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="状态"
            >
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.planId ? '已设薪资方案' : '未设薪资方案' }}</span> -->
                <el-tag v-if="scope.row.planId" size="small" type="success">已设薪资方案</el-tag>
                <el-tag v-else size="small" type="danger">未设薪资方案</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="planName"
              header-align="center"
              align="center"
              label="薪资方案"
            />
            <el-table-column
              v-if="basePermit('salary_allot_btn_delete') || basePermit('salary_allot_btn_update')"
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="90"
            >
              <template slot-scope="scope">
                <el-button v-permit="'salary_allot_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
                <el-button v-permit="'salary_allot_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
        </div>
      </el-main>
    </el-container>
    <!-- 银行设置 -->
    <SetBank v-if="setBlankVisible" ref="setBlank" />
    <AddOrUpdate v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils/index'
import SetBank from './plan-bank-set'
import { del } from '@/api/salary/allot'
import dist from '@/utils/dist'
import AddOrUpdate from './allot-add-or-update'
import { getList, getTreeList } from '@/api/project/project'
export default {
  components: {
    AddOrUpdate,
    SetBank
  },
  data() {
    return {
      tableRadio: {},
      dataForm: {
        projectName: ''
      },
      id: '',
      dist,
      isShow: false,
      defaultProps: {
        children: 'children',
        label: 'companyName'
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      companyId: '',
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      addOrUpdateVisible: false,
      setBlankVisible: false,
      dataListLoading: false
    }
  },
  async created() {
    if (this.userType === 1 || this.userType === 0) {
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
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        companyId: this.companyId,
        ...this.dataForm
      }).then((data) => {
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
    // 获取公司列表
    getTreeList() {
      this.dataListLoading = true
      return new Promise((resolve, reject) => {
        getTreeList().then(data => {
          if (data && data.code === 1000) {
            this.orgList = treeDataTranslate(data.result, 'id')
            resolve(this.orgList)
          }
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
    // 设置银行账户
    setBlankHandle() {
      this.setBlankVisible = true
      this.$nextTick(() => {
        this.$refs.setBlank.init(this.id)
      })
    },
    radioChangeHandle(row) {
      this.id = row.id
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('salary_allot_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    handleNodeClick(data) {
      this.companyId = data.id
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
    // 删除
    deleteHandle(id) {
      // var ids = id ? [id] : this.dataListSelections.map(item => {
      //   return item.id
      // })
      this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then((data) => {
          if (data && data.code === 1000) {
            this.getDataList()
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
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
  .allot {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      height: 700px;
    }
    .el-radio__label {
      padding: 0;
    }
  }
</style>
