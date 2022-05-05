<template>
  <el-dialog
    custom-class="team-transfer-merge-modal"
    :title="type === 'transfer' ? '班组调动' : '班组合并'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="150px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item v-if="type === 'transfer'" label="所属参建单位" prop="constructionId">
        <el-select v-model="dataForm.constructionId" style="width:100%" placeholder="所属参建单位">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.construction.constructionName" :value="item.id">{{ item.construction.constructionName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 'merge'" label="班组" prop="teamId">
        <el-select v-model="dataForm.teamId" style="width:100%" placeholder="班组">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.teamName" :value="item.id">{{ item.teamName }}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="btnLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { proSelectList, teamTransfer, teamMerge, getListByConsId } from '@/api/project/team'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      type: '',
      proList: [],
      selectList: [],
      dataForm: {
        id: null,
        teamId: '',
        constructionId: ''
      },
      dataRule: {
        constructionId: [
          { required: true, message: '请选择所属参建单位', trigger: ['blur', 'change'] }
        ],
        teamId: [
          { required: true, message: '请选择班组', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  methods: {
    // 打开弹窗
    init(ids, type, selectIds) {
      this.type = type
      this.selectIds = selectIds
      this.dataForm.id = ids.length ? ids[0].toString() : null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.projectId = this.loginInfo.projectId
        if (type === 'merge') {
          this.getSelectList(this.dataForm.id, this.dataForm.projectId)
        } else {
          this.getProSelectList(this.dataForm.projectId)
        }
      })
    },
    getProSelectList(id) {
      proSelectList({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.proList = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    getSelectList(constructionId, projectId) {
      getListByConsId({ constructionId, projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.selectList = data.result
          // this.selectList = data.result && data.result.filter(item => {
          //   return item.id !== this.selectIds[0]
          // })
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.type === 'merge') {
            teamMerge({ type: this.type, ids: this.selectIds, id: this.dataForm.teamId }).then((data) => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000
              })
              this.visible = false
              this.$emit('refreshDataList')
            })
          } else {
            teamTransfer({ ...this.dataForm }).then((data) => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000
              })
              this.visible = false
              this.$emit('refreshDataList')
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .team-transfer-merge-modal {
    width: 950px;
  }
</style>
