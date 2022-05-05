<template>
  <el-form :inline="true" :model="dataForm">
    <el-form-item v-for="(item, index) in fields" :key="index">
      <el-button v-if="item.type === 'btn'" type="primary" @click="searchHandle()">查询</el-button>
      <el-input v-else v-model="dataForm[item.prop]" clearable :placeholder="item.placeholder" @clear="handleClear" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    handleClear() {
      this.$emit('handleClear')
    },
    searchHandle() {
      this.$emit('searchHandle')
    }
  }
}
</script>
