<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleCreate('child')"
      >新增子资源</el-button>
      <el-button
        v-waves
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate('brother')"
      >新增同级资源</el-button>
    </div>
    <tree-table
      v-loading="listLoading"
      :data="data"
      :eval-func="func"
      :eval-args="args"
      :expand-all="expandAll"
      border
      @current-change="handleSelectChange"
    >
      <el-table-column label="资源名称" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.type | parseType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" width="50" align="center">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon"/>
        </template>
      </el-table-column>
      <el-table-column label="资源URL">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            v-show="!scope.row.children || scope.row.children.length===0"
            type="text"
            @click="handleDeleteRow(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <edit-dialog ref="dialog" @refreshTable="refreshTable"/>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import treeTable from '@/components/TreeTable/index3'
import treeToArray from './customEval'
import editDialog from './edit'
import { getList, deleteMenuById } from '@/api/resource'

export default {
  name: 'Resmgr',
  directives: {
    waves
  },
  components: {
    treeTable,
    editDialog
  },
  filters: {
    parseType(type) {
      if (type === 0) {
        return '菜单'
      }
      if (type === 1) {
        return '页面'
      }
    }
  },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      listLoading: true,
      data: [],
      args: [null, null, 'orderNum'],
      currentRow: null,
      defaultIcon: 'icon',
      errorPath: '/errorPage/404',
      saveDisabled: true,
      listQuery: {
        page: 1,
        pageSize: 100,
        sort: 'asc'
      }
    }
  },
  computed: {
    btnType() {
      if (this.saveDisabled) {
        return 'primary'
      } else {
        return 'success'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.convertToTree(response.data.data.list)
          this.listLoading = false
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    getChildMaxOrderNum(data, id) {
      let max = 1
      for (let i = 0; i < data.length; ++i) {
        if (id === data[i].id) {
          const children = data[i].children
          for (let j = 0; j < children.length; ++j) {
            if (children[j].orderNum > max) {
              max = children[j].orderNum
            }
          }
          return max
        } else {
          if (data[i].hasOwnProperty('children')) {
            const tmp = this.getChildMaxOrderNum(data[i].children, id)
            if (tmp !== 0) {
              return tmp
            }
          }
        }
      }
      return 0
    },
    // 当前节点后面的brother节点orderNum都+1
    addBrotherOrderNum(data, id) {
      for (let i = 0; i < data.length; ++i) {
        if (id === data[i].id) {
          for (let j = i + 1; j < data.length; ++j) {
            console.info(data[j].orderNum)
            data[j].orderNum += 1
          }
          return 1
        } else {
          if (data[i].hasOwnProperty('children')) {
            const tmp = this.addBrotherOrderNum(data[i].children, id)
            if (tmp !== 0) {
              return 1
            }
          }
        }
      }
      return 0
    },
    handleCreate(type) {
      if (this.currentRow == null) {
        this.$message({
          message: '请先选择一行数据',
          type: 'warning'
        })
        return
      }

      if (this.currentRow.type === 1 && type === 'child') {
        this.$message({
          message: '页面不能新增子资源',
          type: 'warning'
        })
        return
      }
      this.$refs.dialog.handleDialog(this.currentRow, type, '新增')
    },
    handleSelectChange(val) {
      this.currentRow = val
    },
    convertToTree(data) {
      const menus = []
      this.data = this.parseMenus(menus, data)
    },
    parseMenus(menus, arr) {
      const notAddedMenus = []
      for (let i = 0; i < arr.length; ++i) {
        this.addMenu(arr[i], menus, notAddedMenus)
      }
      if (notAddedMenus.length > 0) {
        let childrenMenus = []
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].hasOwnProperty('children')) {
            childrenMenus = childrenMenus.concat(menus[i].children)
          }
        }
        this.parseMenus(childrenMenus, notAddedMenus)
      }
      return menus
    },
    addMenu(menu, menus, notAddedMenus) {
      // 顶层目录
      if (menu.parentId === 0) {
        menus.push(menu)
      } else {
        let i = 0
        for (; i < menus.length; ++i) {
          if (menu.parentId === menus[i].id) {
            if (menus[i].hasOwnProperty('children')) {
              menus[i].children.push(menu)
            } else {
              menus[i].children = []
              menus[i].children.push(menu)
            }
            break
          }
        }
        if (i === menus.length) {
          notAddedMenus.push(menu)
        }
      }
      return menus
    },
    handleUpdate(row) {
      const tmp = Object.assign({}, row)
      this.$refs.dialog.handleDialog(tmp, '', '修改')
    },
    handleDeleteRow(id) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteMenuById({ id: id }).then(response => {
            if (response.data.success) {
              this.$message.success(response.data.msg)
              this.getList()
            } else {
              this.$message.error(response.data.msg)
            }
          })
        })
        .catch(() => {})
    },
    refreshTable() {
      this.getList()
    }
  }
}
</script>
