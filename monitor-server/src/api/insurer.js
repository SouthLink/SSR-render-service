import qs from "qs";
import axios from "./httpConfig.js";

const prefix = "/zbh";

//  查询订单列表
export const getOrder = (params) =>
  axios.post(`${prefix}/order/page`, params).then((res) => res.data);

//  登出
export const loginOut = (params) =>
  axios
    .post(`${prefix}/user/logout`, qs.stringify(params))
    .then((res) => res.data);

//  发送验证码
export const sendSms = (params) =>
  axios.post(`${prefix}/common/sms/send`, params).then((res) => res.data);

//  注册
export const register = (params) =>
  axios.post(`${prefix}/user/register`, params).then((res) => res.data);

//
export const getCaRand = (params) =>
  axios.get(`${prefix}/user/caRand`).then((res) => res.data);

//  添加公司信息
export const addOrUpdate = (params) =>
  axios.post(`${prefix}/company/addOrUpdate`, params).then((res) => res.data);

//  公司信息
export const companyDetail = (params) =>
  axios.get(`${prefix}/company/detail`, params).then((res) => res.data);

//  承保机构
export const getInsuranceList = (params) =>
  axios.post(`${prefix}/company/insuranceList`, params).then((res) => res.data);

// 获取承保机构列表，无权限限制
export const getInstitutionList = (params) =>
  axios
    .post(`${prefix}/company/institutionList`, params)
    .then((res) => res.data);

//  项目详情 模糊查询
export const getProjectRegex = (params) =>
  axios.post(`${prefix}/project/regex`, params).then((res) => res.data);

//  项目详情 通过code精确查询
export const getProjectInfo = (params) =>
  axios.post(`${prefix}/project/info`, params).then((res) => res.data);

//  项目详情 通过name精确查询
export const getProjectNameInfo = (params) =>
  axios.post(`${prefix}/project/nameInfo`, params).then((res) => res.data);

//  投保创建订单接口
export const createOrder = (params) =>
  axios.post(`${prefix}/order/create`, params).then((res) => res.data);

//  承包人查询订单申请列表
export const getApplyPage = (params) =>
  axios.post(`${prefix}/order/applyPage`, params).then((res) => res.data);

//  是否有投保权限接口
export const orderCheck = (params) =>
  axios.post(`${prefix}/order/check`, params).then((res) => res.data);

// 投保人操作订单
export const tenderOperation = (params) =>
  axios
    .post(`${prefix}/order/tenderOperation/${params.orderNo}`, params.info)
    .then((res) => res.data);

//  承包人查询所有订单申请列表
export const getHistoryPageApply = (params) =>
  axios.post(`${prefix}/order/historyPage`, params).then((res) => res.data);

//  承包人查询订单申请列表
export const getDetail = (params) =>
  axios.post(`${prefix}/order/detail/${params}`).then((res) => res.data);

//  承包人操作订单
export const insurerOperation = (params) =>
  axios
    .post(`${prefix}/order/insurerOperation/${params.orderNo}`, params.info)
    .then((res) => res.data);

//  是否需要上传投保附件
export const isSectionUpload = (params) =>
  axios
    .post(`${prefix}/order/isUpload/${params.sectionCode}`)
    .then((res) => res.data);

export const getOperators = (params) =>
  axios.get(`${prefix}/company/operators`).then((res) => res.data);

export const setupRate = (params) =>
  axios.post(`${prefix}/company/setupRate`, params).then((res) => res.data);

export const getRate = (params) =>
  axios.post(`${prefix}/company/rateInfo`, params).then((res) => res.data);

// 是否承保机构有订单列表权限接口
export const checkInsurance = (params) =>
  axios.post(`${prefix}/order/checkInsurance`, params).then((res) => res.data);

// 产品列表
export const getProjectList = (params) =>
  axios.post(`${prefix}/project/regexPage`, params).then((res) => res.data);
// 新增产品列表
export const projectAdd = (params) =>
  axios.post(`${prefix}/project/add`, params).then((res) => res.data);
// 批量上传
export const uploadFiles = (form) =>
  axios
    .post(`${prefix}/common/image/multiUpload`, form)
    .then((res) => res.data);
// 批量上传
export const updateInvoice = (params) =>
  axios.post(`${prefix}/company/updateInvoice`, params).then((res) => res.data);
