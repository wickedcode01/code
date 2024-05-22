'use strict';

module.exports = app => {
  const { router, controller,jwt } = app;

  router.get('/api', controller.home.index);

//sss
  router.post('/api/user/register',controller.user.register);

  router.post('/api/user/login',controller.user.login);

  router.get('/api/test',jwt,controller.home.index);

  router.post('/api/addRecord',controller.record.addRecord);

  router.get('/api/findRecord',controller.record.find);

  router.get('/api/countRecord',controller.record.count);

  router.post('/api/finishRecord',controller.record.finishRecord);

  router.get('/api/getNotice',controller.home.getNotice);

  router.post('/api/addNotice',controller.home.addNotice);

};

