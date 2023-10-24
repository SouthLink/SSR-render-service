
const userAgent = require('user-agent');
const { API_HOST, API_URL } = require('../config/index');

function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent).name,
        //用户ID
    }
}


class SendTracker {
    constructor() {
        this.url = API_HOST;
        this.xhr = new XMLHttpRequest;
    }
    send(url = API_URL, data = {}) {
        let extraData = getExtraData();
        let log = { ...extraData, ...data };
        //对象 的值不能是数字
        for (let key in log) {
            if (typeof log[key] === 'number') {
                log[key] = `${log[key]}`;
            }
        }
        console.log('log', log);
        let body = JSON.stringify({
            stack: log
        });
        this.xhr.open('POST', API_HOST + url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0');
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length);
        this.xhr.onload = function () {
            // console.log(this.xhr.response);
        }
        this.xhr.onerror = function (error) {
            //console.log(error);
        }
        this.xhr.withCredentials = true;
        this.xhr.send(body);
    }
}
export default new SendTracker();