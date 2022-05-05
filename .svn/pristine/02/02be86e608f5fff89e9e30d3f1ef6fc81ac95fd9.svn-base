<template>
  <div>
    <el-table
      v-loading="dataListLoading"
      :data="tableData"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
      @row-dblclick="rowDblclick"
    >
      <template>
        <el-table-column
          v-if="iSIndex"
          type="index"
          header-align="center"
          align="center"
          width="50"
          label="序号"
        />
        <el-table-column
          v-if="iSselection"
          type="selection"
          header-align="center"
          align="center"

          width="50"
        />
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="item.showTooltip"
          :width="item.width"
          :align="item.align"
          :header-align="item.headerAlign"
        >
          <template slot-scope="scope">
            <template v-if="item.type === 'slot'">
              <slot
                :name="item.prop"
                :row="scope.row"
              />
            </template>
            <template v-else>{{ scope.row[item.prop] }}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
  </div>
</template>

<script>
export default {
  props: {
    dataListLoading: {
      type: Boolean,
      default: false
    },
    iSselection: {
      type: Boolean,
      default: true
    },
    iSIndex: {
      type: Boolean,
      default: false
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalPage: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 每页数
    sizeChangeHandle(pageSize) {
      this.$emit('reload', 1, pageSize)
    },
    // 当前页
    currentChangeHandle(pageIndex) {
      this.$emit('reload', pageIndex, this.pageSize)
    },
    // 多选
    selectionChangeHandle(dataListSelections) {
      this.$emit('selection-change', dataListSelections)
    },
    // 双击
    rowDblclick(row) {
      this.$emit('row-dblclick', row)
    }
  }
}
</script>
