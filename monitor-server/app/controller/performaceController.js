'use strict';
const BaseController = require('./baseController');

class PerformaceController extends BaseController {

  async getPerformace() {
    try {
      const { performaceService } = this.ctx.service;

      const res = await performaceService.getPerformace();

      console.log(res)

      if (res) {
        this.successRes({ data: res });
        return
      }

      this.errorRes();
    } catch (e) {
      this.errorRes();
    }
  }

  async uploadPerformace() {
    try {
      const { performaceService } = this.ctx.service;

      const res = await performaceService.uploadPerformace();

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

module.exports = PerformaceController;
