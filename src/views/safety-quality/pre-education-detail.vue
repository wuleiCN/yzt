<template>
  <div>
    <el-dialog
      custom-class="pre-education-detail"
      title="班前教育-详情"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-descriptions class="margin-top" title="会议信息" size="medium" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            主讲人
          </template>
          {{ dataForm.lecturer }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            会议时间
          </template>
          {{ dataForm.trainDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            教育主题
          </template>
          {{ dataForm.topicName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            教育地点
          </template>
          {{ dataForm.address }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            班组
          </template>
          {{ dataForm.teamName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            一般劳务人数
          </template>
          {{ dataForm.labourNum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            特种作业人数
          </template>
          {{ dataForm.specialNum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            附件
          </template>
          <span v-for="(ele) in dataForm.attachedFile" :key="ele.url" style="margin-right: 5px">
            <video v-if="ele.type === 'video'" preload="auto" style="width:30px;height: 30px" class="video-verify" :src="ele.url" @click="viewHandle(ele)" />
            <img v-if="ele.type === 'img'" style="width:30px;height: 30px" :src="ele.url" alt="" @click="viewHandle(ele)">
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <h3>签到人员名单 <a v-permit="'in_record_btn_export'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a></h3>

      <div>
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
            :show-overflow-tooltip="true"
            label="班组名称"
          />
          <el-table-column
            prop="jobNameTitle"
            header-align="center"
            align="center"
            label="工种"
          />
          <el-table-column
            prop="empName"
            header-align="center"
            align="center"
            width="100px"
            label="姓名"
          />

          <el-table-column
            prop="idCode"
            header-align="center"
            align="center"
            label="身份证号"
          />
          <el-table-column
            prop="passedTime"
            header-align="center"
            align="center"
            width="160"
            label="签到时间"
          />
        </el-table>
        <div style="overflow: hidden;">
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
      </div>
    </el-dialog>
    <el-dialog
      title="附件详情"
      custom-class="pre-education-avatar"
      append-to-body
      onselectstart="return false;"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
    >
      <div>

        <div style="width:50%;height: 100%;margin: 0 auto">
          <video v-if="item.type === 'video'" preload="auto" style="width:100%;height: 100%" class="video-verify" controls :src="item.url" @click="viewHandle(item)" />
          <img v-if="item.type === 'img'" style="width:100%;height: 100%;" :src="item.url" alt="" @click="viewHandle(item)">
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { detail, signList } from '@/api/preWorkEducation'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      exportUrl: ``,
      dataListLoading: false,
      dialogVisible: false,
      id: '',
      dataForm: {},
      item: {},
      dataList: []
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.id = id
      const { token } = this.$store.state.user.loginInfo
      this.exportUrl = `/preWorkEducation/exportSignList?token=${token}&id=${this.id}`
      this.visible = true
      this.$nextTick(() => {
        this.detailHandle(this.id)
        this.getDataList(this.id)
      })
    },
    // 某人培训列表
    detailHandle(id) {
      detail({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.dataForm = data.result
        }
      })
    },
    // 获取数据列表
    getDataList(id) {
      signList({
        page: this.pageIndex,
        rows: this.pageSize,
        id
      }).then((data) => {
        if (data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.passedTime = item.passedTime ? parseTime(item.passedTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
          this.totalPage = data.result.total
          this.dataListLoading = false
        }
      })
    },
    viewHandle(item) {
      this.dialogVisible = true
      this.item = item
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
  .pre-education-detail {
    width: 1200px;
    .el-dialog__body {
      padding: 15px;
      padding-bottom: 20px;
    }
    .form-style {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
      }
    }
  }
  .pre-education-avatar {
    .el-dialog__body {
      padding: 10px;
    }
  }
</style>
