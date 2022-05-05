<template>
  <div class="pre-education-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="列表管理" name="first">
        <el-form :inline="true" :model="dataForm">
          <el-form-item prop="projectName">
            <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
          </el-form-item>
          <el-form-item prop="type">
            <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="时间范围" @change="(e) => selectChangeHandle(e, 'type')">
              <el-option label="最近一周" :value="1"> 最近一周 </el-option>
              <el-option label="近一个月" :value="2"> 近一个月 </el-option>
              <el-option label="近三个月" :value="3"> 近三个月 </el-option>
              <el-option label="自定义" :value="4"> 自定义 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="dataForm.type === 4" prop="timeRange">
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
              <a v-permit="'in_record_btn_export'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
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
            prop="projectName"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            label="项目名称"
          >
            <template slot-scope="scope">
              <el-button v-permit="'pre-education_view'" style="font-size:14px" type="text" @click="showDatalModal(scope.row)">{{ scope.row.projectName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="teamName"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            label="班组名称"
          />
          <el-table-column
            prop="lecturer"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            label="主讲人"
          />
          <el-table-column
            prop="topicName"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            label="教育主题"
          />

          <el-table-column
            prop="trainDate"
            header-align="center"
            align="center"
            width="180"
            label="会议时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.trainDate }} ({{ scope.row.startTime }}-{{ scope.row.endTime }})</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            label="备注"
          />
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            width="160"
            label="创建时间"
          />
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
      </el-tab-pane>
      <el-tab-pane label="签到记录" name="second">
        <el-select v-model="id" filterable style="width:300px" placeholder="请选择项目" @change="changeHandle">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
        <el-card class="main-card" shadow="never">
          <h3>签到记录：</h3>
          <div class="main">
            <el-row>
              <el-col v-for="(item) in statiList" :key="item.id" class="main-item" :span="12">
                <div class="main-item-style">
                  <el-row>
                    <el-col class="main-item-style-title title" :span="7"><span :title="item.teamName"> 所属班组：{{ item.teamName }}</span></el-col>
                    <el-col class="main-item-style-title title1" :span="12"><span :title="item.topicName">教育主题：{{ item.topicName || '无' }}</span></el-col>
                    <el-col class="main-item-style-title" :span="5"><span>主讲人：{{ item.lecturer || '无' }}</span></el-col>
                  </el-row>
                  <div class="main-item-group-num">
                    <el-row>
                      <el-col :span="6"><span>班组人数: <span style="font-weight: 600">{{ item.teamNum }}</span>人</span></el-col>
                      <el-col :span="6"><span>预出勤人数: <span style="font-weight: 600">{{ item.ycqNum }}</span>人</span></el-col>
                      <el-col :span="6"><span>实际出勤人数: <span style="font-weight: 600">{{ item.sjNum }}</span>人</span></el-col>
                      <el-col :span="6"><span :class="item.sklv < 50 ? 'sklv-red' : 'sklv-green'">签到率：<span style="font-weight: 600">{{ item.cqLv }}%</span></span></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹窗, 新增 / 修改 -->
    <record-modal v-if="recordModalVisible" ref="recordModal" />

  </div>
</template>

<script>
import { proOptionList } from '@/api/salary/data'
import { getList, statistical } from '@/api/preWorkEducation'
import RecordModal from './pre-education-detail'
import { parseTime } from '@/utils'
export default {
  components: {
    RecordModal
  },
  data() {
    const { token } = this.$store.state.user.loginInfo
    return {
      activeName: 'first',
      recordModalVisible: false,
      dataForm: {
        projectName: '',
        searchStart: '',
        searchEnd: '',
        type: ''
      },
      loginInfo: this.$store.state.user.loginInfo,
      exportUrl: `/preWorkEducation/export?token=${token}`,
      dataList: [],
      statiList: [],
      proList: [],
      id: '',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  created() {
    this.getDataList()
    this.getProOptionList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      const { token } = this.loginInfo
      this.exportUrl = `/preWorkEducation/export?token=${token}`
      for (const key in this.dataForm) {
        const element = this.dataForm[key]
        if (element || element === 0) {
          this.exportUrl += `&${key}=${this.dataForm[key]}`
        }
      }
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
    // 签单列表
    getStatiList(id) {
      statistical({ id }).then((data) => {
        if (data.code === 1000) {
          this.statiList = data.result
        }
      })
    },
    changeHandle(id) {
      this.getStatiList(id)
    },
    getProOptionList() {
      return new Promise(resolve => {
        proOptionList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.searchStart = val && val.length ? val[0] : ''
        this.dataForm.searchEnd = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
      this.getDataList()
    },
    // 显示详情弹窗
    showDatalModal(row) {
      this.recordModalVisible = true
      this.$nextTick(() => {
        this.$refs.recordModal.init(row.id)
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
.pre-education-page {
  .el-row {
    line-height: 40px;
  }
  .main-card {
    margin-top: 20px;
    .sklv-green {
      color: green;
    }
    .sklv-red {
      color: red;
    }
    .main-item-style {
      border-top: 1px solid #e6ebf5;
      margin: 0 10px;
      padding: 0 20px;
      background: #FAFAFA;
      margin-bottom: 5px;
      border-bottom: 1px solid #e6ebf5;
      .main-item-style-title {
        color: #666;
      }
      .title,.title1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .main-item-group-num {
        font-size: 14px;
      }
    }
  }
}

</style>

