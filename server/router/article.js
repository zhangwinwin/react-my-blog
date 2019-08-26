import Router from 'koa-router'
import { createArticle, updateArticle, getArticleById, getArticleList, deleteArticle } from '../controllers/article'

const router = new Router()

router.post('/create', createArticle)
router.post('/update', updateArticle)
router.get('/:id', getArticleById)
router.get('/', getArticleList)
router.delete('/:id', deleteArticle)
export default router