const Router = require('koa-router')

const router = new Router({
  prefix: '/api'
})

router.get('/', async ctx => {
  ctx.body = 'hello, koa2'
})

module.exports = router