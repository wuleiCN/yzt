<template>
  <div class="my-radio">
    <el-row>
      <el-col class="col-wrap" :span="24">
        <el-radio-group v-model="radio" @change="changeHandle">
          <el-radio label="">不限</el-radio>
          <el-radio v-for="(item, index) in option" :key="index" :label="item.tag">{{ item.title }}</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      toggle: false,
      radio: ''
    }
  },
  methods: {
    changeHandle(selectList) {
      this.$emit('change', selectList)
    }
  }
}
</script>
<style lang="scss">
  .my-radio {
    .el-radio-group {
      // display: flex;
      overflow: hidden;
      // flex-wrap: wrap;
      line-height: 25px;
    }
    .el-radio__inner {
      display: none;
    }
    .el-radio {
      margin-bottom: 5px;
      margin-right: 10px;
    }
    .el-radio__label {
      padding: 0 10px;
      height: 30px;
      // background: red;
      font-size: 15px;
      line-height: 32px;
    }
    .is-checked {
      background: #1890ff;
      border-radius: 3px;
    }
    .el-radio__input.is-checked+.el-radio__label {
      color: #fff;
    }
  }
</style>
