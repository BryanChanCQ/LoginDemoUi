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
        icon="el-icon-search"
        @click="tiaozhuan"
      >tiaozhuan</el-button>
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
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="展示名">
        <template slot-scope="scope">
          <span>{{ scope.row.displayName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否启用">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled" style="color:green">启用</span>
          <span v-else style="color:red">停用</span>
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
        :current-page="listQuery.page"
        :page-sizes="[10,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="userDialogVisible" :title="title">
      <el-form ref="userForm" :model="userForm" :rules="formValidateRules" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input :disabled="title === '修改'" v-model="userForm.username"/>
        </el-form-item>
        <el-form-item label="展示名" prop="displayName">
          <el-input v-model="userForm.displayName"/>
        </el-form-item>
        <el-form-item v-show="title === '新增'" label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" @change="checkForm"/>
        </el-form-item>
        <el-form-item v-show="title === '新增'" label="密码确认" prop="passwordConfirm">
          <el-input v-model="userForm.passwordConfirm" type="password" @change="checkForm"/>
        </el-form-item>
        <el-form-item v-show="title === '修改'" label="新密码" prop="newPassword">
          <el-input v-model="userForm.newPassword" type="password" @change="checkForm"/>
        </el-form-item>
        <el-form-item v-show="title === '修改'" label="密码确认" prop="newPasswordConfirm">
          <el-input v-model="userForm.newPasswordConfirm" type="password" @change="checkForm"/>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="userForm.enabled" active-color="#13ce66" inactive-color="#cccccc"/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submit">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addUser, editUser, deleteUserById } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'UserMgr',
  directives: {
    waves
  },
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('用户名不能为空'))
      }
      if (value.length < 3) {
        callback(new Error('用户名不能少于3位数'))
      } else {
        callback()
      }
    }

    const validateDisplayName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('展示名不能为空'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (this.title === '修改') {
        callback()
        return
      }
      if (value.length <= 0) {
        callback(new Error('密码不能为空'))
      } else {
        if (value !== this.userForm.passwordConfirm) {
          callback(new Error('密码不匹配'))
        } else {
          callback()
        }
      }
    }

    const validatePasswordConfirm = (rule, value, callback) => {
      if (this.title === '修改') {
        callback()
        return
      }
      if (value.length <= 0) {
        callback(new Error('密码不能为空'))
      } else {
        if (value !== this.userForm.password) {
          callback(new Error('密码不匹配'))
        } else {
          callback()
        }
      }
    }

    return {
      list: null,
      total: null,
      listLoading: true,
      username: '',
      title: '',
      errorPath: '/errorPage/404',
      listQuery: {
        page: 1,
        limit: 10,
        sort: 'asc'
      },
      userForm: {
        id: '',
        username: '',
        password: '',
        newPassword: '',
        passwordConfirm: '',
        newPasswordConfirm: '',
        displayName: '',
        enabled: true
      },
      formValidateRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUserName }
        ],
        displayName: [
          { required: true, trigger: 'blur', validator: validateDisplayName }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        passwordConfirm: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePasswordConfirm
          }
        ]
      },
      userDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
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
    checkForm() {
      this.$refs.userForm.validate()
    },
    handleEdit(row) {
      this.title = '修改'
      this.userDialogVisible = true
      this.userForm.id = row.id
      this.userForm.newPassword = ''
      this.userForm.newPasswordConfirm = ''
      this.userForm.displayName = row.displayName
      this.userForm.username = row.username
      this.userForm.enabled = row.enabled
      this.userForm.method = 'edit'
      this.$nextTick(function() {
        this.$refs.userForm.clearValidate() // 移除校验结果
      })
    },
    submit() {
      if (this.userForm.method === 'add') {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            this.userForm.id = 19
            addUser(this.userForm)
              .then(response => {
                this.userDialogVisible = false
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
        this.$refs.userForm.validate(valid => {
          if (valid) {
            if (
              this.userForm.newPassword !== this.userForm.newPasswordConfirm
            ) {
              this.$message.error('密码不匹配')
              return
            }
            const editUserParam = {
              id: this.userForm.id,
              displayName: this.userForm.displayName,
              enabled: this.userForm.enabled,
              password: this.userForm.newPassword
            }
            editUser(editUserParam)
              .then(response => {
                this.userDialogVisible = false
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
      this.listQuery.page = 1
      this.listQuery.username = this.username
      this.getList()
    },
    tiaozhuan() {
      this.$router.push({ path: '/404' })
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
          deleteUserById({ id: id })
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
      this.userDialogVisible = true
      this.title = '新增'
      this.userForm = {
        id: '',
        username: '',
        password: '',
        passwordConfirm: '',
        displayName: '',
        enabled: true,
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.userForm.clearValidate() // 移除校验结果
      })
    }
  }
}
</script>
