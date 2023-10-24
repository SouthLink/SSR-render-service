'use strict';
const Service = require('egg').Service;

class PerformaceService extends Service {

  async getPerformace() {
    const mysql = this.app.mysql;
    const performaceRes = await mysql.query('select * from performance');

    console.log(performaceRes);
    return performaceRes
  }

  async uploadPerformace() {
    const body = this.ctx.request.body;
    const mysql = this.app.mysql;
    const { stack } = body;

    console.log(stack);
    
    const performaceRes = await mysql.insert('performance', stack).catch(e => {
      console.log(e);
    });;

    console.log(performaceRes);
    return true;
  }
}

module.exports = PerformaceService;
