<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    <el-form ref="dataForm" :model="resourceForm" :rules="rulesList" label-position="top">
      <el-form-item label="资源类型">
        <el-select
          v-model="resourceForm.type"
          style="width: 100%"
          placeholder="请选择"
          @change="isDisabled"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="resourceForm.name"/>
      </el-form-item>
      <el-form-item label="页面URL" prop="url">
        <el-input v-model="resourceForm.url" :disabled="isHide"/>
      </el-form-item>
      <el-form-item v-show="orderNumVisible" label="图标">
        <el-input v-model="resourceForm.icon"/>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="save">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createMenu, updateMenu } from '@/api/menu'

const tempInit = {
  id: undefined,
  parentId: undefined,
  name: '',
  path: '',
  icon: 'list'
}
export default {
  name: 'EditResDialog',
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('名字不能为空'))
      } else {
        callback()
      }
    }
    const validateUrl = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('页面URL不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      dialogTitle: '新增',
      temp: Object.assign({}, tempInit),
      errorPath: '/errorPage/404',
      resourceForm: {
        id: '',
        parentId: '',
        parentName: '',
        name: '',
        orderNum: 0,
        url: '',
        icon: 'list',
        type: 1
      },
      options: [
        {
          value: 1,
          label: '页面'
        },
        {
          value: 0,
          label: '菜单'
        }
      ],
      isHide: false,
      pageRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateName },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, trigger: 'blur', validator: validateUrl },
          { min: 2, max: 80, message: '长度在 2 到 80 个字符', trigger: 'blur' }
        ]
      },
      menuRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateName },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    orderNumVisible: function() {
      if (this.temp.typeText !== '元素') {
        return true
      } else {
        return false
      }
    },
    menuInputVisible: function() {
      if (this.temp.typeText === '页面') {
        return true
      } else {
        return false
      }
    },
    typeValue: function() {
      if (this.temp.typeText === '页面') {
        return 1
      } else if (this.temp.typeText === '菜单') {
        return 0
      } else {
        return 2
      }
    },
    rulesList: function() {
      if (this.resourceForm.type === 1) {
        console.log('pageRules')
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        return this.pageRules
      } else if (this.resourceForm.type === 0) {
        console.log('menuRules')
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        return this.menuRules
      }
    }
  },
  methods: {
    isDisabled() {
      if (this.resourceForm.type === 0) {
        this.resourceForm.url = ''
        this.isHide = true
      } else {
        this.isHide = false
      }
    },
    handleDialog(currentRow, type, title) {
      if (title === '新增') {
        this.resourceForm = {
          id: '',
          parentId: '',
          parentName: '',
          orderNum: 0,
          name: '',
          path: '',
          url: '',
          type: 1,
          icon: 'list'
        }
        if (type === 'child') {
          this.resourceForm.parentId = currentRow.id
        } else {
          this.resourceForm.parentId = currentRow.parentId
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else {
        this.resourceForm = currentRow
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
      this.isDisabled()
      this.dialogTitle = title
      this.dialogFormVisible = true
    },
    save() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            createMenu(this.resourceForm)
              .then(response => {
                this.dialogFormVisible = false
                if (response.data.success) {
                  this.$message.success(response.data.msg)
                  this.$emit('refreshTable')
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
          } else {
            this.resourceForm.parent = null
            this.resourceForm.children = null
            console.info(this.resourceForm)
            updateMenu(this.resourceForm).then(response => {
              this.dialogFormVisible = false
              if (response.data.success) {
                this.$message.success(response.data.msg)
                this.$emit('refreshTable')
              } else {
                this.$message.error(response.data.msg)
              }
            })
            // updateMenu()
          }
          // const tempData = Object.assign({}, this.temp)
          // tempData.type = this.typeValue
          // tempData.parent = undefined
          // tempData.children = undefined
          // updateMenu(tempData).then(() => {
          //   this.$emit('onUpdateData', tempData)
          //   this.dialogFormVisible = false
          //   this.$message({
          //     type: 'success',
          //     message: '更新成功'
          //   })
          // })
        }
      })
    }
  }
}
</script>

