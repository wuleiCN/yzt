<template>
  <div class="safety-page">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="searchHandle()">
            <el-form-item prop="title">
              <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
            </el-form-item>
            <el-form-item prop="type">
              <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="危大工程类别" @change="(e) => selectChangeHandle(e, 'type')">
                <el-option v-for="(v, i) in categoryList" :key="i" :label="v.title" :value="v.id">{{ v.title }}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="isOversized">
              <el-select v-model.trim="dataForm.isOversized" clearable style="width:100%" placeholder="是否超规模" @change="(e) => selectChangeHandle(e, 'isOversized')">
                <el-option label="超大" :value="0"> 超大 </el-option>
                <el-option label="一般" :value="1"> 一般 </el-option>
                <el-option label="非危大工程" :value="2"> 非危大工程 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="riskLevel">
              <el-select v-model.trim="dataForm.riskLevel" clearable style="width:100%" placeholder="风险等级" @change="(e) => selectChangeHandle(e, 'riskLevel')">
                <el-option label="A" :value="0"> A </el-option>
                <el-option label="B" :value="1"> B </el-option>
                <el-option label="C" :value="2"> C </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="status">
              <el-select v-model.trim="dataForm.status" clearable style="width:100%" placeholder="当前状态" @change="(e) => selectChangeHandle(e, 'status')">
                <el-option label="实施中" :value="0"> 实施中 </el-option>
                <el-option label="未实施" :value="1"> 未实施 </el-option>
                <el-option label="已结束" :value="2"> 已结束 </el-option>
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
            <div>
              <el-form-item>
                <el-button type="primary" @click="searchHandle()">查询</el-button>
                <el-button type="primary" :disabled="userType !== 2" @click="showDatalModal({})">新增</el-button>
                <el-button v-permit="'dangerouslargeproject_del'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
                <a v-permit="'dangerouslargeproject_export'" target="_blank" :href="$http.baseUrl(exportUrl)" style="margin-left: 10px;"><el-button type="primary">导出</el-button></a>
              </el-form-item>
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
              prop="name"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="危大工程名称"
            />
            <el-table-column
              prop="isOversized"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="是否超规模"
            >
              <template slot-scope="scope">
                {{ oversizedList[scope.row.isOversized] }}
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="危大工程类别"
            >
              <template slot-scope="scope">
                {{ scope.row.type }}
              </template>
            </el-table-column>
            <el-table-column
              prop="riskLevel"
              header-align="center"
              align="center"
              label="风险等级"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.riskLevel === 2" style="color:#fff;background: #479BFF">C</el-tag>
                <el-tag v-if="scope.row.riskLevel === 1" style="color:#fff;background: #F59A23">B</el-tag>
                <el-tag v-if="scope.row.riskLevel === 0" style="color:#fff;background: #D9001B">A</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              header-align="center"
              align="center"
              label="当前状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 2" style="color:#fff;background: #D9001B">已结束</el-tag>
                <el-tag v-if="scope.row.status === 1" style="color:#fff;background: #909399">未实施</el-tag>
                <el-tag v-if="scope.row.status === 0" style="color:#fff;background: #67C23A">实施中</el-tag>
                <!-- <el-tag v-if="scope.row.status === 3" style="color:#fff;background: #E6A23C">异常</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="updatedDate"
              header-align="center"
              align="center"
              width="160"
              label="更新时间"
            />
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="100"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'dangerouslargeproject_detail'" type="text" size="small" @click="showDatalModal(scope.row)">查看</el-button>
                <el-button v-permit="'dangerouslargeproject_del'" type="text" size="small" style="color:#D9001B;" @click="deleteHandle(scope.row.id)">删除</el-button>
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
            title="现场照片"
            custom-class="safety-avatar"
            append-to-body
            onselectstart="return false;"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
          >
            <div class="img-wrap">
              <div v-for="(item,index) in row.scenePho && row.scenePho.split(',')" :key="index">
                <h1>现场照片 {{ index+ 1 }}</h1>
                <img
                  style="width: 100%;height:600px"
                  :src="item | http2HttpsFilter"
                  alt=""
                >
              </div>

            </div>

            <!-- </div> -->
          </el-dialog>
          <!-- 弹窗, 新增 / 修改 -->
          <project-modal v-if="ProjectModalVisible" ref="recordModal" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { getList, deleteProject } from '@/api/dangerous'
import { optionList } from '@/api/dictionaries'
import ProjectModal from './dangerous-project-detail'
import { parseTime } from '@/utils/index'
// import { parseTime } from '@/utils'
export default {
  components: {
    ProjectModal
  },
  data() {
    return {
      ProjectModalVisible: false,
      dataForm: {
        projectName: '',
        type: null,
        isOversized: '',
        riskLevel: '',
        timeRange: '',
        status: ''
      },
      dialogVisible: false,
      row: {},
      dataList: [],
      dataListSelections: [],
      categoryList: [],
      worketype: [],
      oversizedList: ['超大', '一般', '非危大工程'],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      exportUrl: '',
      token: JSON.parse(sessionStorage.getItem('result')).token,
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      dataListLoading: false
    }
  },
  mounted() {
    this.getOptionList()
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
        if (data.code === 1000) {
          this.dataList = data.result.list.map(item => {
            item.updatedDate = item.updatedDate
              ? parseTime(item.updatedDate, '{y}-{m}-{d} {h}:{i}:{s}')
              : ''
            return item
          })
          this.totalPage = data.result.total
          this.dataListLoading = false
          this.exportUrl = `/dangerousLargeProject/export?token=${this.token}&page=${this.pageIndex}&rows=9999`
        }
      })
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
      this.getDataList()
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    // 显示详情弹窗
    showDatalModal(row) {
      this.ProjectModalVisible = true
      this.$nextTick(() => {
        this.$refs.recordModal.init(row)
      })
    },
    // 双击table
    rowDblclick(row) {
      this.showDatalModal(row)
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
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
          return item.id
        })
      this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProject(ids).then(data => {
            if (data.code === 1000) {
              this.getDataList()
              this.$message.success('删除成功！')
            } else {
              this.$message.error(data.message)
            }
          })
        })
        .catch(() => {})
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    getOptionList() {
      optionList({ category: 'DANGEROUS_PROJECT' }).then(data => {
        if (data.code === 1000 && data.result) this.categoryList = data.result
      })
      // optionList({ category: 'DANGEROUS_PROJECT_WORKER_TYPE' }).then(data => {
      //   if (data.code === 1000 && data.result) this.worketype = data.result
      //   console.log(this.worketype)
      // })28
    }
  }
}
</script>

<style lang="scss">
  // .safety-page {
  // }
  .safety-avatar {
    // margin-top: 15vh !important;
    .img-wrap {
      height: 600px;
      overflow-y: auto;
    }
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
