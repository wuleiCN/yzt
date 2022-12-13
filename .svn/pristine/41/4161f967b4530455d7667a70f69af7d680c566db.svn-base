<template>
  <div class="statistical-teamAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="planId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" clearable filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <!-- <div class="search-btn-style">
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </div> -->
      <div class="teamAtt-header" shadow="never">
        <el-row class="row-top" :gutter="30">
          <el-col :span="12">
            <div class="header-item">
              <div class="label-name"><svg-icon class="team" icon-class="team" /> <el-tag type="success" size="medium" effect="plain">班组</el-tag> </div>
              <div class="header-item-bottom">
                <el-row>
                  <el-col :span="6"><span>所有班组: <span style="font-weight: 600">{{ headerData.allTeamNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>在场班组: <span style="font-weight: 600">{{ headerData.zcTeamNum }}</span>个</span></el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="header-item">
              <div class="label-name"><svg-icon class="person" icon-class="person" /> <el-tag type="info" size="medium" effect="plain">所有人</el-tag></div>
              <div class="header-item-bottom">
                <el-row>
                  <el-col :span="6"><span>出入人数: <span style="font-weight: 600">{{ headerData.allCrNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>实时人数: <span style="font-weight: 600">{{ headerData.allSsNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>在场人数: <span style="font-weight: 600">{{ headerData.allZcNum }}</span>个</span></el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="header-item">
              <div class="label-name"><svg-icon class="unit" icon-class="unit" /> <el-tag type="danger" size="medium" effect="plain">管理人员</el-tag></div>
              <div class="header-item-bottom">
                <el-row>
                  <el-col :span="6"><span>出入人数: <span style="font-weight: 600">{{ headerData.managementCrNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>实时人数: <span style="font-weight: 600">{{ headerData.managementSsNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>在场人数: <span style="font-weight: 600">{{ headerData.managementZcNum }}</span>个</span></el-col>
                </el-row>
              </div>
            </div>

          </el-col>
          <el-col :span="12">
            <div class="header-item">
              <div class="label-name"><svg-icon class="worker" icon-class="worker" /> <el-tag type="warning" size="medium" effect="plain">劳务人员</el-tag></div>
              <div class="header-item-bottom">
                <el-row>
                  <el-col :span="6"><span>出入人数: <span style="font-weight: 600">{{ headerData.laborCrNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>实时人数: <span style="font-weight: 600">{{ headerData.laborSsNum }}</span>个</span></el-col>
                  <el-col :span="6"><span>在场人数: <span style="font-weight: 600">{{ headerData.laborZcNum }}</span>个</span></el-col>
                </el-row>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
      <el-card class="main-card" shadow="never">
        <h3>考勤记录：</h3>
        <div class="main">
          <el-row>
            <el-col v-for="(item, index) in dataList" :key="index" class="main-item" :span="12">
              <div class="main-item-style">
                <el-row>
                  <el-col class="main-item-style-title" :span="18"><span> 所属班组：{{ item.teamName }}</span></el-col>
                  <el-col class="main-item-style-title" :span="6"><span>班组长：{{ item.leader || '无' }}</span></el-col>
                </el-row>
                <div class="main-item-group-num">
                  <el-row>
                    <el-col :span="6"><span>出入人数: <span style="font-weight: 600">{{ item.crNum }}</span>个</span></el-col>
                    <el-col :span="6"><span>实时人数: <span style="font-weight: 600">{{ item.ssNum }}</span>个</span></el-col>
                    <el-col :span="6"><span>在场人数: <span style="font-weight: 600">{{ item.zcNum }}</span>个</span></el-col>
                    <el-col :span="6"><span :class="item.sklv < 50 ? 'sklv-red' : 'sklv-green'">刷卡率：<span style="font-weight: 600">{{ item.sklv }}%</span></span></el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

    </el-form>
  </div>
</template>

<script>
import { proOptionList } from '@/api/salary/data'
import { getList, teamAttendance } from '@/api/statistical/teamAtt'
export default {
  data() {
    return {
      dataForm: {
        projectId: ''
      },
      disabled: false,
      headerData: {},
      loginInfo: this.$store.state.user.loginInfo,
      proList: [],
      dataList: [],
      constructionList: [],
      dataListLoading: false
    }
  },
  async mounted() {
    await this.getProOptionList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      this.disabled = true
      this.getDataList()
      this.teamRecordList()
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      this.getDataList()
      this.teamRecordList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      getList({
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.headerData = data.result
        }
      })
    },
    teamRecordList() {
      this.dataListLoading = true
      teamAttendance({
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result
        }
        this.dataListLoading = false
      })
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
    // 查询
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      this.getDataList()
      this.teamRecordList()
    }
  }
}
</script>

<style lang="scss">
  .statistical-teamAtt {
    .teamAtt-header {
      .header-item {
        border: 1px solid #e6ebf5;
        padding: 5px 30px;
      }
      .header-item-bottom {
        font-size: 14px;
        padding-left: 20px;
      }
      .row-top {
        margin-bottom: 20px;
      }
    }
    .el-row {
      line-height: 40px;
    }
    .label-name {
      font-weight: 600;
      .svg-icon {
        font-size: 40px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .team {
        color: #13ce66;
      }
      .person {
        color: #909399;
      }
      .unit {
        color: #ff4949;
      }
      .worker {
        color: #ffba00;
      }
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
        .main-item-group-num {
          padding-left: 20px;
          font-size: 14px;
        }
      }
    }
  }
</style>
