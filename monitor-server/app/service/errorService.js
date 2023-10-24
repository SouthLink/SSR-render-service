'use strict';
const Service = require('egg').Service;

class ErrorService extends Service {

  async getErrors() {
    const mysql = this.app.mysql;
    const errorRes = await mysql.query('select * from error');

    console.log(errorRes);
    return errorRes;
  }

  async uploadErrors() {
    const body = this.ctx.request.body;
    const mysql = this.app.mysql;
    const { stack } = body;

    console.log(stack);
    
    const errorRes = await mysql.insert('error', stack).catch(e => {
      console.log(e);
    });

    console.log(errorRes);
    return true;
  }
}

module.exports = ErrorService;
