const router = require('koa-router')();

const { demoController } = require('../../controller');

const routers = router
	.post('create', demoController.create)
	.get('getList', demoController.getList)
	.post('update', demoController.update)
	.post('delete', demoController.delete);

module.exports = routers;
