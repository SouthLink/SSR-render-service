'use strict';
const BaseController = require('./baseController');

class fetchInterceptCountroller extends BaseController {

  async getFetchError() {
    try {
      const { fetchInterceptService } = this.ctx.service;

      const res = await fetchInterceptService.getFetchError();

      if (res) {
        this.successRes({ data: res });
        return
      }

      this.errorRes();
    } catch (e) {
      this.errorRes();
    }
  }

  async uploadFetchErrors() {
    try {
      const { fetchInterceptService } = this.ctx.service;

      const res = await fetchInterceptService.uploadFetchErrors();

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

module.exports = fetchInterceptCountroller;
