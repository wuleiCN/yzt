<template>
  <div class="salary-print">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="planId">
        <el-select v-model="dataForm.planId" style="width:100%" placeholder="请选择薪资方案" @change="(e) => searchHandle(e, 'planId')">
          <el-option v-for="(item, index) in planList" :key="index" :label="item.name" :value="item.id">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="planId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" filterable style="width:100%" placeholder="请选择项目名称" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="constructionId">
        <el-select v-model.trim="dataForm.constructionId" :disabled="disabled1" style="width:100%" clearable placeholder="请选择参建单位" @change="(e) => searchHandle(e, 'constructionId')">
          <el-option v-for="(item, index) in constructionList" :key="index" :label="item.construction.constructionName" :value="item.id"> {{ item.construction.constructionName }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="month">
        <el-date-picker
          v-model="dataForm.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="(e) => searchHandle(e, 'month')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <a v-permit="'salary_print_btn_export'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
      </div>
    </el-form>
    <div v-html="head" />
  </div>
</template>

<script>
import { getConstructionList } from '@/api/sys/user'
import { getheadList, optionList, optionCaseList } from '@/api/salary/data'
import { getList } from '@/api/salary/print'
import { parseTime, add } from '@/utils'
export default {
  data() {
    return {
      exportUrl: '',
      dataForm: {
        planId: '',
        projectId: '',
        constructionId: '',
        constructionName: '',
        teamName: '',
        month: parseTime(new Date(), '{y}-{m}')
      },
      disabled: false,
      disabled1: false,
      loginInfo: this.$store.state.user.loginInfo,
      dataList: [],
      planList: [],
      proList: [],
      constructionList: [],
      headerList: [],
      head: '',
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async mounted() {
    await this.getProOptionList()
    await this.getOptionPlanList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      this.dataForm.projectId = this.proList.find(item => item.id === this.dataForm.projectId) ? this.dataForm.projectId : ''
      await this.getConstructionList()
      this.disabled = true
      this.disabled1 = true
      this.getDataList()
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      this.dataForm.projectId = this.proList.find(item => item.id === this.dataForm.projectId) ? this.dataForm.projectId : ''
      await this.getConstructionList()
      this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true

      getList({
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          const { token } = this.loginInfo
          if (this.dataForm.planId === 'b591673d1d7c4b49c034f1e4143209df') {
            this.exportUrl = `/salary/export?token=${token}`
          } else {
            this.exportUrl = `/salary/export2?token=${token}`
          }
          this.head = data.result.head
          this.dataList = data.result.list && data.result.list.length ? data.result.list : [{ M107: 0, M101: 0, M106: 0, M100: 0, M102: 0, M103: 0, M104: 0, M105: 0, M108: 0 }]
          setTimeout(() => {
            if (this.dataForm.planId === 'b591673d1d7c4b49c034f1e4143209df') {
              var str = `
                            <tr e="rh-{DeptNum}" class="tr_head">
                              <td rowspan="2" class="ex">序号</td>
                              <td rowspan="2">姓名</td>
                              <td rowspan="2">身份证号码</td>
                              <td rowspan="2">所属单位</td>
                              <td rowspan="2">班组</td>
                                <td rowspan="2">工种</td>
                              <td rowspan="2">入场日期</td>
                              <td rowspan="2">出勤天数</td>

                              <td colspan="2">工资情况</td>
                                <td rowspan="2">工人签名</td>
                          </tr>
                          <tr e="rh-{DeptNum}"  class="tr_head">
                              <td style="width:70px;">应发工资</td>
                              <td style="width:70px;">实发工资</td>
                          </tr>
                        `
              var M107 = 0
              var M106 = 0
              var M105 = 0
              for (let index = 0; index < this.dataList.length; index++) {
                const item = this.dataList[index]
                M107 = add(item.b1 || 0, M107)
                M106 = add(item.a100 || 0, M106)
                M105 = add(item.a101 || 0, M105)
                str += `
                            <tr e="rd-{DeptNum}">
                                <td style="height: 15px">${item.empName ? index + 1 : ''}</td>
                                <td>${item.empName || ''}</td>
                                <td>${item.idCode || ''}</td>
                                <td>${item.constructionName || ''}</td>
                                <td>${item.teamName || ''}</td>
                                <td>${item.title || ''}</td>
                                <td>${item.startTime || ''}</td>

                                <td>${item.b1 || ''}</td>
                                <td>${item.a100 || ''}</td>
                                <td>${item.a101 || ''}</td>

                                <td></td>
                            </tr>
                          `
              }
              str += `
                          <tr class="total-row">
                              <td>合计</td>
                              <td id="Count" colspan="6">共${this.dataList.length === 1 && !this.dataList[0].empName ? 0 : this.dataList.length}人</td>

                              <td id="M107">${M107}</td>
                              <td id="M106">${M106}</td>
                              <td id="M105">${M105}</td>
                              <td>&nbsp;</td>
                          </tr>
                        `
              document.getElementById('table_list').innerHTML = str
              document.getElementById('td_ymd').innerHTML = `制表日期:${parseTime(new Date(), '{y}-{m}-{d}')}`
              document.getElementById('td_ym').innerHTML = `${this.dataForm.month}工资表 `
              document.getElementById('td_project').innerHTML = `项目:${this.proList.filter(item => item.id === this.dataForm.projectId)[0].projectName}`
            } else if (this.dataForm.planId === 'fbfdf02b36e5503fda3a2fd2d3ef6c46') {
              var str1 = `
                      <tr e="rh-{DeptNum}" class="tr_head">
                            <td  class="ex" rowSpan="2" style="width:70px;">序号</td>
                            <td  rowSpan="2" style="width:70px;">姓名</td>
                            <td  rowSpan="2" style="width:130px;">工种</td>
                            <td  rowSpan="2" style="width:80px;">出勤工日</td>
                            <td  rowSpan="2" style="width:80px;">日工资</td>
                             <td  rowSpan="2" style="width:80px;">工资总额</td>
                            
                            <td  colSpan="5">支出</td>
                             <td  rowSpan="2" style="width:80px;">未支付数</td>
                             <td  rowSpan="2" style="width:100px;">领款人签字</td>
                             <td  rowSpan="2" style="width:100px;">备注</td>
                        </tr>
                     <tr e="rh-{DeptNum}" class="tr_head">
                             <td  style="width:80px;">生活费</td>
                             <td  style="width:80px;">预支费</td>
                             <td  style="width:80px;">罚款</td>
                             <td  style="width:80px;">其他</td>
                             <td  style="width:80px;">本月实际支付</td>
                        </tr>
                        `
              let M107 = 0
              let M101 = 0
              let M106 = 0
              let M100 = 0
              let M102 = 0
              let M103 = 0
              let M104 = 0
              let M105 = 0
              let M108 = 0
              for (let index = 0; index < this.dataList.length; index++) {
                const item = this.dataList[index]
                // M107 += item.b1 ? (item.b1 * 100) / 100 : ''
                // M101 += item.b2 ? (item.b2 * 100) / 100 : ''
                // M106 += item.a100 ? (item.a100 * 100) / 100 : ''
                // M100 += item.a1 ? (item.a1 * 100) / 100 : ''
                // M102 += item.a3 ? (item.a3 * 100) / 100 : ''
                // M103 += item.a4 ? (item.a4 * 100) / 100 : ''
                // M104 += item.b7 ? (item.b7 * 100) / 100 : ''
                // M105 += item.a101 ? (item.a101 * 100) / 100 : ''
                // M108 += item.a102 ? (item.a102 * 100) / 100 : ''

                M107 = add(item.b1 || 0, M107)
                M101 = add(item.b2 || 0, M101)
                M106 = add(item.a100 || 0, M106)
                M100 = add(item.a1 || 0, M100)
                M102 = add(item.a3 || 0, M102)
                M103 = add(item.a4 || 0, M103)
                M104 = add(item.b7 || 0, M104)
                M105 = add(item.a101 || 0, M105)
                M108 = add(item.a102 || 0, M108)
                str1 += `
                            <tr e="rd-{DeptNum}">
                                <td style="height: 15px">${item.empName ? index + 1 : ''}</td>
                                <td>${item.empName || ''}</td>
                                <td>${item.title || ''}</td>
                                <td>${item.b1 || ''}</td>
                                <td>${item.b2 || ''}</td>
                                <td>${item.a100 || ''}</td>
                                <td>${item.a1 || ''}</td>
                                <td>${item.a3 || ''}</td>
                                <td>${item.a4 || ''}</td>
                                <td>${item.b7 || ''}</td>
                                <td>${item.a101 || ''}</td>
                                <td>${item.a102 || ''}</td>

                                <td></td>
                                <td></td>
                            </tr>
                          `
              }
              str1 += `
                          <tr class="total-row">
                            <td>合计</td>
                            <td id="Count" colspan="2">共${this.dataList.length === 1 && !this.dataList[0].empName ? 0 : this.dataList.length}人</td>
                            <td id="M107">${M107}</td>
                            <td id="M101">${M101}</td>
                            <td id="M106">${M106}</td>
                            <td id="M100">${M100}</td>
                            <td id="M102">${M102}</td>
                            <td id="M103">${M103}</td>
                            <td id="M104">${M104}</td>
                            <td id="M105">${M105}</td>
                            <td id="M108">${M108}</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                        `
              document.getElementById('table_list').innerHTML = str1
              document.getElementById('td_ymd').innerHTML = `制表日期:${parseTime(new Date(), '{y}-{m}-{d}')}`
              document.getElementById('td_ym').innerHTML = `${this.dataForm.month}工资表 `
              document.getElementById('td_project').innerHTML = `项目:${this.proList.filter(item => item.id === this.dataForm.projectId)[0].projectName}`
            }
          }, 100)
          for (const key in this.dataForm) {
            if (this.dataForm.hasOwnProperty(key)) {
              const element = this.dataForm[key]
              if (element || element === 0) {
                this.exportUrl += `&${key}=${this.dataForm[key]}`
              }
            }
          }
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
    // 获取参建单位下拉列表
    getConstructionList() {
      return new Promise(resolve => {
        getConstructionList({ id: this.dataForm.projectId }).then(data => {
          this.constructionList = data.result
          this.dataForm.constructionId = this.loginInfo.constructionId
          resolve(this.constructionList)
        })
      })
    },
    getHeadList(planId) {
      getheadList({ planId }).then((data) => {
        this.headerList = data.result
      })
    },
    getOptionPlanList() {
      return new Promise(resolve => {
        optionList().then((data) => {
          if (data && data.code === 1000) {
            this.planList = data.result
            resolve(this.planList)
            if (this.planList.length) {
              this.getHeadList(this.planList[0].id)
              this.dataForm.planId = this.planList[0].id
            }
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    getProOptionList() {
      return new Promise(resolve => {
        optionCaseList().then((data) => {
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
      if (type === 'projectId') this.getConstructionList()
      if (type === 'planId') this.getHeadList(val)
      if (!this.dataForm.projectId) return this.$message.error('请选择项目')
      if (!this.dataForm.month) return this.$message.error('请选择月份')
      this.getDataList()
    }
  }
}
</script>

<style lang="scss">
  .salary-print {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
</style>
