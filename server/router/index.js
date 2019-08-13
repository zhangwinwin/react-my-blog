import Router from 'koa-router'
import { register, userlogin } from '../controllers/user'
const router = new Router({
  prefix: '/api'
})

router.post('/login', userlogin)
router.post('/register', register)

router.get('/', async ctx => {
  ctx.body = 'hello koa2'
})

export default router
