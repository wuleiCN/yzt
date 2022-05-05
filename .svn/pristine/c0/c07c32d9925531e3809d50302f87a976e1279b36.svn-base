<template>
  <el-dialog
    custom-class="gyc-dormitory-detail-modal"
    title="人员详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        label="姓名"
      />
      <el-table-column
        prop="idCode"
        header-align="center"
        align="center"
        width="180"
        label="身份证号"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        label="项目名称"
      />
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        width="180"
        label="参建单位"
      />
      <el-table-column
        prop="teamName"
        header-align="center"
        align="center"
        width="180"
        label="班组"
      />
    </el-table>
  </el-dialog>
</template>

<script>
import { checkedInList } from '@/api/gyc/unit'
export default {
  data() {
    return {
      visible: false,
      dataList: [],
      dataListLoading: false
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.visible = true
      this.getDataList(row.id)
    },
    getDataList(dormitoryId) {
      this.dataListLoading = true
      checkedInList({
        dormitoryId
      }).then(data => {
        if (data && data.code === 1000) {
          this.dataList = data.result
        }
        this.dataListLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
  .gyc-dormitory-detail-modal {
    width: 800px;
    .el-dialog__body {
      padding: 20px;
    }
  }
</style>
