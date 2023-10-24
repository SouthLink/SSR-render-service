import qs from "qs";
import axios from "./httpConfig.js";

const prefix = "http://127.0.0.1:8000/api";

/* ————————————登录———————————— */

//  登录
// export const login = (params) =>
//   axios.post(`${prefix}/user/login`, params).then((res) => res.data);

// //  登出
// export const loginOut = (params) =>
//   axios
//     .post(`${prefix}/user/logout`, qs.stringify(params))
//     .then((res) => res.data);

// //  发送验证码
// export const sendSms = (params) =>
//   axios.post(`${prefix}/common/sms/send`, params).then((res) => res.data);

//  注册
export const register = (params) =>
  axios.post(`${prefix}/user/register`, params).then((res) => res.data);

export const getError = (params) =>
  axios.get(`${prefix}/errors/getError`, params).then((res) => res.data);

export const getPerformace = (params) =>
  axios
    .get(`${prefix}/performace/getPerformace`, params)
    .then((res) => res.data);

export const getFetchError = (params) =>
  axios
    .get(`${prefix}/fetchIntercept/getFetchError`, params)
    .then((res) => res.data);
