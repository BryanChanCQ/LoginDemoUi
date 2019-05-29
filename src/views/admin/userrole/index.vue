<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="username"
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="用户名"
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
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page + 1"
        :page-sizes="[10,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="userRoleDialogVisible" :title="dialogTitle">
      <el-form
        ref="userRoleForm"
        :model="userRoleForm"
        :rules="formValidateRules"
        label-position="top"
      >
        <el-form-item label="用户" prop="userId">
          <el-select
            v-model="userRoleForm.userId"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="onUserSelectChange"
          >
            <el-option
              v-for="item in users"
              :label="item.username"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="userRoleForm.roleId"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="onRoleSelectChange"
          >
            <el-option v-for="item in roles" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submit">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addUserRole,
  editUserRole,
  deleteUserRoleById
} from '@/api/userrole'
import { queryRoles, roleVoListForOther } from '@/api/role'
import { queryUsers } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'UserMgr',
  directives: {
    waves
  },
  data() {
    const validateUserId = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('用户不能为空'))
      } else {
        callback()
      }
    }

    const validateRoleId = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('角色不能为空'))
      } else {
        callback()
      }
    }

    return {
      list: null,
      total: null,
      listLoading: true,
      username: '',
      errorPath: '/errorPage/404',
      listQuery: {
        page: 0,
        limit: 10,
        sort: 'asc'
      },
      users: [],
      roles: [],
      userRoleForm: {
        id: '',
        userId: '',
        userName: '',
        roleId: '',
        roleName: ''
      },
      formValidateRules: {
        userId: [
          { required: true, trigger: 'change', validator: validateUserId }
        ],
        roleId: [
          { required: true, trigger: 'change', validator: validateRoleId }
        ]
      },
      userRoleDialogVisible: false,

      userRoleEditForm: {
        id: '',
        userId: '',
        userName: '',
        roleId: '',
        roleName: ''
      },
      userRoleDialogEditVisible: false
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
    onRoleSelectChange(id) {
      const role = this.roles.find(function(item) {
        return item.id === id
      })
      this.userRoleForm.roleName = role.name
    },
    onUserSelectChange(id) {
      const user = this.users.find(function(item) {
        return item.id === id
      })
      this.userRoleForm.userName = user.username
      this.userRoleForm.userId = user.id
      roleVoListForOther(this.userRoleForm).then(response => {
        this.roles = response.data.data
      })
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
          debugger
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })

      queryRoles({}).then(response => {
        this.roles = response.data.data.list
      })

      queryUsers({}).then(response => {
        debugger
        this.users = response.data.data
      })
    },
    handleEdit(row) {
      this.userRoleDialogVisible = true
      this.dialogTitle = '用户角色修改'
      this.userRoleForm = Object.assign({}, row)
      this.userRoleForm.method = 'edit'
      this.$nextTick(function() {
        this.$refs.userRoleForm.clearValidate() // 移除校验结果
      })
    },
    submit() {
      if (this.userRoleForm.method === 'add') {
        this.$refs.userRoleForm.validate(valid => {
          if (valid) {
            addUserRole(this.userRoleForm)
              .then(response => {
                this.userRoleDialogVisible = false
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
      } else if (this.userRoleForm.method === 'edit') {
        this.$refs.userRoleForm.validate(valid => {
          if (valid) {
            editUserRole(this.userRoleForm)
              .then(response => {
                this.userRoleDialogVisible = false
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
      this.listQuery.userName = this.username
      this.getList()
    },
    handleDelete(id) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUserRoleById({ id: id })
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
      this.userRoleDialogVisible = true
      this.dialogTitle = '用户角色新增'
      this.userRoleForm = {
        id: '',
        userId: '',
        userName: '',
        roleId: '',
        roleName: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.userRoleForm.clearValidate() // 移除校验结果
      })
    }
  }
}
</script>
