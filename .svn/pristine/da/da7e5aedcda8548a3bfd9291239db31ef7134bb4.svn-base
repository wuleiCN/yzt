<template>
  <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
    <el-form-item label="进场承诺书上传" prop="entrance">
      <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'点击上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'entrance')" />
      <!-- {{ data.entrance }} -->
      <a target="_blank" style="color: #1890ff" :href="dataForm.entrance || data.entrance">{{ (dataForm.entrance || data.entrance) ? '查看附件' : '' }}</a>
      <!-- <a target="_blank" :href="data.entrance">{{ dataForm.entrance || data.entrance }}</a> -->
    </el-form-item>
    <el-form-item label="退场承诺书上传" prop="exeunt">
      <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'点击上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'exeunt')" />
      <!-- {{ data.exeunt }} -->
      <!-- {{ data.exeunt }} -->
      <a target="_blank" style="color: #1890ff" :href="dataForm.exeunt || data.exeunt">{{ (dataForm.exeunt || data.exeunt) ? '查看附件' : '' }}</a>
      <!-- <a target="_blank" :href="data.exeunt">{{ dataForm.exeunt || data.exeunt }}</a> -->
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
