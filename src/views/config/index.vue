<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.parentName"
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="父配置名"
        @keyup.enter.native="handleFilter" />
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        icon="el-icon-search"
        @click="handleFilter">查询</el-button>
      <el-button
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-plus"
        @click="handleCreate">新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      ref="singleTable"
      :data="list"
      border
      fit
      highlight-current-row
      style="min-height:363px;"
      @current-change="handleSelectChange">
      <el-table-column
        width="150px"
        align="center"
        label="父配置名">
        <template slot-scope="scope">
          <span>{{ scope.row.parentName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="配置名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="配置值">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="150px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        width="150px"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row.id)">删除</el-button>
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
        @current-change="handleCurrentChange" />
    </div>

    <el-dialog
      :visible.sync="configDialogFormVisible"
      :title="title">
      <el-form
        ref="configForm"
        :model="configForm"
        :rules="formValidateRules"
        label-position="top">
        <el-form-item
          label="父配置名"
          prop="parentName">
          <el-select
            v-model="configForm.parentName"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="parentConfigSelectChange">
            <el-option
              v-for="item in parentNameList"
              :label="item.name"
              :value="item.name"
              :key="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="配置名"
          prop="name">
          <el-input v-model="configForm.name" />
        </el-form-item>
        <el-form-item
          label="配置值"
          prop="value">
          <el-input v-model="configForm.value" />
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark">
          <el-input
            v-model="configForm.remark"
            :rows="3"
            type="textarea" />
        </el-form-item>
        <el-button
          :disabled="isDisabled"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click="submit">提交</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getList, add, editById, deleteById, getAllParentName } from '@/api/config'
import { getToken } from '@/api/deploy/token.js'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Configdict',
  directives: {
    waves
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('配置名不能为空'))
      } else {
        callback()
      }
    }
    const validateValue = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('配置值不能为空'))
      } else {
        callback()
      }
    }
    return {
      formValidateRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        value: [{ required: true, trigger: 'blur', validator: validateValue }]
      },
      // formValidateRules: {
      //   name: [{ required: true, trigger: 'change', message: '配置名不能为空' }],
      //   value: [{ required: true, trigger: 'change', message: '配置值不能为空' }]
      // },
      title: '',
      list: null,
      parentNameList: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: 'asc',
        parentCode: ''
      },
      configForm: {
        id: '',
        parentId: '',
        parentName: '',
        name: '',
        value: '',
        remark: '',
        token: '',
        method: ''
      },
      configDialogFormVisible: false,
      isDisabled: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    showResult(title, msg, type) {
      if (type === 'success') {
        this.$notify({
          title: title,
          message: msg,
          type: type,
          duration: 2000
        })
      } else {
        this.$notify.error({
          title: title,
          message: msg,
          duration: 3000
        })
      }
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    parentConfigSelectChange(e) {
      const item = this.list.find(v => {
        return v.name === e
      })
      this.configForm.parentId = item.id
      console.info(this.configForm)
    },
    handleDelete(id) {
      this.$alert('确定删除', '信息', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            deleteById({ id: id }).then(response => {
              if (response.data) {
                this.showResult('成功', '删除成功', 'success')
                this.getList()
              } else {
                this.showResult('失败', '删除失败', 'fail')
              }
            })
          }
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleEdit(row) {
      this.title = '配置项编辑'
      this.configDialogFormVisible = true
      this.configForm = Object.assign({}, row)
      this.configForm.method = 'edit'
      getAllParentName(this.listQuery).then(response => {
        this.parentNameList = response.data
        for (var i = 0; i < this.parentNameList.length; i++) {
          if (this.configForm.name === this.parentNameList[i].name) {
            this.parentNameList.splice(i, 1)
          }
        }
      })
      this.$nextTick(function() {
        this.$refs.configForm.clearValidate() // 移除校验结果
      })
    },
    submit() {
      if (this.configForm.method === 'add') {
        this.$refs.configForm.validate(valid => {
          if (valid) {
            this.isDisabled = true
            if (this.configForm.parentName === this.configForm.name) {
              this.showResult('失败', '父配置名不能与配置名一致', 'fail')
              return
            }
            add(this.configForm).then(response => {
              if (response.data) {
                this.configDialogFormVisible = false
                this.showResult('成功', '新增成功', 'success')
                this.getList()
                this.isDisabled = false
              } else {
                this.configDialogFormVisible = false
                this.showResult('失败', '新增失败(请不要重复提交)', 'fail')
                this.isDisabled = false
              }
            })
          }
        })
      } else {
        this.$refs.configForm.validate(valid => {
          if (valid) {
            if (this.configForm.parentName === this.configForm.name) {
              this.showResult('失败', '父配置名不能与配置名一致', 'fail')
              return
            }
            editById(this.configForm).then(response => {
              this.configDialogFormVisible = false
              if (response.data) {
                this.showResult('成功', '更新成功', 'success')
                this.getList()
              } else {
                this.showResult('失败', '更新失败', 'fail')
              }
            })
          }
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSelectChange(val) {
      this.currentRow = val
    },
    handleDeleteRow() {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // deleteEntity(this.currentRow.id).then(() => {
          //   this.$message({
          //     type: 'success',
          //     message: this.currentRow.username + ' 删除成功!'
          //   })
          //   const index = this.list.indexOf(this.currentRow)
          //   this.list.splice(index, 1)
          // })
        })
        .catch(() => {})
    },
    handleCreate() {
      this.configDialogFormVisible = true
      this.title = '配置项新增'
      this.configForm = {
        id: '',
        parentId: '',
        parentName: '',
        name: '',
        value: '',
        remark: '',
        token: '',
        method: 'add'
      }
      getAllParentName(this.listQuery).then(response => {
        this.parentNameList = response.data
      })
      this.$nextTick(function() {
        this.$refs.configForm.clearValidate() // 移除校验结果
      })
      this.isDisabled = false
      getToken().then(response => {
        if (response.data) {
          this.configForm.token = response.data
        }
      })
    },
    handleUpdate() {
      if (this.currentRow == null) {
        this.$message({
          message: '请先选择一行数据',
          type: 'warning'
        })
        return
      }
      this.$refs.dialog.handleUpdate(this.currentRow)
    },
    onCreateData(temp) {
      this.list.unshift(temp)
    },
    onUpdateData(temp) {
      for (const v of this.list) {
        if (v.id === temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, temp)
          break
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-table {
  .warning-row {
    background: #f4f4f5;
    color: #f4f4f5;
  }
}
</style>
