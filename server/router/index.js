import Router from 'koa-router'
import { register, userlogin } from '../controllers/user'
import userRouter from './user'
import articleRouter from './article'
const router = new Router({
  prefix: '/api'
})

router.use('/users', userRouter.routes())
router.use('/articles', articleRouter.routes())

router.post('/login', userlogin)
router.post('/register', register)

router.get('/', async ctx => {
  ctx.body = 'hello koa2'
})

export default router