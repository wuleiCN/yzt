<template>
  <div class="safety-page">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="title">
              <el-input v-model="dataForm.title" clearable placeholder="标题" />
            </el-form-item>
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
            </el-form-item>
            <el-form-item prop="constructionName">
              <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位" />
            </el-form-item>
            <el-form-item prop="problemLevel">
              <el-select v-model.trim="dataForm.problemLevel" clearable style="width:100%" placeholder="问题级别" @change="(e) => selectChangeHandle(e, 'problemLevel')">
                <el-option label="轻微" :value="0"> 轻微 </el-option>
                <el-option label="一般" :value="1"> 一般 </el-option>
                <el-option label="严重" :value="2"> 严重 </el-option>
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
            <el-form-item prop="status">
              <el-select v-model.trim="dataForm.status" clearable style="width:100%" placeholder="状态" @change="(e) => selectChangeHandle(e, 'status')">
                <el-option label="待整改" :value="0"> 待整改 </el-option>
                <el-option label="待复查" :value="1"> 待复查 </el-option>
                <el-option label="已完成" :value="2"> 已完成 </el-option>
                <el-option label="异常" :value="3"> 异常 </el-option>
              </el-select>
            </el-form-item>
            <div>
              <el-form-item>
                <el-button type="primary" @click="searchHandle()">查询</el-button>
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
          >
            <el-table-column
              prop="title"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="标题"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="项目名称"
            />
            <el-table-column
              prop="constructionName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="参建单位"
            />
            <el-table-column
              prop="problem"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="问题描述"
            />
            <el-table-column
              prop="problemLevel"
              header-align="center"
              align="center"
              label="问题级别"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.problemLevel === 0" style="color:#fff;background: #479BFF">轻微</el-tag>
                <el-tag v-if="scope.row.problemLevel === 1" style="color:#fff;background: #F59A23">一般</el-tag>
                <el-tag v-if="scope.row.problemLevel === 2" style="color:#fff;background: #D9001B">严重</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="rectificationRequirements"
              header-align="center"
              align="center"
              label="整改要求"
            />
            <el-table-column
              prop="scenePho"
              header-align="center"
              align="center"
              label="现场照片"
            >
              <template slot-scope="scope">
                <div @click="handleClickImg(scope.row)">
                  <el-avatar
                    icon="el-icon-picture"
                    :size="30"
                    :src="scope.row.scenePho && scope.row.scenePho.split(',').length ? (scope.row.scenePho.split(',')[0] ) : ''"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="hiddenDanger"
              header-align="center"
              align="center"
              label="问题类别"
            />
            <el-table-column
              prop="lastDate"
              header-align="center"
              align="center"
              width="110"
              label="最后整改期限"
            />
            <el-table-column
              prop="status"
              header-align="center"
              align="center"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" style="color:#fff;background: #D9001B">待整改</el-tag>
                <el-tag v-if="scope.row.status === 1" style="color:#fff;background: #409EFF">待复查</el-tag>
                <el-tag v-if="scope.row.status === 2" style="color:#fff;background: #67C23A">已完成</el-tag>
                <el-tag v-if="scope.row.status === 3" style="color:#fff;background: #E6A23C">异常</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              header-align="center"
              align="center"
              width="160"
              label="创建时间"
            />
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="100"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'quality_view'" type="text" size="small" @click="showDatalModal(scope.row)">查看进度</el-button>
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
          <record-modal v-if="recordModalVisible" ref="recordModal" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { getList } from '@/api/quality'
import RecordModal from './quality-record-detail'
import { parseTime } from '@/utils'
export default {
  components: {
    RecordModal
  },
  data() {
    return {
      recordModalVisible: false,
      dataForm: {
        title: '',
        projectName: '',
        constructionName: '',
        problemLevel: '',
        startDate: '',
        endDate: '',
        status: ''
      },
      dialogVisible: false,
      row: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  created() {
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
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
          this.totalPage = data.result.total
          this.dataListLoading = false
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
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
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
    searchHandle() {
      this.pageIndex = 1
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
