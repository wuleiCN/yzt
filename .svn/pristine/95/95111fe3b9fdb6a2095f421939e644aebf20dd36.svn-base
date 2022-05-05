<template>
  <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
    <el-form-item label="合同附件上传" prop="contract">
      <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'点击上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'contract')" />
      <!-- {{ data.contract }} -->
      <a target="_blank" style="color: #1890ff" :href="dataForm.contract || data.contract">{{ (dataForm.contract || data.contract) ? '查看附件' : '' }}</a>
      <!-- <a target="_blank" :href="data.contract">{{ dataForm.contract || data.contract }}</a> -->
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
      dataForm: {},
      dataRule: {}
    }
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
