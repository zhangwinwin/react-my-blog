import Router from 'koa-router'
import { createArticle } from '../controllers/article'

const router = new Router()

router.post('/create', createArticle)
export default router