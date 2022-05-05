<template>
  <div>
    <div class="worker-detail-container">
      <div class="main">
        <div style="padding: 0 10px;font-size: 12px;">
          <div style="line-height: 25px">姓名：{{ dataForm.empName }}</div>
          <div style="line-height: 25px">工种：{{ dataForm.jobNameTitle }}</div>
          <div style="line-height: 25px">编号：{{ dataForm.jobNo }}</div>
          <div style="line-height: 25px">单位：{{ dataForm.constructionShortName }}</div>
          <div style="line-height: 25px">安全教育：<span style="color:#4c9655;">合格</span></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { workersGetCardMsg } from '@/api/project/person'
export default {
  data() {
    return {
      dataForm: {},
      id: this.$router.history.current.query.id
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      workersGetCardMsg({ id: this.id }).then(data => {
        this.dataForm = data.result || {}
      })
    }
  }
}
</script>

<style lang="scss">
// .worker-detail-container {

// }
</style>
