<template>
  <el-dialog
    custom-class="construction-modal"
    title="参建单位库详情"
    :close-on-click-modal="true"
    :visible.sync="visible"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="单位详情" class="unit-detail" name="first">
        <el-form ref="dataForm" :model="dataForm" label-width="129px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="企业名称：">
                <span>{{ dataForm.constructionName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业简称：">
                <span>{{ dataForm.shortName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="类型：">
                <span>{{ dataForm.typeStr }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="信用代码：">
                <span>{{ dataForm.suid }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="邮箱地址：">
                <span>{{ dataForm.email }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法定代表人：">
                <span>{{ dataForm.legalPerson }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="注册资本(万元)：">
                <span>{{ dataForm.capital }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成立日期：">
                <span>{{ dataForm.setUpDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系人：">
                <span>{{ dataForm.contacts }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码：">
                <span>{{ dataForm.mobilePhone }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>{{ dataForm.createDate ? parseTime(dataForm.createDate, '{y}-{m}-{d}') : '' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="修改时间：">
                <span>{{ dataForm.updateDate ? parseTime(dataForm.updateDate, '{y}-{m}-{d}') : '' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="营业地址：">
                <span>{{ dataForm.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否上传：">
                <span>{{ dataForm.isUpload == 1 ? '是' : '否' }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="备注：">
            <span>{{ dataForm.remark }}</span>
          </el-form-item>

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="项目经历" name="second">
        <el-select v-model="proId" style="width:100%" placeholder="请选择项目" @change="changehandle">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>

        </el-select>
        <el-table
          :data="tableData"
          stripe
          :show-header="false"
          style="width: 100%;"
        >
          <el-table-column
            prop="companyName"
            align="left"
          >
            <template slot-scope="scope">
              <div>进场日期：{{ scope.row.startingTime ? parseTime(scope.row.startingTime, '{y}-{m}-{d}') : '' }}</div>
              <div>退场日期：{{ scope.row.finishTime ? parseTime(scope.row.finishTime, '{y}-{m}-{d}') : '' }}</div>
              <div>项目名称：{{ scope.row.projectName }}</div>
              <div>项目类别：{{ scope.row.projectTypeName }}</div>
              <!-- <div>承包方：{{ scope.row.legalPerson }}</div> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="shortName"
            align="left"
          >
            <template slot-scope="scope">
              <div>工人人数：{{ scope.row.workersNum }}</div>
              <!-- <div>出入合计：0</div> -->
              <!-- <div>累计工人数量：{{ scope.row.mobilePhone }}</div> -->
              <div>累计工资：{{ '0.00' }}</div>
              <div>备注：{{ scope.row.remark }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="奖罚记录" name="获奖记录">
        <el-table
          :data="punishmentList"
          border
          stripe
          tooltip-effect="light"
          highlight-current-row
        >
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="资质信息" name="资质信息">
        <el-table
          :data="certificateList"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="qualificationTypeName"
            label="资质类型"
          />
          <el-table-column
            prop="qualificationName"
            label="	资质名称"
          />
          <el-table-column
            prop="qualificationId"
            label="资质编号"
          />
          <el-table-column
            prop="starTime"
            width="180"
            label="	有效期"
          >
            <template slot-scope="scope">
              {{ scope.row.startDate }}至{{ scope.row.endDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="qualificationLevelName"
            label="	资质等级"
          />
          <el-table-column
            prop="url"
            label="附件"
          >
            <template slot-scope="scope">
              <a v-if="scope.row.url" style="color: rgb(24, 144, 255)" target="_blank" :href="scope.row.url">附件预览</a>
              <el-button v-else type="text" :disabled="true" size="small">附件预览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { selectList, detail, punList } from '@/api/construction'
import { conQualList } from '@/api/project/unit'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      parseTime,
      visible: false,
      proId: '',
      certificateList: [],
      punishmentList: [],
      tableData: [],
      proList: [],
      activeName: 'first',
      dataForm: {}
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.id = row.id
      this.visible = true
      this.getSelectList()
      this.getDataList(row.suid)
      this.getPunishmentList(row.suid)
      detail({ id: this.id }).then(data => {
        this.dataForm = data.result
      })
    },
    changehandle(val) {
      this.tableData = this.proList.filter(item => item.id === val)
    },
    getDataList(suid) {
      conQualList({ suid }).then(data => {
        this.certificateList = data.result
      })
    },
    getPunishmentList(suid) {
      punList({ suid }).then(data => {
        this.punishmentList = data.result.map(item => {
          item.newType = item.type === 1 ? '奖励' : '惩罚'
          item.newProcessType = item.type === 1 ? '金额' : '积分'
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          return item
        })
      })
    },
    getSelectList() {
      selectList({ id: this.id }).then(data => {
        this.proList = data.result
        this.proId = data.result[0].id
        this.tableData = [data.result[0]]
      })
    }
  }
}
</script>
<style lang="scss">
  .construction-modal {
    width: 1000px;
    .el-tabs {
      height: 600px;
      overflow: auto;
      padding-right: 20px;
      .el-tabs__header {
        position: fixed;
        z-index: 999;
        width: 963px;
        background: #fff;
      }
      .el-tabs__content {
        margin-top: 50px;
      }
      .unit-detail {
        .el-form-item__label {
          border: 1px solid #c1c4cc;
        }
        .el-form-item__content {
          margin-left: 129px !important;
          border: 1px solid #c1c4cc;
          padding-left: 10px;
        }
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #c3c3c3;
      padding-bottom: 10px;
    }
    .el-dialog__body {
      padding: 0 0 0 20px;
    }
  }

</style>
