'use strict';
const Service = require('egg').Service;

class FetchInterceptService extends Service {

  async getFetchError() {
    const mysql = this.app.mysql;
    const errorRes = await mysql.query('select * from fetchIntercept');

    console.log(errorRes);
    return errorRes
  }

  async uploadFetchErrors() {
    const body = this.ctx.request.body;
    const mysql = this.app.mysql;
    const { stack } = body;

    console.log(stack);
    
    const errorRes = await mysql.insert('fetchIntercept', stack).catch(e => {
      console.log(e);
    });;

    console.log(errorRes);
    return true;
  }
}

module.exports = FetchInterceptService;
