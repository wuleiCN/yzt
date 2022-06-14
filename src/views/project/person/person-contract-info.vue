<template>
  <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
    <el-form-item label="合同附件上传" prop="contract">
      <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'点击上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'contract')" />
      <!-- {{ data.contract }} -->
      <a target="_blank" style="color: #1890ff" :href="dataForm.contract || data.contract">{{ (dataForm.contract || data.contract) ? '查看附件' : '' }}</a>
      <!-- <a target="_blank" :href="data.contract">{{ dataForm.contract || data.contract }}</a> -->
    </el-form-item>
    <el-form-item label="合同开始时间">
      <el-date-picker
        v-model.trim="dataForm.contractStart"
        style="width:50%"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="合同开始时间"
      />
    </el-form-item>
    <el-form-item label="合同结束时间">
      <el-date-picker
        v-model.trim="dataForm.contractEnd"
        style="width:50%"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="合同结束时间"
      />
    </el-form-item>
    <el-form-item label="合同编号">
      <el-input v-model="dataForm.contractCode" style="width:50%" />
    </el-form-item>
  </el-form>
</template>

<script>
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dataForm: {
        contractName: '',
        contractEnd: '',
        contractStart: '',
        contractCode: ''
      },
      dataRule: {
        // contractEnd: [
        //   { required: true, message: '请选择合同结束时间', trigger: 'blur' }
        // ],
        // contractStart: [
        //   { required: true, message: '请选择合同开始时间', trigger: 'blur' }
        // ],
        // contractCode: [
        //   { required: true, message: '合同编号', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    this.dataForm.contractName = this.$refs.myUpload.fileName
    this.dataForm.contractEnd = this.data.contractEnd
    this.dataForm.contractStart = this.data.contractStart
    this.dataForm.contractCode = this.data.contractCode
    console.log('data', this.dataForm, this.data)
  },
  methods: {
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    }
  }
}
</script>

<style lang="scss">
</style>
