<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="eventTitle"
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="标题"
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
      <el-table
        v-loading="listLoading"
        ref="singleTable"
        :data="list"
        style="min-height:363px;"
        border
        fit
        highlight-current-row
        @row-dblclick="editEvent"
      >
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="事件编号">
          <template slot-scope="scope">
            <span>{{ scope.row.eventIdentifier }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">
            <span>{{ scope.row.eventTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="优先级">
          <template slot-scope="scope">
            <span>{{ scope.row.showPriorityLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="事件日期">
          <template slot-scope="scope">
            <span>{{ scope.row.eventCreateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理组">
          <template slot-scope="scope">
            <span>{{ scope.row.showHandleEventGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理人">
          <template slot-scope="scope">
            <span>{{ scope.row.showHandleEventStaff }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column width="150%" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="checkHistroy(scope.row)">查看</el-button>
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
    </div>
    <el-dialog :visible.sync="showProcessDialog" :fullscreen="true">
      <el-tabs
        :stretch="true"
        v-model="activeName"
        tab-position="left"
        type="border-card"
        @tab-click="tabClick"
      >
        <el-tab-pane label="事件描述" name="事件描述">
          <el-form ref="eventForm" :model="eventForm" size="medium">
            <table class="gridtable">
              <tbody>
                <tr>
                  <th>事件编码</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.eventIdentifier"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                  <th>事件提出机构</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.showInstitution"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                  <th>联系方式</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.contact"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                  <th>联系人</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.eventContactor"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>事件优先级</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.showPriorityLevel"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                  <th>事件发生日期</th>
                  <td>
                    <el-form-item>
                      <el-date-picker
                        v-model="eventForm.eventCreateDate"
                        :disabled="true"
                        type="date"
                        style="float:left;margin-top: 20px;"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </td>
                  <th>事件处理组</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.showHandleEventGroup"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                  <th>事件处理人</th>
                  <td>
                    <el-form-item>
                      <el-input
                        v-model="eventForm.showHandleEventStaff"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>事件标题</th>
                  <td colspan="3">
                    <el-form-item>
                      <el-input
                        v-model="eventForm.eventTitle"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                  <th>事件类型</th>
                  <td colspan="3">
                    <el-form-item>
                      <el-input
                        v-model="eventForm.showEventType"
                        :disabled="true"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>事件描述</th>
                  <td colspan="7">
                    <el-form-item>
                      <el-input
                        :autosize="{ minRows: 8, maxRows: 10 }"
                        v-model="eventForm.description"
                        :disabled="true"
                        type="textarea"
                        style="float:left;margin-top: 20px;"
                      />
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>附件</th>
                  <td
                    style="padding-left: 1px;padding-bottom: 1px;padding-right: 1px;padding-top: 1px;"
                    colspan="7"
                  >
                    <el-form-item>
                      <el-table :data="uploadFileList">
                        <el-table-column label="附件名" width="1000px">
                          <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="下载">
                          <template slot-scope="scope">
                            <el-button
                              type="success"
                              size="small"
                              @click="downloadAttachmentFile(scope.row)"
                            >下载</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="处理节点" name="处理节点">
          <el-row>
            <el-col
              v-for="(o, index) in handleTabs"
              :span="4"
              :key="o.name"
              :offset="index > 0 ? 2 : 0"
            >
              <el-card shadow="hover">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                  style="width: 100%;"
                >
                <div style="padding: 14px;">
                  <span>{{ o.showCreatedBy }}</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="checkProcessHistory(o)">查看</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :visible.sync="showHistoryDialog" :fullscreen="true">
      <el-form ref="HandleEventDetailsForm" :model="HandleEventDetailsForm" size="medium">
        <table class="gridtable">
          <tbody>
            <tr>
              <th>处理机构</th>
              <td>
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showHandleEventGroup"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>处理人</th>
              <td>
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showHandleEventStaff"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>处理类型</th>
              <td>
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showHandleCategories"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>涉及系统</th>
              <td>
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showSystem"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>涉及需求</th>
              <td>
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showDemand"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>测试覆盖</th>
              <td>
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showTestCover"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>优化类型</th>
              <td colspan="3">
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.showOptimizeCategories"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>处理情况</th>
              <td colspan="7">
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.handleCondition"
                    :autosize="{ minRows: 8, maxRows: 10 }"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                    type="textarea"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>测试说明</th>
              <td colspan="7">
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.testExplanation"
                    :autosize="{ minRows: 8, maxRows: 10 }"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                    type="textarea"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>优化方案</th>
              <td colspan="7">
                <el-form-item>
                  <el-input
                    v-model="HandleEventDetailsForm.optimizePlan"
                    :autosize="{ minRows: 8, maxRows: 10 }"
                    :disabled="true"
                    style="float:left;margin-top: 20px;"
                    type="textarea"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>附件</th>
              <td
                style="padding-left: 1px;padding-bottom: 1px;padding-right: 1px;padding-top: 1px;"
                colspan="7"
              >
                <el-form-item>
                  <el-table :data="uploadFileList">
                    <el-table-column label="附件名" width="1000px">
                      <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="下载">
                      <template slot-scope="scope">
                        <el-button
                          type="success"
                          size="small"
                          @click="downloadAttachmentFile(scope.row)"
                        >下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { getList } from '@/api/event/historyEvent'
import {
  getUploadFileList,
  downloadAttachmentFile,
  queryInstitution,
  queryDictionary,
  getCurrentOptionResult
} from '@/api/event/addEvent'
import {
  queryHandleEventDetails,
  queryHandleEventDetailsById
} from '@/api/event/distributeTome'
export default {
  name: 'HistoryEvent',
  directives: {
    waves
  },
  data() {
    return {
      errorPath: '/errorPage/404',
      institutions: [],
      priorityLevels: [],
      handleEventGroups: [],
      handleEventStaffs: [],
      handleTabs: [],
      eventTypes: [],
      activeName: '',
      uploadFileList: [],
      list: null,
      total: null,
      eventTitle: '',
      listLoading: true,
      showProcessDialog: false,
      showHistoryDialog: false,
      listQuery: {
        page: 0,
        limit: 10,
        sort: 'asc'
      },
      eventForm: {
        eventIdentifier: '',
        eventType: '',
        institution: '',
        contact: '',
        eventContactor: '',
        priorityLevel: '',
        eventCreateDate: '',
        eventTitle: '',
        description: '',
        handleEventGroup: '',
        handleEventStaff: '',
        method: ''
      },
      HandleEventDetailsForm: {
        eventIdentifier: '',
        eventId: '',
        handleEventGroup: '',
        handleEventStaff: '',
        handleCategories: '',
        handleCondition: '',
        system: '',
        demand: '',
        testExplanation: '',
        optimizeCategories: '',
        optimizePlan: ''
      }
    }
  },
  created() {
    this.getList()
    queryInstitution()
      .then(response => {
        this.institutions = response.data.data
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    queryDictionary({ key: 'issuePriority' })
      .then(response => {
        this.priorityLevels = response.data.data
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    queryDictionary({ key: 'eventType' })
      .then(response => {
        this.eventTypes = response.data.data
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
    getList() {
      this.listLoading = true
      getList()
        .then(response => {
          this.convertData(response.data.data)
          // this.total = response.data.data.page.totalElements
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
    checkHistroy(row) {
      this.showProcessDialog = true
      this.editEvent(row)
    },
    editEvent(row) {
      this.showEventDialog = true
      this.eventForm = Object.assign({}, row)
      this.eventForm.method = 'edit'
      this.activeName = '事件描述'
      this.getUploadFileList(row.eventIdentifier, '事件描述')
      this.$nextTick(function() {
        this.$refs.eventForm.clearValidate()
      })
    },
    convertData(listData) {
      this.convertList = []
      for (var i = 0; i < listData.length; i++) {
        var d = new Date(listData[i].eventCreateDate)
        var times =
          d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        listData[i].eventCreateDate = times
        this.convertList.push(listData[i])
      }
      this.list = this.convertList
    },
    handleSizeChange(val) {
      this.listQuery.limit = val - 1
      this.getList()
    },
    downloadAttachmentFile(file) {
      downloadAttachmentFile({ fileUrl: file.url }).then(response => {
        if (!response) {
          return
        }
        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取文件名
        let fileName = null
        if (file.url.indexOf('/') !== -1) {
          fileName = file.url.substring(file.url.lastIndexOf('/') + 1)
        } else {
          fileName = file.url
        }
        // download 仅适用于chorme FireFox给downLoad属性设置文件名
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val - 1
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 0
      this.listQuery.eventTitle = this.eventTitle
      this.getList()
    },
    getUploadFileList(eventIdentifier, tab) {
      this.uploadFileList = []
      if (!eventIdentifier) {
        eventIdentifier = this.eventForm.eventIdentifier
      }
      if (tab !== '事件处理' && (typeof tab === 'string') && tab.constructor === String) {
        this.createdBy = this.eventForm.createdBy
      } else {
        this.createdBy = null
      }
      getUploadFileList({
        eventIdentifier: eventIdentifier,
        createdBy: this.createdBy
      })
        .then(response => {
          this.convertUploadFileList(response.data.data)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    getCurrentOptionResult() {
      getCurrentOptionResult()
        .then(response => {
          this.handleEventGroups = response.data.data.handleEventGroups
          this.handleEventStaffs = response.data.data.handleEventStaffs
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    convertUploadFileList(list) {
      for (var i = 0; i < list.length; i++) {
        const fileObj = {
          id: '',
          name: '',
          url: ''
        }
        fileObj.id = list[i].id
        fileObj.name = list[i].attachmentName
        fileObj.url = list[i].attachmentPath
        this.uploadFileList.push(fileObj)
      }
    },
    tabClick(row) {
      if (row.label === '事件描述') {
        this.getUploadFileList(this.eventForm.eventIdentifier, row.label)
      }
      if (row.label === '处理节点') {
        queryHandleEventDetails({
          eventIdentifier: this.eventForm.eventIdentifier,
          handleEventStaff: 'queryAll'
        })
          .then(response => {
            if (response.data.data !== null) {
              this.handleTabs = response.data.data
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
    },
    checkProcessHistory(row) {
      queryHandleEventDetailsById({
        id: row.id
      })
        .then(response => {
          if (response.data.data !== null) {
            this.showHistoryDialog = true
            this.HandleEventDetailsForm = response.data.data
          }
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
      getUploadFileList({
        eventIdentifier: row.eventIdentifier,
        createdBy: row.createdBy
      })
        .then(response => {
          this.uploadFileList = []
          this.convertUploadFileList(response.data.data)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    }
  }
}
</script>

<style scoped>
table.gridtable {
  margin: 0 auto;
  margin-top: 10px;
  font-family: verdana, arial, sans-serif;
  font-size: 12px;
  color: #333333;
  border-width: 1px;
  border-color: #ddd;
  border-collapse: collapse;
}
table.gridtable th {
  border-width: 1px;
  padding: 3px;
  border-style: solid;
  border-color: #ddd;
  background-color: #eee;
}
table.gridtable td {
  border-width: 1px;
  padding: 3px;
  border-style: solid;
  border-color: #ddd;
  background-color: #ffffff;
}
</style>
