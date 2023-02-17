<template>
  <el-dialog
    custom-class="list-supple-modal"
    title="项目补推"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    @close="dataFormClose"
  >
    <el-form v-if="proList.length" ref="dataForm" :model="dataForm" label-width="120px">
      <el-form-item label="项目名称">
        <el-select
          v-model="dataForm.projectIds"
          multiple
          collapse-tags
          filterable
          style="width:100%"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in proList"
            :key="index"
            :label="item.projectName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="补推时间段">
        <el-select v-model="dataForm.noPassDays" filterable style="width:100%" placeholder="请选择补推时间段" @change="(e) => selectChangeHandle(e, 'noPassDays')">
          <el-option label="1天内" :value="1"> 1天内 </el-option>
          <el-option label="3天内" :value="3"> 3天内 </el-option>
          <el-option label="7天内" :value="7"> 7天内 </el-option>
        </el-select>
        <div class="ps">注: 推送间隔为2小时，请勿重复推送！具体进度请关注对接日志。</div>
      </el-form-item>
    </el-form>
    <p v-if="!proList.length">暂无可以补推的项目，或项目正在推送中...</p>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="proList.length === 0" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AttSupplePush, getAtteList } from '@/api/project/project'
export default {
  data() {
    return {
      visible: false,
      selectList: [],
      dataForm: {
        projectIds: [],
        noPassDays: 1
      },
      proList: []
    }
  },
  created() {
    this.getAttendList()
  },
  methods: {
    init() {
      this.visible = true
    },
    getAttendList() {
      getAtteList().then(data => {
        if (data.result && data.code === 1000) this.proList = data.result
      })
    },
    // 表单提交
    dataFormSubmit() {
      if (this.dataForm.projectIds.length !== 0) {
        AttSupplePush({ ...this.dataForm }).then(res => {
          if (res.code === 1000) this.$message.success('操作成功！')
          else this.$message.error('操作失败！')
          this.visible = false
        })
      } else {
        this.$message.warning('请选择要补推的项目')
      }
    },
    dataFormClose() {
      this.dataForm.projectIds = []
    },
    selectChangeHandle(val, type) {
      this.dataForm[type] = val
    }
  }
}
</script>

<style lang="scss">
.list-supple-modal{
  width: 42.31rem;
  p {
    text-align: center;
    font-size: 24px;
    margin: 0 0 20px 0;
    color: coral;
  }
  .ps {
    color: #e6a23c;
  }
}
</style>
