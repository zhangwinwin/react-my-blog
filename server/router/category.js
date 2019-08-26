import Router from 'koa-router'
import { getCategories, getArticlesByCate } from '../controllers/category'

const router = new Router()

router.get('/', getCategories)
router.get('/article', getArticlesByCate)

export default router