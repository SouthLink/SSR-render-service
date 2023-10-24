'use strict';
const BaseController = require('./baseController');

class errorController extends BaseController {

  async getErrors() {
    try {
      const { errorService } = this.ctx.service;

      const res = await errorService.getErrors();

      console.log(res);

      if (res) {
        this.successRes({ data: res });
        return
      }

      this.errorRes();
    } catch (e) {
      this.errorRes();
    }
  }

  async uploadErrors() {
    try {
      const { errorService } = this.ctx.service;

      const res = await errorService.uploadErrors();

      console.log(res);

      if (res) {
        this.successRes();
        return
      }

      this.errorRes();
    } catch (e) {
      this.errorRes();
    }
  }
}

module.exports = errorController;
