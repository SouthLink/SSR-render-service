// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportErrorService = require('../../../app/service/errorService');
import ExportFetchInterceptService = require('../../../app/service/fetchInterceptService');
import ExportPerformaceService = require('../../../app/service/performaceService');

declare module 'egg' {
  interface IService {
    errorService: AutoInstanceType<typeof ExportErrorService>;
    fetchInterceptService: AutoInstanceType<typeof ExportFetchInterceptService>;
    performaceService: AutoInstanceType<typeof ExportPerformaceService>;
  }
}
