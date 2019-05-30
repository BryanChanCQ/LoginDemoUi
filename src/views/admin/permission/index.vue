<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="roleName"
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
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资源">
        <template slot-scope="scope">
          <span>{{ scope.row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资源类型">
        <template slot-scope="scope">
          <span>{{ scope.row.resourceTypeName }}</span>
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

    <el-dialog :visible.sync="roleResourceDialogVisible" :title="dialogTitle">
      <el-form
        ref="roleResourceForm"
        :model="roleResourceForm"
        :rules="formValidateRules"
        label-position="top"
      >
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="roleResourceForm.roleId"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="onRoleSelectChange"
          >
            <el-option v-for="item in roles" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型" prop="resourceType">
          <el-select
            v-model="roleResourceForm.resourceType"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="onResourceTypeSelectChange"
          >
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="资源" prop="resourceId">
          <!-- <el-input v-model="roleResourceForm.resourceName" /> -->
          <el-select
            v-model="roleResourceForm.resourceId"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="onResourceSelectChange"
          >
            <el-option
              v-for="item in resources"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
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
  deleteRoleResourceById,
  addRoleResource,
  editRoleResource
} from '@/api/permission'

import { queryRoles } from '@/api/role'
import { queryResources, menuVoListForOther } from '@/api/resource'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'UserMgr',
  directives: {
    waves
  },
  data() {
    const validateRoleId = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('角色名不能为空'))
      } else {
        callback()
      }
    }

    const validateResourceType = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('资源类型不能为空'))
      } else {
        callback()
      }
    }

    const validateResourceId = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('资源不能为空'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      total: null,
      listLoading: true,
      roleName: '',
      roles: [],
      resources: [],
      errorPath: '/errorPage/404',
      listQuery: {
        page: 0,
        pageSize: 10,
        sort: 'asc'
      },
      roleResourceForm: {
        id: '',
        roleId: '',
        roleName: '',
        resourceId: '',
        resourceType: '',
        resourceName: '',
        resourceTypeName: ''
      },
      options: [
        {
          value: 1,
          label: '菜单'
        }
      ],
      formValidateRules: {
        roleId: [
          { required: true, trigger: 'change', validator: validateRoleId }
        ],
        resourceType: [
          { required: true, trigger: 'change', validator: validateResourceType }
        ],
        resourceId: [
          { required: true, trigger: 'change', validator: validateResourceId }
        ]
      },
      roleResourceDialogVisible: false,
      dialogTitle: '角色资源配置'
    }
  },
  created() {
    this.getList()
    queryRoles({ page: 0, pageSize: 100 })
      .then(response => {
        this.roles = response.data.data.content
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    queryResources({ page: 0, pageSize: 100 })
      .then(response => {
        this.resources = response.data.data.content
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
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
    onRoleSelectChange(id) {
      const role = this.roles.find(function(item) {
        return item.id === id
      })
      this.roleResourceForm.roleName = role.name
      this.roleResourceForm.roleId = role.id
      menuVoListForOther(this.roleResourceForm).then(response => {
        this.resources = response.data.data
      })
    },
    onResourceSelectChange(id) {
      const resource = this.resources.find(function(item) {
        return item.id === id
      })
      this.roleResourceForm.resourceName = resource.name
    },
    onResourceTypeSelectChange(id) {
      const resource = this.options.find(function(item) {
        return item.value === id
      })
      this.roleResourceForm.resourceTypeName = resource.label
    },
    submit() {
      if (this.roleResourceForm.method === 'add') {
        this.$refs.roleResourceForm.validate(valid => {
          if (valid) {
            addRoleResource(this.roleResourceForm)
              .then(response => {
                this.roleResourceDialogVisible = false
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
        this.$refs.roleResourceForm.validate(valid => {
          if (valid) {
            editRoleResource(this.roleResourceForm)
              .then(response => {
                this.roleResourceDialogVisible = false
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
      }
    },
    handleFilter() {
      this.listQuery.page = 0
      this.listQuery.roleName = this.roleName
      this.getList()
    },
    handleDelete(id) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoleResourceById({ id: id })
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
      this.roleResourceDialogVisible = true
      this.dialogTitle = '角色资源配置新增'
      this.roleResourceForm = {
        id: '',
        roleId: '',
        roleName: '',
        resourceId: '',
        resourceName: '',
        resourceType: '',
        resourceTypeName: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.roleResourceForm.clearValidate() // 移除校验结果
      })
    },
    handleEdit(row) {
      this.roleResourceDialogVisible = true
      this.dialogTitle = '角色资源配置修改'
      this.roleResourceForm = Object.assign({}, row)
      this.roleResourceForm.method = 'edit'
      this.$nextTick(function() {
        this.$refs.roleResourceForm.clearValidate()
      })
    }
  }
}
</script>
