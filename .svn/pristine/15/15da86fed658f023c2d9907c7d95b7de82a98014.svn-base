<template>
  <div class="mod-area">
    <el-container>
      <el-aside class="left" width="280px">
        <el-tree
          ref="tree"
          :props="defaultProps"
          lazy
          highlight-current
          :load="loadNode"
          node-key="id"
        >
          <div slot-scope="{ node, data }" style="width:100%" class="tree-node" :title="data.name">
            <div v-if="!data.edit" style="width:100%" @dblclick="nodeClick(node, data)">{{ data.name }}</div>
            <el-input v-else ref="inputRef" v-model="data.name" autofocus size="mini" placeholder="" @blur="blurHandle(node, data)" />
          </div>
        </el-tree>
      </el-aside>
      <el-main>
        <el-alert
          title="温馨提示：双击省份可以修改"
          type="info"
          show-icon
          style="width: 50%"
          effect="dark"
          :closable="false"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getTree, saveOrUpdate } from '@/api/sys/area'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      edit: false,
      name: '',
      defaultProps: {
        children: 'child',
        label: 'text',
        isLeaf: 'leaf'
      },
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  created() {
    this.userId = this.loginInfo.id
  },
  methods: {
    // 点击树中的某条
    treeCurrentChangeHandle(data, node) {
      this.checkedKeys = node.checkedKeys.toString()
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.getTreeChild(100000, resolve)
        // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
      } else {
        this.getTreeChild(node.data.id, resolve)
      }
    },
    nodeClick(node, data) {
      this.$set(data, 'edit', !data.edit)
      this.$nextTick(() => {
        this.$refs.inputRef.$el.children[0].focus()
      })
    },
    blurHandle(node, data) {
      this.$set(data, 'edit', !data.edit)
      saveOrUpdate({ fullName: data.name, id: data.id }).then(data => {
        if (data && data.code === 1000) {
          this.$message.success('操作成功')
        }
      })
    },

    getTreeChild(id, resolve) {
      // console.log(id)
      //  这里可以替换成向后台发起的请求修改data,为了演示我用的是写死的数据,获取到data后,resolve出去就好了
      getTree({ id: id || 100000 }).then(data => {
        if (data && data.code === 1000) {
          const list = data.result.map(item => {
            item.name = item.text
            item.edit = false
            item.leaf = item.state === 'open'
            return item
          })
          resolve(list)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .mod-area {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      height: 700px;
    }
    .add-btn{
      margin-bottom: 20px;
    }
  }
</style>
