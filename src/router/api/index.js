const router = require('koa-router')();

const demo = require('./demo');

router.use('/demo/', demo.routes(), demo.allowedMethods());

module.exports = router;
