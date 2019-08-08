const router = require('koa-router')()

router.get('/', async ctx => {
  ctx.body = 'hello, koa2'
})

module.exports = router