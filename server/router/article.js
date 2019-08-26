import Router from 'koa-router'
import { createArticle, updateArticle, getArticleById } from '../controllers/article'

const router = new Router()

router.post('/create', createArticle)
router.post('/update', updateArticle)
router.get('/:id', getArticleById)
export default router