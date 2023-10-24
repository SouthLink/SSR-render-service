'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // api
  router.get('/api/errors/getError', controller.errorController.getErrors);
  router.post('/api/errors/upload', controller.errorController.uploadErrors);

  router.get('/api/performace/getPerformace', controller.performaceController.getPerformace);
  router.post('/api/performace/upload', controller.performaceController.uploadPerformace);

  router.get('/api/fetchIntercept/getFetchError', controller.fetchInterceptCountroller.getFetchError);
  router.post('/api/fetchIntercept/upload', controller.fetchInterceptCountroller.uploadFetchErrors);
};
