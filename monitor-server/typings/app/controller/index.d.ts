// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController = require('../../../app/controller/baseController');
import ExportErrorController = require('../../../app/controller/errorController');
import ExportFetchInterceptCountroller = require('../../../app/controller/fetchInterceptCountroller');
import ExportHome = require('../../../app/controller/home');
import ExportPerformaceController = require('../../../app/controller/performaceController');

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    errorController: ExportErrorController;
    fetchInterceptCountroller: ExportFetchInterceptCountroller;
    home: ExportHome;
    performaceController: ExportPerformaceController;
  }
}
