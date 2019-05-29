<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="role"
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="角色名"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-plus"
        @click="handleCreate"
      >新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      ref="singleTable"
      :data="list"
      style="min-height:363px;"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="角色名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.name === 'superuser'"
            disabled
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.name === 'superuser'"
            disabled
            type="danger"
            size="small"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="scope.row.name !== 'superuser'"
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.name !== 'superuser'"
            type="danger"
            size="small"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page+1"
        :page-sizes="[10,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="roleDialogVisible" :title="dialogTitle">
      <el-form ref="roleForm" :model="roleForm" :rules="formValidateRules" label-position="top">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="roleForm.name"/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submit">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addRole, editRole, deleteRoleById } from '@/api/role'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'UserMgr',
  directives: {
    waves
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('角色名不能为空'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      total: null,
      listLoading: true,
      role: '',
      errorPath: '/errorPage/404',
      listQuery: {
        page: 0,
        limit: 10,
        sort: 'asc',
        name: ''
      },
      roleForm: {
        id: '',
        name: ''
      },
      formValidateRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }]
      },
      roleDialogVisible: false,
      dialogTitle: '角色配置'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val - 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.data.content
          this.total = response.data.data.totalElements
          setTimeout(() => {
            this.listLoading = false
          }, 200)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    handleEdit(row) {
      this.roleDialogVisible = true
      this.dialogTitle = '角色修改'
      this.roleForm = Object.assign({}, row)
      this.$nextTick(function() {
        this.$refs.roleForm.clearValidate() // 移除校验结果
      })
    },
    submit() {
      if (this.roleForm.method === 'add') {
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            addRole(this.roleForm)
              .then(response => {
                this.roleDialogVisible = false
                this.listloading = true
                if (response.data.success) {
                  this.$message.success(response.data.msg)
                  this.getList()
                } else {
                  this.$message.error(response.data.msg)
                }
              })
              .catch(error => {
                if (error.response === undefined) {
                  this.$router.push({ path: this.errorPath })
                } else {
                  this.$message.error(error.response.data.message)
                }
              })
          }
        })
      } else {
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            editRole(this.roleForm)
              .then(response => {
                this.roleDialogVisible = false
                if (response.data.success) {
                  this.getList()
                  this.$message.success(response.data.msg)
                } else {
                  this.$message.error(response.data.msg)
                }
              })
              .catch(error => {
                if (error.response === undefined) {
                  this.$router.push({ path: this.errorPath })
                } else {
                  this.$message.error(error.response.data.message)
                }
              })
          }
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 0
      this.listQuery.name = this.role
      this.getList()
    },
    handleSelectChange(val) {
      this.currentRow = val
    },
    handleDelete(id) {
      console.info(id)
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoleById({ id: id })
            .then(response => {
              if (response.data.success) {
                this.$message.success(response.data.msg)
                this.getList()
              } else {
                this.$message.error(response.data.msg)
              }
            })
            .catch(error => {
              if (error.response === undefined) {
                this.$router.push({ path: this.errorPath })
              } else {
                this.$message.error(error.response.data.message)
              }
            })
        })
        .catch(() => {})
    },
    handleCreate() {
      this.roleDialogVisible = true
      this.dialogTitle = '角色新增'
      this.roleForm = {
        id: '',
        name: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.roleForm.clearValidate() // 移除校验结果
      })
    }
  }
}
</script>
