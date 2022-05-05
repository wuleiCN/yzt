<template>
  <div class="project-reward-punish">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="type">
              <el-select v-model.trim="dataForm.type" clearable placeholder="请选择类型" @change="(e) => searchHandle(e, 'category')">
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
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'project_con_reward-punish_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
              <el-button v-permit="'project_con_reward-punish_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
            </div>
          </el-form>
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
              prop="newProcessType"
              header-align="center"
              align="center"
              width="140"
              label="奖惩类型"
            />
            <el-table-column
              prop="amount"
              header-align="center"
              align="center"
              width="140"
              label="金额/积分"
            />
            <el-table-column
              prop="categoryName"
              header-align="center"
              align="center"
              width="140"
              label="奖惩类别"
            />
            <el-table-column
              prop="levelsName"
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
              v-if="basePermit('project_con_reward-punish_btn_update') || basePermit('project_con_reward-punish_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              width="100"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'project_con_reward-punish_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
                <el-button v-permit="'project_con_reward-punish_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import { parseTime } from '@/utils/index'
import AddOrUpdate from './con-reward-punish-add-or-update'
import MixinItem from '@/components/mixin'
import { getList, del } from '@/api/project/con-reward-punish'
export default {
  components: {
    AddOrUpdate
  },
  mixins: [MixinItem],
  data() {
    return {
      dataForm: {
        type: '',
        projectName: '',
        constructionName: ''
      },
      dataList: [],
      dataListSelections: [],
      selectList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
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
          item.newType = item.type === 1 ? '奖励' : '惩罚'
          item.newProcessType = item.type === 1 ? '金额' : '积分'
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          return item
        })
        this.totalPage = data.result.total
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
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
      this.getDataList()
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
