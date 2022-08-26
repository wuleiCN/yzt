<template>
  <div class="base-info">
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="110px"
    >
      <div class="golobal-title-style">基本信息</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属项目" prop="projectName">
            <!-- !!dataForm.projectName || loginInfo.loginName === 'admin' -->
            <el-input
              v-model.trim="dataForm.projectName"
              :disabled="true"
              placeholder="所属项目"
            />
          </el-form-item>
          <el-form-item label="所属参建单位" prop="constructionId">
            <el-select
              v-model.trim="dataForm.constructionId"
              filterable
              style="width:100%"
              :disabled="!!loginInfo.constructionId"
              placeholder="所属参建单位"
              @change="selectChange"
            >
              <el-option
                v-for="(item, index) in proList"
                :key="index"
                :label="item.construction.constructionName"
                :value="item.id"
              >{{ item.construction.constructionName }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属班组" prop="teamId">
            <el-select
              v-model.trim="dataForm.teamId"
              filterable
              style="width:100%"
              placeholder="所属班组"
              @change="selectTeamChange"
            >
              <el-option
                v-for="(item, index) in teamList"
                :key="index"
                :label="item.teamName"
                :value="item.id"
              >{{ item.teamName }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCode">
            <el-input
              v-model.trim="dataForm.idCode"
              placeholder="请输入身份证号"
            >
              <template slot="append">
                <span
                  style="cursor: pointer;"
                  @click="getByIdCodeInfo"
                >搜索</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            :rules="[
              {
                required: !teamIsDisabled,
                message: '从事工种不能为空',
                trigger: 'blur'
              }
            ]"
            label="从事工种"
            prop="jobName"
          >
            <el-select
              v-model.trim="dataForm.jobName"
              :disabled="teamIsDisabled"
              filterable
              clearable
              style="width:100%"
              placeholder="从事工种"
            >
              <el-option
                v-for="(item, index) in workSelectList"
                :key="index"
                :label="item.title"
                :value="item.id"
              >{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="img-wrap">
            <div class="right">
              <img
                style="width:100%;height:100%"
                :src="dataForm.empNaticeplace | http2HttpsFilter"
                alt=""
              >
            </div>
            <div class="center">
              <ImgCutter @cutDown="cutDown">
                <el-button slot="open" type="primary">＜＜证件头像</el-button>
              </ImgCutter>
              <my-upload
                ref="myUpload"
                :is-show="false"
                :limit="'image'"
                :img-size="1000"
                style="margin-top: 10px"
                :title="'人脸照片＞＞'"
                :action="'/user/upload'"
                @getfileList="fileList => getFileData(fileList, 'faceUrl')"
              />
            </div>
            <div class="right rimg">
              <img
                style="width:100%;height:100%"
                :src="dataForm.faceUrl | http2HttpsFilter"
                alt=""
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="人员姓名" prop="empName">
            <el-input v-model.trim="dataForm.empName" placeholder="人员姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 后台让做的判断 90 万科 91 厦门建发-->
      <el-row v-if="['90', '91'].includes(dataForm.projectType)">
        <el-col :span="12">
          <el-form-item label="紧急联系人" prop="emergentPerson">
            <el-input
              v-model.trim="dataForm.emergentPerson"
              placeholder="紧急联系人"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急联系电话" prop="emergentPhone">
            <el-input
              v-model.trim="dataForm.emergentPhone"
              placeholder="紧急联系电话"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否为组长" prop="isTeam">
            <el-radio-group v-model.trim="dataForm.isTeam">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="empPhon">
            <el-input v-model.trim="dataForm.empPhon" placeholder="手机号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="empSex">
            <el-radio-group v-model.trim="dataForm.empSex">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签发机关" prop="idAgency">
            <el-input v-model.trim="dataForm.idAgency" placeholder="签发机关" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证有效期" prop="idValiddate">
            <el-input
              v-model.trim="dataForm.idValiddate"
              placeholder="身份证有效期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="dateOfBirth">
            <el-date-picker
              v-model="dataForm.dateOfBirth"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择出生日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证地址" prop="idAddress">
            <el-input
              v-model.trim="dataForm.idAddress"
              placeholder="身份证地址"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="nativePlace">
            <el-input v-model.trim="dataForm.nativePlace" placeholder="籍贯" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="入场日期" prop="startTime">
            <el-date-picker
              v-model.trim="dataForm.startTime"
              style="width:100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="入场日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况" prop="isMarry">
            <el-radio-group v-model.trim="dataForm.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否加入工会" prop="isLabunion">
            <el-radio-group v-model.trim="dataForm.isLabunion">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- :rules="[{ required: dataForm.projectRegion === '350000', message: '学历不能为空', trigger: 'blur' }]"
            判断为350000福建省学历必填
            判断为410000河南省学历必填
           -->
          <el-form-item
            :rules="[
              {
                required:
                  ['100', '93', '94', '111'].includes(dataForm.projectType) ||
                  ['350000', '410000', '140000'].includes(
                    dataForm.projectRegion
                  ) ||
                  isDongGuan || isQingYuan || isMeiZhou || isJiangMen || isJiangMen || SCZIYANG,
                message: '学历不能为空',
                trigger: 'blur'
              }
            ]"
            label="学历"
            prop="education"
          >
            <el-select
              v-model.trim="dataForm.education"
              style="width:100%"
              placeholder="请选择学历"
            >
              <el-option label="小学" value="小学"> 小学 </el-option>
              <el-option label="初中" value="初中"> 初中 </el-option>
              <el-option label="高中" value="高中"> 高中 </el-option>
              <el-option label="中专" value="中专"> 中专 </el-option>
              <el-option label="大专" value="大专"> 大专 </el-option>
              <el-option label="本科" value="本科"> 本科 </el-option>
              <el-option label="硕士" value="硕士"> 硕士 </el-option>
              <el-option label="博士" value="博士"> 博士 </el-option>
              <el-option label="其他" value="其他"> 其他 </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="获得证书" prop="credential">
            <el-input
              v-model.trim="dataForm.credential"
              placeholder="获得证书"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="empNation">
            <el-input v-model.trim="dataForm.empNation" placeholder="民族" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            :rules="[
              {
                required:
                  isJiangMen || ['93'].includes(dataForm.projectType),
                message: '账户类型不能为空',
                trigger: 'blur'
              }
            ]"
            label="账户类型"
            prop="accountType"
          >
            <el-input
              v-model.trim="dataForm.accountType"
              placeholder="账户类型"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="[
              {
                required:
                  isQingYuan || isHuiZhou || isJiangMen || ['100', '93'].includes(dataForm.projectType),
                message: '开户行不能为空',
                trigger: 'blur'
              }
            ]"
            label="开户行"
            prop="empBankname"
          >
            <el-select
              v-model="dataForm.empBankname"
              filterable
              style="width:100%"
              placeholder="开户行"
            >
              <el-option
                v-for="(item, index) in bankTypes"
                :key="index"
                :label="item.title"
                :value="item.title"
              >{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="银行账号"
            :rules="[
              {
                required:
                  ['100', '93'].includes(dataForm.projectType) || isQingYuan || isHuiZhou || isMeiZhou || isJiangMen || SCZIYANG,
                message: '银行账号不能为空',
                trigger: 'blur'
              }
            ]"
            prop="empCardnum"
          >
            <el-input
              v-model.trim="dataForm.empCardnum"
              placeholder="银行账号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="[
              {
                required: isHuiZhou,
                message: '开户地址不能为空',
                trigger: 'blur'
              }
            ]"
            label="开户地址"
            prop="accountAddress"
          >
            <el-input
              v-model.trim="dataForm.accountAddress"
              placeholder="开户地址"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="安全教育培训" prop="isTrain">
            <el-radio-group v-model.trim="dataForm.isTrain">
              <el-radio :label="1">合格</el-radio>
              <el-radio :label="0">不合格</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model.trim="dataForm.email" placeholder="电子邮件" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- :rules="[{ required: dataForm.projectRegion === '350000', message: '政治面貌不能为空', trigger: 'blur' }]"
            判断为350000福建省学历必填
           -->
          <el-form-item
            :rules="[
              {
                required:
                  ['93', '94'].includes(dataForm.projectType) ||
                  ['350000', '410000', '140000'].includes(
                    dataForm.projectRegion
                  ) || isDongGuan || isQingYuan || isMeiZhou || isJiangMen || SCZIYANG,
                message: '政治面貌不能为空',
                trigger: 'blur'
              }
            ]"
            label="政治面貌"
            prop="politicalOutlook"
          >
            <el-select
              v-model.trim="dataForm.politicalOutlook"
              style="width:100%"
              placeholder="请选择政治面貌"
            >
              <el-option label="中共党员" value="中共党员">
                中共党员
              </el-option>
              <el-option label="农工党党员" value="农工党党员">
                农工党党员
              </el-option>
              <el-option label="致公党党员" value="致公党党员">
                致公党党员
              </el-option>
              <el-option label="台盟盟员" value="台盟盟员">
                台盟盟员
              </el-option>
              <el-option label="中共预备党员" value="中共预备党员">
                中共预备党员
              </el-option>
              <el-option label="民建会员" value="民建会员">
                民建会员
              </el-option>
              <el-option label="共青团员" value="共青团员">
                共青团员
              </el-option>
              <el-option label="民革党员" value="民革党员">
                民革党员
              </el-option>
              <el-option label="九三学社社员" value="九三学社社员">
                九三学社社员
              </el-option>
              <el-option label="群众" value="群众"> 群众 </el-option>
              <el-option label="民进会员" value="民进会员">
                民进会员
              </el-option>
              <el-option label="民盟盟员" value="民盟盟员">
                民盟盟员
              </el-option>
              <el-option label="无党派人士" value="无党派人士">
                无党派人士
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预退场日期" prop="mayEndTime">
            <el-date-picker
              v-model.trim="dataForm.mayEndTime"
              style="width:100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="预退场日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="dataForm.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入备注信息"
        />
      </el-form-item>
      <div class="salary-type">
        <el-divider content-position="left">薪资情况</el-divider>
        <el-form-item label="薪资计算方式" prop="salaryType">
          <el-radio-group v-model.trim="dataForm.salaryType">
            <el-radio :label="1">工时</el-radio>
            <el-radio :label="2">工量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="dataForm.salaryType === 2"
          label="计量单位"
          prop="unit"
        >
          <el-select
            v-model.trim="dataForm.unit"
            style="width:50%"
            clearable
            placeholder="计量单位"
          >
            <el-option
              v-for="(item, index) in asyncList"
              :key="index"
              :label="item.title"
              :value="item.id"
            >
              {{ item.title }}
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="golobal-title-style">身份证照片</div>
      <div class="idCode-wrap">
        <div class="front">
          <img
            v-if="dataForm.idphotoScan"
            style="width:100%;height:100%"
            :src="dataForm.idphotoScan | http2HttpsFilter"
            alt=""
          >
          <div v-else class="defualt">身份证正面照片</div>
          <my-upload
            ref="myUpload"
            :is-show="true"
            :limit="'image'"
            class="upload-btn"
            :title="'身份证正面照片'"
            :action="'/user/upload'"
            @getfileList="fileList => getFileData(fileList, 'idphotoScan')"
          />
        </div>
        <div class="back">
          <img
            v-if="dataForm.idphotoScan2"
            style="width:100%;height:100%"
            :src="dataForm.idphotoScan2 | http2HttpsFilter"
            alt=""
          >
          <div v-else class="defualt">身份证反面照片</div>
          <my-upload
            ref="myUpload"
            :is-show="true"
            :limit="'image'"
            class="upload-btn"
            :title="'身份证反面照片'"
            :action="'/user/upload'"
            @getfileList="fileList => getFileData(fileList, 'idphotoScan2')"
          />
        </div>
      </div>
      <div class="golobal-title-style">银行卡照片</div>
      <div class="">
        <div class="img">
          <div>
            <img
              v-if="dataForm.bankCardUrl"
              style="width:320px;height:200px;display:inline-block"
              :src="dataForm.bankCardUrl | http2HttpsFilter"
              alt=""
            >
            <div
              v-else
              style="width:320px;height:200px;line-height: 200px;background:#f5f7fa;text-align:center"
            >
              银行卡照片
            </div>
          </div>
          <div>
            <my-upload
              ref="myUpload"
              :is-show="true"
              :limit="'image'"
              style="display:inline-block;margin:20px 0 20px 115px"
              class="upload-btn"
              :title="'银行卡照片'"
              :action="'/user/upload'"
              @getfileList="fileList => getFileData(fileList, 'bankCardUrl')"
            />
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  detail,
  teamList,
  workTypeList,
  getByIdCode,
  uploadHandle,
  asynDetail,
  yncList,
  getBankList
} from '@/api/project/person'
import { projectsDetail, proSelectList } from '@/api/project/team'
import ImgCutter from '@/components/yzt-img-cutter'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload,
    ImgCutter
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isDongGuan: '',
      isHuiZhou: '',
      isQingYuan: '',
      isMeiZhou: '',
      isJiangMen: '',
      SCZIYANG: '',
      asyncList: [],
      proList: [],
      teamList: [],
      teamIsDisabled: false,
      workSelectList: [],
      loginInfo: this.$store.state.user.loginInfo,
      bankTypes: [],
      dataForm: {
        id: null,
        emergentPerson: '',
        emergentPhone: '',
        companyName: '',
        contractCode: '',
        contractEnd: '',
        contractName: '',
        contractStart: '',
        teamId: '',
        remark: '',
        projectName: '',
        constructionId: '',
        jobNo: '',
        isMarry: '',
        isLabunion: '',
        education: '',
        politicalOutlook: '',
        isTeam: 0,
        jobName: '',
        empCategory: '',
        jobTypename: '',
        unit: '',
        empNaticeplace: '',
        faceUrl: '',
        empName: '',
        idCode: '',
        empNation: '',
        empSex: '男',
        salaryType: 1,
        idAgency: '',
        idValiddate: '',
        dateOfBirth: '',
        idAddress: '',
        nativePlace: '',
        bankNum: '',
        email: '',
        empPhon: '',
        accountType: '',
        empBankname: '',
        empCardnum: '',
        accountAddress: '',
        credential: '',
        isTrain: '',
        startTime: '',
        endTime: '',
        idphotoScan: '',
        idphotoScan2: '',
        bankCardUrl: ''
      },
      dataRule: {
        jobNo: [
          { required: true, message: '工人工号不能为空', trigger: 'blur' },
          {
            pattern: /^[0-9A-Za-z]{1,}$/,
            message: '工人工号由数字,字母组成',
            trigger: ['blur', 'change']
          }
        ],
        idCode: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '身份证号格式不正确',
            trigger: ['blur', 'change']
          }
        ],
        isTeam: [
          { required: false, message: '请选择是否是组长', trigger: 'blur' }
        ],
        salaryType: [
          { required: true, message: '请选择薪资计算方式', trigger: 'blur' }
        ],
        emergentPerson: [
          { required: true, message: '紧急联系人不能为空', trigger: 'blur' }
        ],
        nativePlace: [
          {
            pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/,
            message: '字符长度不能超过80',
            trigger: ['blur', 'change']
          },
          { required: false, message: '籍贯不能为空', trigger: 'blur' }
        ],
        emergentPhone: [
          { required: true, message: '紧急联系人电话不能为空', trigger: 'blur' }
        ],
        empCategory: [
          { required: true, message: '请选择人员类型', trigger: 'blur' }
        ],
        jobTypename: [
          { required: true, message: '请选择工种/岗位', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请选择计量单位', trigger: 'blur' }],
        empName: [
          { required: true, message: '请填写人员姓名', trigger: 'blur' },
          {
            pattern: /^(?=[\S\s]{1,16}$)[\S\s]*/,
            message: '字符长度不能超过16',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/,
            message: '人员姓名由数字,字母中文组成',
            trigger: ['blur', 'change']
          }
        ],
        constructionId: [
          { required: true, message: '请选择参建单位', trigger: 'blur' }
        ],
        dateOfBirth: [
          { required: true, message: '出生日期不能为空', trigger: 'blur' }
        ],
        idAddress: [
          {
            pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/,
            message: '字符长度不能超过80',
            trigger: ['blur', 'change']
          },
          { required: true, message: '身份证地址不能为空', trigger: 'blur' }
        ],
        credential: [
          {
            pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/,
            message: '字符长度不能超过80',
            trigger: ['blur', 'change']
          }
        ],
        accountAddress: [
          {
            pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/,
            message: '字符长度不能超过80',
            trigger: ['blur', 'change']
          }
        ],
        email: [
          {
            pattern: /^(?=[\S\s]{1,40}$)[\S\s]*/,
            message: '字符长度不能超过40',
            trigger: ['blur', 'change']
          }
        ],
        remark: [
          {
            pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/,
            message: '字符长度不能超过160',
            trigger: ['blur', 'change']
          }
        ],
        accountType: [
          {
            pattern: /^(?=[\S\s]{1,20}$)[\S\s]*/,
            message: '字符长度不能超过20',
            trigger: ['blur', 'change']
          }
        ],
        jobName: [
          { required: true, message: '从事工种不能为空', trigger: 'blur' }
        ],
        idAgency: [
          {
            pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/,
            message: '字符长度不能超过80',
            trigger: ['blur', 'change']
          },
          { required: true, message: '签发机关不能为空', trigger: 'blur' }
        ],
        // education: [
        //   { required: true, message: '学历不能为空', trigger: 'blur' }
        // ],
        // politicalOutlook: [
        //   { required: true, message: '政治面貌不能为空', trigger: 'blur' }
        // ],
        // empBankname: [
        //   { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] },
        //   { required: false, message: '开户行不能为空', trigger: 'blur' }
        // ],
        empCardnum: [
          {
            pattern: /^(?=[\S\s]{1,40}$)[\S\s]*/,
            message: '字符长度不能超过40',
            trigger: ['blur', 'change']
          },
          { required: false, message: '银行账号不能为空', trigger: 'blur' }
        ],
        idValiddate: [
          {
            pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/,
            message: '字符长度不能超过80',
            trigger: ['blur', 'change']
          },
          { required: true, message: '身份证有效期不能为空', trigger: 'blur' }
        ],
        teamId: [{ required: true, message: '请选择班组', trigger: 'blur' }],
        startTime: [
          { required: true, message: '请选择入场日期', trigger: 'blur' }
        ],
        empNation: [
          { required: true, message: '民族不能为空', trigger: 'blur' },
          {
            pattern: /^(?=[\S\s]{1,8}$)[\S\s]*/,
            message: '字符长度不能超过8',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[\u4e00-\u9fa5]{1,}$/,
            message: '请输入中文',
            trigger: ['blur', 'change']
          }
        ],
        empPhon: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: ['blur', 'change']
          }
        ],
        companyType: [
          {
            required: true,
            message: '请选择单位类型',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    this.getDetail()
    this.optionList('JOB_TYPENAME_SZZJJ')
    this.optionList('EMP_TYPR_SZZJJ')
    this.asyncHandle()
  },
  methods: {
    // 获取人员基本信息详情
    getDetail() {
      this.dataForm.projectId =
        this.loginInfo.projectId || this.dataForm.projectId
      this.$nextTick(async() => {
        if (this.id) {
          this.dataForm = await this.getOne()
          const { projectId, constructionId, teamId } = this.dataForm
          await this.getProjectsDetail(projectId)
          await this.getTeamList(constructionId, projectId)
          this.selectTeamChange(teamId)
        } else {
          this.dataForm.thirdCode = null
        }
        await this.getProjectsDetail(this.dataForm.projectId)
        this.getProSelectList(this.dataForm.projectId)
        this.getBankListHandle(this.dataForm.projectId)
        this.getWorkSelectList(
          this.dataForm.projectId,
          this.dataForm.constructionId
        ) // 工种下拉
      })
    },
    // 某条人员基本信息详情接口
    getOne() {
      return detail({ id: this.id }).then(data => {
        this.dataForm = { ...this.dataForm, ...data.result }
        return this.dataForm
      })
    },
    // 根据loginInfo.projectId为参数获取所属项目中文名
    getProjectsDetail(id) {
      return projectsDetail({ id }).then(data => {
        // 根据loginInfo.projectId为参数获取所属项目中文名
        this.$set(this.dataForm, 'projectName', data.result.projectName)
        // 90 万科 // 91 厦门建发平台 // 93 全国 // 94 广州水务局平台
        this.$set(this.dataForm, 'projectType', data.result.projectType)
        const region = data.result.projectRegion
        // 350000 福建省
        const projectRegion =
          region && region.split(',').length ? region.split(',')[0] : ''
        this.$set(this.dataForm, 'projectRegion', projectRegion)
        // 441900 东莞
        const isDongGuan =
          region && region.split(',').length >= 2 ? region.split(',')[1] : ''
        this.isDongGuan = isDongGuan === '441900'
        // 441300 惠州
        const isHuiZhou =
          region && region.split(',').length >= 2 ? region.split(',')[1] : ''
        this.isHuiZhou = isHuiZhou === '441300'
        // 441800 广东清远
        const isQingYuan =
          region && region.split(',').length >= 2 ? region.split(',')[1] : ''
        this.isQingYuan = isQingYuan === '441800'
        // 441400 广东省梅州平台
        const isMeiZhou =
          region && region.split(',').length >= 2 ? region.split(',')[1] : ''
        this.isMeiZhou = isMeiZhou === '441400'
        // 440700 广东江门平台
        const isJiangMen =
          region && region.split(',').length >= 2 ? region.split(',')[1] : ''
        this.isJiangMen = isJiangMen === '440700'
        // 512000 四川资阳
        const SCZIYANG =
          region && region.split(',').length >= 2 ? region.split(',')[1] : ''
        this.SCZIYANG = SCZIYANG === '512000'
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 所属参建单位选择列表
    getProSelectList(id) {
      const obj = this.id ? { id } : { id, status: 0 }
      proSelectList(obj).then(data => {
        this.proList = data && data.result ? data.result : []
      })
    },
    // 计量单位
    asyncHandle(id) {
      yncList({ category: 'UNIT' }).then(data => {
        this.asyncList = data.result
      })
    },
    // 身份证查询的信息
    getByIdCodeInfo() {
      if (this.dataForm.idCode) {
        getByIdCode({ idCode: this.dataForm.idCode }).then(data => {
          this.dataForm = {
            ...this.dataForm,
            ...data.result,
            id: this.id ? this.id : ''
          }
        })
      }
    },
    // 同步属性下拉
    optionList(category) {
      asynDetail({ category }).then(data => {
        if (category === 'JOB_TYPENAME_SZZJJ') this.list1 = data.result
        if (category === 'EMP_TYPR_SZZJJ') this.list3 = data.result
      })
    },
    // 获取银行
    getBankListHandle(projectId) {
      getBankList({ projectId }).then(data => {
        this.bankTypes = data.result
      })
    },
    // 工种选择列表
    getWorkSelectList(projectId, constructionId) {
      workTypeList({ projectId, constructionId }).then(data => {
        this.workSelectList = (data && data.result) || []
      })
    },
    // 所属班组选择列表
    getTeamList(constructionId, projectId) {
      const obj = this.id
        ? { constructionId, projectId }
        : { constructionId, projectId, status: 0 }
      return teamList(obj).then(data => {
        data && (this.teamList = data.result)
      })
    },
    // 选择参建单位，加载所属班组
    selectChange(constructionId) {
      this.dataForm.teamId = ''
      this.dataForm.jobName = ''
      this.getTeamList(constructionId, this.dataForm.projectId)
      this.getWorkSelectList(this.dataForm.projectId, constructionId)
    },
    // 选择班组
    selectTeamChange(teamId) {
      const team = this.teamList.find(item => item.id === teamId)
      // 从事工种是否禁用逻辑
      this.teamIsDisabled =
        (this.dataForm.projectRegion === '140000' ||
        (this.isQingYuan && this.dataForm.projectType !== '111') ||
        this.isMeiZhou || this.isJiangMen) &&
        team && team.teamType !== '900'
      // 如果是新增 或者 从事工种禁用， 清空从事工种
      if (!this.id || this.teamIsDisabled) this.dataForm.jobName = ''
    },
    // 证件头像裁剪
    cutDown(a) {
      uploadHandle({ file: a.file }).then(data => {
        this.$set(this.dataForm, 'empNaticeplace', data.result)
      })
    }
  }
}
</script>

<style lang="scss">
.base-info {
  .img-wrap {
    margin: 0 0 0 20px;
    display: flex;
    .center {
      padding: 40px 8px 0;
    }
    .right {
      width: 180px;
      height: 200px;
      border: 1px solid #c3c3c3;
    }
  }
  .salary-type {
    margin: 25px 0;
    border: 1px solid #dcdfe6;
    border-top: none;
    border-radius: 3px;
    .el-divider {
      .el-divider__text {
        font-weight: 600;
      }
    }
  }
  .async-set {
    margin: 25px 0;
    border: 1px solid #dcdfe6;
    border-top: none;
    border-radius: 3px;
    .el-divider {
      margin-top: -2px;
      .el-divider__text {
        font-weight: 600;
      }
    }
  }
  .idCode-wrap {
    display: flex;
    height: 270px;
    .defualt {
      width: 100%;
      height: 100%;
      line-height: 200px;
      background: #f5f7fa;
    }
    .front {
      width: 320px;
      height: 200px;
      margin: 0 40px 20px 0;
      text-align: center;
    }
    .back {
      width: 320px;
      height: 200px;
      text-align: center;
    }
    .upload-btn {
      margin-top: 10px;
    }
  }
  .bank-wrap {
    display: flex;
    .img {
      width: 320px;
      height: 200px;
    }
  }
}
</style>
