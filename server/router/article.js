import Router from 'koa-router'
import { createArticle, updateArticle } from '../controllers/article'

const router = new Router()

router.post('/create', createArticle)
router.post('/update', updateArticle)
export default router