<template>
  <div class="contract">
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
            <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="项目名称"
            />
            <el-table-column
              prop="builderLicense"
              header-align="center"
              align="center"
              width="300"
              label="施工许可证"
            />
            <el-table-column
              prop="workersNum"
              header-align="center"
              align="center"
              width="100"
              label="项目人员数"
            />
            <el-table-column
              prop="projectState"
              header-align="center"
              align="center"
              width="100"
              label="项目状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.projectState == 0" size="small" type="success">在建</el-tag>
                <el-tag v-if="scope.row.projectState == 1" size="small" type="danger">停工</el-tag>
                <el-tag v-if="scope.row.projectState == 2" size="small" type="info">竣工</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="basePermit('project_temp_btn_set')"
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="90"
            >
              <template slot-scope="scope">
                <el-button v-permit="'project_temp_btn_set'" type="text" size="small" @click="detailHandle(scope.row.id)">模板设置</el-button>
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
    <detail v-if="detailVisible" ref="detail" />
  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils/index'
import dist from '@/utils/dist'
import detail from './contract-detail'
import { getList, getTreeList } from '@/api/project/project'
export default {
  components: {
    detail
  },
  data() {
    return {
      dataForm: {
        projectName: ''
      },
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
      detailVisible: false,
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
    detailHandle(id) {
      this.detailVisible = true
      this.$nextTick(() => {
        this.$refs.detail.init(id)
      })
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('project_temp_btn_set')) this.detailHandle(row.id)
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
    }
  }
}
</script>

<style lang="scss">
  .contract {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      height: 700px;
    }
  }
</style>
