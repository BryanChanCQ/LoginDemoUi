<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-search"
        @click="showSearchDialog=true"
      >高级搜索</el-button>
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
            <span>{{ scope.row.showStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column width="150%" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="test(scope.row)">处理</el-button>
            <!-- <el-button type="success" size="small" @click="handle(scope.row)">处理</el-button> -->
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
                  :src="gGif+'?imageView2/1/w/80/h/80'"
                  class="user-avatar"
                  style="width: 100%;"
                >
                <div style="padding: 14px;">
                  <span>{{ o.showCreatedBy }}</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="checkHistory(o)">查看</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="事件处理" name="事件处理">
          <el-form ref="HandleEventDetailsForm" :model="HandleEventDetailsForm" size="medium">
            <table class="gridtable">
              <tbody>
                <tr>
                  <th>处理类型</th>
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="HandleEventDetailsForm.handleCategories"
                        filterable
                        placeholder="请选择"
                        style="float:left;margin-top: 20px;"
                      >
                        <el-option
                          v-for="item in handleCategories"
                          :label="item.name"
                          :value="item.key"
                          :key="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <th>涉及系统</th>
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="HandleEventDetailsForm.system"
                        filterable
                        placeholder="请选择"
                        style="float:left;margin-top: 20px;"
                      >
                        <el-option
                          v-for="item in systems"
                          :label="item.name"
                          :value="item.key"
                          :key="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <th>涉及需求</th>
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="HandleEventDetailsForm.demand"
                        filterable
                        placeholder="请选择"
                        style="float:left;margin-top: 20px;"
                      >
                        <el-option
                          v-for="item in demands"
                          :label="item.name"
                          :value="item.key"
                          :key="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <th>测试覆盖</th>
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="HandleEventDetailsForm.testCover"
                        filterable
                        placeholder="请选择"
                        style="float:left;margin-top: 20px;"
                      >
                        <el-option
                          v-for="item in testCovers"
                          :label="item.name"
                          :value="item.key"
                          :key="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>优化类型</th>
                  <td colspan="7">
                    <el-form-item>
                      <el-select
                        v-model="HandleEventDetailsForm.optimizeCategories"
                        filterable
                        placeholder="请选择"
                        style="float:left;margin-top: 20px;"
                      >
                        <el-option
                          v-for="item in optimizeCategories"
                          :label="item.name"
                          :value="item.key"
                          :key="item.id"
                        />
                      </el-select>
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
                      <el-upload
                        ref="upload"
                        :headers="headers"
                        :data="uploadExtraData"
                        :auto-upload="false"
                        :show-file-list="true"
                        :file-list="uploadFileList"
                        :on-remove="deleteUploadFile"
                        :on-preview="downloadAttachmentFile"
                        :action="findAction"
                        :on-success="onSuccessFileList"
                        list-type="text"
                        style="float:left;margin-top: 20px;"
                        class="upload-demo"
                      >
                        <el-button
                          type="primary"
                          icon="el-icon-check"
                          style="margin-left: 380px;"
                          @click="submitUpload"
                        >上传文件
                        </el-button>
                        <el-button
                          slot="trigger"
                          type="primary"
                          style="margin-left: 280px;margin-top: 10px;"
                          icon="el-icon-upload"
                        >选择文件
                        </el-button>
                      </el-upload>
                    </el-form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form>
          <el-button
            type="success"
            size="small"
            style="margin-left: 950px;margin-top: 10px;"
            @click="saveDetail"
          >解决</el-button>
          <el-button type="success" size="small" style="margin-top: 10px;" @click="transfer">转办</el-button>
          <el-button
            type="success"
            size="small"
            style="margin-top: 10px;"
            @click="passToparent"
          >移交上级</el-button>
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
    <el-dialog :visible.sync="showHandleDialog" :title="handleTitle">
      <el-form ref="HandleEventDetailsForm" :model="HandleEventDetailsForm" size="medium">
        <table class="gridtable">
          <tbody>
            <tr>
              <th>处理机构</th>
              <td>
                <el-form-item>
                  <el-select
                    v-model="HandleEventDetailsForm.handleEventGroup"
                    filterable
                    placeholder="请选择"
                    style="float:left;margin-top: 20px;"
                    @change="onHandleEventGroupSelectChange"
                  >
                    <el-option
                      v-for="item in handleEventGroups"
                      :label="item.branName"
                      :value="item.branCode"
                      :key="item.branCode"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <th>处理人</th>
              <td>
                <el-form-item>
                  <el-select
                    v-model="HandleEventDetailsForm.handleEventStaff"
                    filterable
                    placeholder="请选择"
                    style="float:left;margin-top: 20px;"
                  >
                    <el-option
                      v-for="item in handleEventStaffs"
                      :label="item.displayName"
                      :value="item.userName"
                      :key="item.id"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
          </tbody>
          <el-button
            v-if="handleTitle === '转办' "
            type="success"
            size="small"
            @click="transferToOtherStaff"
          >转办</el-button>
          <el-button
            v-if="handleTitle === '移交上级' "
            type="success"
            size="small"
            @click="passToparentHandle"
          >移交上级</el-button>
        </table>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showSearchDialog" title="高级搜索">
      <el-form
        :model="distributeQuery"
        inline="true"
        label-position="right"
        label-width="100px"
        size="small"
      >
        <el-form-item label="事件类型">
          <el-select
            v-model="distributeQuery.eventType"
            filterable
            placeholder="事件类型"
            style="width:220px"
          >
            <el-option
              v-for="item in eventTypes"
              :label="item.name"
              :value="item.key"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件编码">
          <el-input v-model="distributeQuery.eventIdentifier" placeholder="事件编码" style="width:220px"/>
        </el-form-item>
        <el-form-item label="事件标题">
          <el-input v-model="distributeQuery.eventTitle" placeholder="事件标题" style="width:220px"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="distributeQuery.contact" placeholder="联系方式" style="width:220px"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="distributeQuery.eventContactor" placeholder="联系人" style="width:220px"/>
        </el-form-item>
        <el-form-item label="提出事件机构">
          <el-select
            v-model="distributeQuery.institution"
            filterable
            placeholder="提出事件机构"
            style="width:220px"
          >
            <el-option
              v-for="item in allGroups"
              :label="item.branName"
              :value="item.branCode"
              :key="item.branCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件发生日期">
          <el-date-picker v-model="distributeQuery.eventCreateDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="事件描述">
          <el-input v-model="distributeQuery.description" placeholder="事件描述" style="width:220px"/>
        </el-form-item>
        <el-form-item label="事件优先级">
          <el-select
            v-model="distributeQuery.priorityLevel"
            filterable
            placeholder="事件优先级"
            style="width:220px"
          >
            <el-option
              v-for="item in priorityLevels"
              :label="item.name"
              :value="item.key"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件处理组">
          <el-select
            v-model="distributeQuery.handleEventGroup"
            filterable
            placeholder="事件处理组"
            style="width:220px"
          >
            <el-option
              v-for="item in allGroups"
              :label="item.branName"
              :value="item.branCode"
              :key="item.branCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件处理人">
          <el-select
            v-model="distributeQuery.handleEventStaff"
            filterable
            placeholder="事件处理人"
            style="width:220px"
          >
            <el-option
              v-for="item in allStaffs"
              :key="item.id"
              :label="item.displayName"
              :value="item.userName"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="resetDistributeQuery">重 置</el-button>
        <el-button type="primary" @click="getList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  handleEvent,
  saveDetail,
  queryHandleEventDetails,
  queryHandleEventDetailsById,
  passToparentHandle,
  transferToOtherStaff
} from '@/api/event/distributeTome'
import waves from '@/directive/waves' // 水波纹指令
import Gif from '@/assets/images/f778738c-e4f8-4870-b634-56703b4acafe.gif'
import {
  getUploadFileList,
  downloadAttachmentFile,
  queryHandleEventGroup,
  deleteUploadFile,
  queryHandleEventStaff,
  queryDictionary,
  queryAllGroup,
  queryAllStaff

} from '@/api/event/addEvent'
import addEvent from '@/views/event/addEvent'
import Cookies from 'js-cookie'
export default {
  name: 'DistributeToMe',
  directives: {
    waves
  },
  components: {
    'v-addEvent': addEvent
  },
  data() {
    return {
      handleTabs: [],
      errorPath: '/errorPage/404',
      gGif: Gif,
      list: null,
      findAction: process.env.BASE_API + '/Event/uploadAttachmentFile',
      showSearchDialog: false,
      activeName: '事件描述',
      showProcessDialog: false,
      total: null,
      showEventDialog: false,
      showHistoryDialog: false,
      showHandleDialog: false,
      listLoading: true,
      handleTitle: '',
      uploadFileList: [],
      handleEventGroups: [],
      handleEventStaffs: [],
      handleCategories: [],
      demands: [],
      systems: [],
      testCovers: [],
      optimizeCategories: [],
      priorityLevels: [],
      eventTypes: [],
      allGroups: [],
      allStaffs: [],
      headers: {
        jwtHeader: Cookies.get('jwtHeader')
      },
      uploadExtraData: {
        id: ''
      },
      listQuery: {
        page: 0,
        pageSize: 100,
        sort: 'asc'
      },
      distributeQuery: {
        assignee: '',
        eventType: '',
        eventIdentifier: '',
        eventTitle: '',
        contact: '',
        eventContactor: '',
        institution: '',
        eventCreateDate: '',
        description: '',
        priorityLevel: '',
        handleEventGroup: '',
        handleEventStaff: '',
        pageNum: 1,
        pageSize: 10
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
    queryDictionary({ key: 'eventPriority' })
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
    queryAllGroup()
      .then(response => {
        this.allGroups = response.data.data
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    queryAllStaff()
      .then(response => {
        this.allStaffs = response.data.data
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
      this.distributeQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.distributeQuery.pageNum = val
      this.getList()
    },
    transfer() {
      this.handleTitle = '转办'
      this.showHandleDialog = true
      this.handleEventGroups = []
      queryHandleEventGroup({ institutionId: null, rank: 'same' }).then(
        response => {
          this.handleEventGroups.push(response.data.data)
        }
      )
    },
    transferToOtherStaff() {
      this.HandleEventDetailsForm.eventIdentifier = this.eventForm.eventIdentifier
      this.HandleEventDetailsForm.eventId = this.eventForm.id
      saveDetail(this.HandleEventDetailsForm).then(response => {
        transferToOtherStaff({ userName: this.HandleEventDetailsForm.handleEventStaff, businessId: this.eventForm.id, HandleEventDetails: this.HandleEventDetailsForm })
          .then(response => {
            this.getList()
            this.showHandleDialog = false
            this.showProcessDialog = false
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
      })
    },
    passToparent() {
      this.handleTitle = '移交上级'
      this.showHandleDialog = true
      this.handleEventGroups = []
      queryHandleEventGroup({ institutionId: null, rank: 'parent' }).then(
        response => {
          this.handleEventGroups.push(response.data.data)
        }
      )
    },
    passToparentHandle() {
      this.code = 1
      this.HandleEventDetailsForm.eventIdentifier = this.eventForm.eventIdentifier
      this.HandleEventDetailsForm.eventId = this.eventForm.id
      saveDetail(this.HandleEventDetailsForm).then(response => {
        passToparentHandle({ code: this.code, userName: this.HandleEventDetailsForm.handleEventStaff, businessId: this.eventForm.id })
          .then(response => {
            this.getList()
            this.showHandleDialog = false
            this.showProcessDialog = false
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
      })
    },
    tabClick(row) {
      if (row.label === '事件处理') {
        this.HandleEventDetailsForm = {
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
        queryDictionary({ key: 'handleCategories' })
          .then(response => {
            this.handleCategories = response.data.data
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
        queryDictionary({ key: 'system' })
          .then(response => {
            this.systems = response.data.data
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
        queryDictionary({ key: 'optimizeCategories' })
          .then(response => {
            this.optimizeCategories = response.data.data
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
        queryDictionary({ key: 'demand' })
          .then(response => {
            this.demands = response.data.data
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
        queryDictionary({ key: 'testCover' })
          .then(response => {
            this.testCovers = response.data.data
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
        queryHandleEventDetails({
          eventIdentifier: this.eventForm.eventIdentifier
        })
          .then(response => {
            if (response.data.data.length !== 0) {
              this.HandleEventDetailsForm = response.data.data[0]
            }
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
        this.getUploadFileList(this.eventForm.eventIdentifier, row.label)
      }
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
    onHandleEventGroupSelectChange(branCode) {
      const handleEventGroup = this.handleEventGroups.find(function(item) {
        return item.branCode === branCode
      })
      queryHandleEventStaff({ branCode: handleEventGroup.branCode })
        .then(response => {
          this.handleEventStaffs = response.data.data
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    saveDetail() {
      this.HandleEventDetailsForm.eventIdentifier = this.eventForm.eventIdentifier
      this.HandleEventDetailsForm.eventId = this.eventForm.id
      saveDetail(this.HandleEventDetailsForm)
        .then(response => {
          this.$message.success(response.data.msg)
          this.showProcessDialog = false
          this.handle(this.eventForm)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    submitUpload() {
      this.uploadExtraData.id = this.eventForm.eventIdentifier
      this.$refs.upload.submit()
    },
    getList() {
      this.listLoading = true
      getList(this.distributeQuery)
        .then(response => {
          this.showSearchDialog = false
          this.convertData(response.data.data.list)
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
    checkHistory(row) {
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
    },
    deleteUploadFile(file, fileList) {
      deleteUploadFile({ fileUrl: file.url, id: file.id })
        .then(response => {
          this.$message.success(response.data.msg)
          this.getUploadFileList(this.eventForm.eventIdentifier, '事件处理')
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
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
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.roleName = this.roleName
      this.getList()
    },
    test(row) {
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
    getUploadFileList(eventIdentifier, tab) {
      this.uploadFileList = []
      eventIdentifier = this.eventForm.eventIdentifier
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
    handle(row) {
      this.code = 0
      handleEvent({ code: this.code, businessId: row.id })
        .then(response => {
          this.$message.success('成功处理')
          this.getList()
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    onSuccessFileList(response) {
      this.$message.success(response.msg)
      const eventIdentifier = this.eventForm.eventIdentifier
      const createdBy = null
      getUploadFileList({
        eventIdentifier: eventIdentifier,
        createdBy: createdBy
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
    resetDistributeQuery() {
      this.distributeQuery = {
        assignee: '',
        eventType: '',
        eventIdentifier: '',
        eventTitle: '',
        contact: '',
        eventContactor: '',
        institution: '',
        eventCreateDate: '',
        description: '',
        priorityLevel: '',
        handleEventGroup: '',
        handleEventStaff: '',
        pageNum: 1,
        pageSize: 10
      }
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
  padding: 10px;
  border-style: solid;
  border-color: #ddd;
  background-color: #eee;
}
table.gridtable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ddd;
  background-color: #ffffff;
}
</style>
