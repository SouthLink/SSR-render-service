const crypto = require('crypto');
const podRole = process.env.POD_ROLE;


const urlWhiteList = {

}

// 不进入 url mobile 缓存页面
const cacheUrlWhiteList = [

]



/**
  * @description 验证url正确性
  * @param {string} 
  * @returns {boolean}  
*/
const isValidPageUrl = (pageUrl) => /^https?:\/\/.+\..+$/.test(pageUrl);

/**
  * @description 去除 url ？#及后面的参数
  * @param {string} 
  * @returns {string}  
*/
const urlExcludeArgs = (url) => {
  let result = url;
  const searchIndex = url.indexOf('?');
  if (searchIndex !== -1) {
    result = result.slice(0, searchIndex);
  }
  const anchorIndex = url.indexOf('#');
  if (anchorIndex !== -1) {
    result = result.slice(0, anchorIndex);
  }
  return result;
};

/**
  * @description 获取 url ?后的参数
  * @param {string} 
  * @returns {array}  
*/
const getUrlParam = (href) => {
  let name, value;
  let str = href;
  let num = str.indexOf("?");

  str = str.substr(num + 1);

  let arr = str.split("&");
  let json = {};

  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      json[name] = value;
    }
  }

  return json;
}

/**
  * @description 根据白名单排除无用的参数
  * @param {string} url 
  * @param {array} whiteList 参数白名单
  * @returns {string} url 
*/
const urlExcludeForWhiteList = (url, whiteList = []) => {
  if (url.indexOf('?') === -1) return url;

  const params = getUrlParam(url);
  let cleanUrl = urlExcludeArgs(url);

  try {
    for (let i = 0; i < whiteList.length; i++) {
      if (params?.[whiteList[i]] !== undefined) {
        let prefix = cleanUrl.indexOf('?') === -1 ? '?' : '&';

        cleanUrl += `${prefix}${whiteList[i]}=${params?.[whiteList[i]]}`
      }
    }
  } catch (e) {
    return url;
  }

  return cleanUrl;
}

/**
  * @description 根据 url白名单 过滤生成 url
  * @param {string} url 
  * @returns {string} url 
*/
function formatUrlForWhiteList(url) {
  if (!url) return url;

  const list = Object.values(urlWhiteList);

  for (let i = 0; i < list.length; i++) {
    if (list[i].test(url)) {
      return urlExcludeArgs(url);
    }
  }

  // 去除掉筛选页无用参数
  return url;
}

/**
  * @description 根据url生成唯一的md5key, 用于s3 file key
  * @param {string} orgUrl 不带https的url 
  * @param {string} ctx app context
  * @returns {string} url 'url/md5key'
*/
const genCacheKey = (orgUrl, ctx) => {
  let url = null;

  try {
    orgUrl = formatUrlForWhiteList(orgUrl);
    url = new URL(`https://${orgUrl}`);
  } catch (e) {
    return null
  }
  
  const md5 = crypto.createHash('md5');
  const urlResult = getDevice(ctx.request.headers["user-agent"]) === 'mobile' ?
                      (url + 'mobile').toString().replace(/[?&]*force=1/, '') :
                      url.toString().replace(/[?&]*force=1/, '');

  const key = md5.update(urlResult).digest('hex');

  return `${url.hostname}/${key}`
}

const getWorkerCunsumeKey = (prefix = 'seo-queue', env) => {
  return `${prefix}-${env}`
}

const getPodKey = (total = 5) => {
  return Math.floor(Math.random() * total + 1);
}

/**
  * @description 区分触屏和pc
  * @param {string} ua request user-agent
  * @returns {string} mobile or desktop
*/
function getDevice(ua) {
  var deviceAgent = ua.toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if (agentID) {
    return "mobile";
  } else {
    return "desktop";
  }
}

/**
  * @description 发起 redis 消费队列
  * @param {object} app egg app
  * @param {string} key url md5 key
  * @param {string} url
*/
const createRedisQueue = (app, key, url) => {
  app.messenger.sendToAgent('add-redis-queue', {
    key,
    url
  });
}

module.exports = {
  isValidPageUrl,
  urlExcludeArgs,
  genCacheKey,
  getWorkerCunsumeKey,
  getPodKey,
  getDevice,
  createRedisQueue
}