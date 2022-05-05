<template>
  <el-dialog
    custom-class="construction-modal"
    title="工人库详情"
    :close-on-click-modal="true"
    :visible.sync="visible"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="人员基本信息" class="base-wrap" name="base">
        <el-form ref="dataForm" :model="dataForm" label-width="100px">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="人员姓名" prop="empName">
                <span>{{ dataForm.empName }}</span>
              </el-form-item>
              <el-form-item label="人员工号" prop="jobNo">
                <span>{{ dataForm.jobNo }}</span>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCode">
                <span>{{ dataForm.idCode }}</span>
              </el-form-item>
              <el-form-item label="从事工种" prop="jobName">
                <span>{{ dataForm.jobName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="img-wrap">
                <div class="right" style="margin-right:100px">
                  <img
                    style="width:100%;height:100%"
                    :src="dataForm.empNaticeplace | http2HttpsFilter"
                    alt=""
                  >
                </div>
                <div class="right">
                  <img
                    style="width:100%;height:100%"
                    :src="dataForm.faceUrl | http2HttpsFilter"
                    alt=""
                  >
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="人员姓名" prop="empName">
                <span>{{ dataForm.empName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人员工号" prop="jobNo">
                <span>{{ dataForm.jobNo }}</span>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="是否为组长" prop="isTeam">
                <span>{{ dataForm.isTeam ? '是' : '否' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="empPhon">
                <span>{{ dataForm.empPhon }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="性别" prop="empSex">
                <span>{{ dataForm.empSex }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签发机关" prop="idAgency">
                <span>{{ dataForm.idAgency }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="身份证有效期" prop="idValiddate">
                <span>{{ dataForm.idValiddate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期" prop="dateOfBirth">
                <span>{{ dataForm.dateOfBirth }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="身份证地址" prop="idAddress">
                <span>{{ dataForm.idAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="籍贯" prop="nativePlace">
                <span>{{ dataForm.nativePlace }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="婚姻状况" prop="isMarry">
                <span>{{ dataForm.isMarry ? '是' : '否' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="政治面貌" prop="politicalOutlook">
                <span>{{ dataForm.politicalOutlook }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="是否加入工会" prop="isLabunion">
                <span>{{ dataForm.isLabunion ? '是' : '否' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历" prop="education">
                <span>{{ dataForm.education }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="获得证书" prop="credential">
                <span>{{ dataForm.credential }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族" prop="empNation">
                <span>{{ dataForm.empNation }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="账户类型" prop="accountType">
                <span>{{ dataForm.accountType }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户行" prop="empBankname">
                <span>{{ dataForm.empBankname }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="银行账号" prop="empCardnum">
                <span>{{ dataForm.empCardnum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户地址" prop="accountAddress">
                <span>{{ dataForm.accountAddress }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <!-- <el-col :span="12">
              <el-form-item label="安全教育培训" prop="isTrain">
                <span>{{ dataForm.isTrain }}</span>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="电子邮件" prop="email">
                <span>{{ dataForm.email }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="remark">
            <span>{{ dataForm.remark }}</span>
          </el-form-item>
          <div class="idCode-wrap">
            <div class="front">
              <img v-if="dataForm.idphotoScan" style="width:100%;height:100%" :src="dataForm.idphotoScan | http2HttpsFilter" alt="">
              <div v-else class="defualt">身份证正面照片</div>
            </div>
            <div class="back">
              <img
                v-if="dataForm.idphotoScan2"
                style="width:100%;height:100%"
                :src="dataForm.idphotoScan2 | http2HttpsFilter"
                alt=""
              >
              <div v-else class="defualt">身份证反面照片</div>
            </div>
          </div>
          <div class="idCode-wrap">
            <div class="back">
              <img
                v-if="dataForm.bankCardUrl"
                style="width:100%;height:100%"
                :src="dataForm.bankCardUrl | http2HttpsFilter"
                alt=""
              >
              <div v-else class="defualt">银行卡照片</div>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="劳动合同附件" name="second">
        <el-table
          stripe
          :data="proList"
          style="width: 100%"
        >
          <el-table-column
            prop="projectName"
            label="项目名称"
          />
          <el-table-column
            prop="contract"
            label="附件"
          >
            <template slot-scope="scope">
              <a v-if="scope.row.contract" style="color: rgb(24, 144, 255)" target="_blank" :href="scope.row.contract">劳动合同附件</a>
              <el-button v-else type="text" :disabled="true" size="small">劳动合同附件</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="进退场及附件" name="进退场及附件">
        <el-table
          :data="proList"
          style="width: 100%"
        >
          <el-table-column
            prop="projectName"
            label="项目名称"
          />
          <el-table-column
            prop="entrance"
            label="进场附件"
          >
            <template slot-scope="scope">
              <a v-if="scope.row.entrance" style="color: rgb(24, 144, 255)" target="_blank" :href="scope.row.entrance">进场附件</a>
              <el-button v-else type="text" :disabled="true" size="small">进场附件</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="exeunt"
            label="退场附件"
          >
            <template slot-scope="scope">
              <a v-if="scope.row.exeunt" style="color: rgb(24, 144, 255)" target="_blank" :href="scope.row.exeunt">退场附件</a>
              <el-button v-else type="text" :disabled="true" size="small">退场附件</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="个人证书信息" name="个人证书信息">
        <el-table
          stripe
          :data="certificateList"
          style="width: 100%"
        >
          <el-table-column
            prop="cerTypeTitle"
            label="证书类型"
          />
          <el-table-column
            prop="cerName"
            label="	证书名称"
          />
          <el-table-column
            prop="cerId"
            label="证书编号"
          />
          <el-table-column
            prop="starTime"
            label="	有效期"
          >
            <template slot-scope="scope">
              {{ scope.row.startDate }}至{{ scope.row.endDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="cerLevelTitle"
            label="	证书等级"
          />
          <el-table-column
            prop="url"
            label="附件"
          >
            <template slot-scope="scope">
              <a style="color: rgb(24, 144, 255)" :disabled="!!scope.row.url" target="_blank" :href="scope.row.url">附件</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="不良记录" name="badrecord">
        <el-table
          stripe
          :data="badList"
          style="width: 100%"
        >
          <el-table-column
            prop="empName"
            label="姓名"
          />
          <el-table-column
            prop="empCode"
            label="身份证号码"
          />
          <el-table-column
            prop="eventName"
            label="事件类别"
          />
          <el-table-column
            prop="cause"
            label="	不良纪录内容"
          />
          <!-- <el-table-column
            prop="startTime"
            label="	生效日期"
          />
          <el-table-column
            prop="endTime"
            label="	失效日期"
          /> -->
          <el-table-column
            prop="createTime"
            label="录入时间"
          />
          <el-table-column
            prop="remark"
            label="备注"
          />
          <el-table-column
            prop="url"
            label="附件"
          >
            <template slot-scope="scope">
              <a style="color: rgb(24, 144, 255)" :disabled="!!scope.row.url" target="_blank" :href="scope.row.url">附件</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="所参与的项目" name="所参与的项目">
        <el-table
          stripe
          :data="proList"
          style="width: 100%"
        >
          <el-table-column
            prop="projectName"
            label="项目名称"
          />
          <el-table-column
            prop="constructionName"
            label="	参建单位"
          />
          <el-table-column
            prop="teamName"
            label="班组名称"
          />
          <el-table-column
            prop="jobName"
            label="	工种"
          />
          <el-table-column
            prop="startTime"
            label="	入场时间"
          />
          <el-table-column
            prop="endTime"
            label="	退场时间"
          />
          <!-- <el-table-column
            prop="address"
            label="	工资明细"
          /> -->
          <!-- <el-table-column
            prop="address"
            label="出勤明细"
          /> -->
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="奖惩记录" name="奖惩记录">
        <el-table
          stripe
          :data="rewardPunishList"
          style="width: 100%"
        >
          <el-table-column
            prop="type"
            label="类别"
          />
          <el-table-column
            prop="projectName"
            label="所属项目"
          />
          <el-table-column
            prop="amount"
            label="奖惩金额"
          />
          <el-table-column
            prop="categoryName"
            label="	奖惩类别"
          />
          <el-table-column
            prop="levelName"
            label="	奖惩级别"
          />
          <el-table-column
            prop="createTime"
            label="	时间"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { detail, badRecords, certificate, proListByWorkerId, getRewardPunish } from '@/api/workersLib'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      proId: '',
      tableData: [],
      badList: [],
      rewardPunishList: [],
      proList: [],
      certificateList: [],
      activeName: 'base',
      dataForm: {}
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.id = row.id
      this.visible = true
      this.getBadRecords(row.id)
      this.getRewardPunish(row.id)
      this.certificate(row.id)
      this.proListByWorkerId(row.id)
      detail({ id: this.id }).then(data => {
        this.dataForm = data.result
      })
    },
    getBadRecords(id) {
      badRecords({ id }).then(data => {
        this.badList = data.result.map(item => {
          item.startTime = item.startTime ? parseTime(item.startTime, '{y}-{m}-{d}') : ''
          item.endTime = item.endTime ? parseTime(item.endTime, '{y}-{m}-{d}') : ''
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
          return item
        })
      })
    },
    getRewardPunish(id) {
      getRewardPunish({ id }).then(data => {
        this.rewardPunishList = data.result.map(item => {
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
          item.type = item.type === 1 ? '奖励' : '惩罚'
          return item
        })
      })
    },
    certificate(id) {
      certificate({ id }).then(data => {
        this.certificateList = data.result
      })
    },
    proListByWorkerId(id) {
      proListByWorkerId({ id }).then(data => {
        this.proList = data.result.map(item => {
          item.startTime = item.startTime ? parseTime(item.startTime, '{y}-{m}-{d}') : ''
          item.endTime = item.endTime ? parseTime(item.endTime, '{y}-{m}-{d}') : ''
          return item
        })
      })
    }
  }
}
</script>
<style lang="scss">
  .construction-modal {
    width: 1000px;
    .img-wrap {
      margin: 0 0 0 20px;
      display: flex;
      .right {
        width: 160px;
        height: 180px;
        border: 1px solid #c3c3c3;
      }
    }
    .idCode-wrap {
      display: flex;
      height: 250px;
      .defualt {
        width:100%;
        height:100%;
        line-height: 200px;
        background:#f5f7fa
      }
      .front {
        width: 320px;
        height: 200px;
        margin: 0 40px 20px 0;
        text-align: center;
      }
      .back {
        width: 320px;
        height: 200px;
        text-align: center;
      }
      .upload-btn {
        margin-top: 10px;
      }
    }
    .bank-wrap {
      display: flex;
      .img {
        width: 320px;
        height: 200px;
      }
    }
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
      .base-wrap {
        .el-form-item{
          border: 1px solid #c1c4cc;
        }
        .el-form-item__label {
          border-right: 1px solid #c1c4cc;
          // height: 40px;
        }
        .el-form-item__content {
          // margin-left: 99px !important;
          // border: 1px solid #c1c4cc;
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
