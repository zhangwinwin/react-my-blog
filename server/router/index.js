// const Router = require('koa-router')
import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})

router.get('/', async ctx => {
  ctx.body = 'hello, koa2'
})

export default router
