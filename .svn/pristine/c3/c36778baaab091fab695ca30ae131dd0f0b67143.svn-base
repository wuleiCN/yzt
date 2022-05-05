<template>
  <div class="se-btn">
    <div v-for="(item,index) in new Array(length).fill('')" :key="index" :style="{ width: (100 / Math.sqrt(length)) + '%', height: (100 / Math.sqrt(length)) + '%' }" class="se-btn-item">
      <div class="btn-item-block">{{ ' ' }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    length: {
      default: 0,
      type: Number
    }
  }
}
</script>
<style lang="scss">
  .se-btn {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .se-btn-item {
      .btn-item-block {
        width: 90%;
        height: 90%;
        background: #909399;
      }
    }
  }
</style>
