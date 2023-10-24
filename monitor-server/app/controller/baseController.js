'use strict';

const Controller = require('egg').Controller;
class errorController extends Controller {

  successRes(body) {
    this.ctx.statusCode = 200;
    this.ctx.response.type = 'json';
    this.ctx.body = {
      message: 'upload success!',
      code: 200,
      ...body
    };
    return
  }  

  errorRes(body) {
    this.ctx.statusCode = 500;
    this.ctx.response.type = 'json';
    this.ctx.body = {
      message: 'service error',
      code: 500,
      ...body
    };
  }
}

module.exports = errorController;
