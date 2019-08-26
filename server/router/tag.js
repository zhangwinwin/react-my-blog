import Router from 'koa-router'
import { getTags, getArticlesByTag } from '../controllers/tag'

const router = new Router()

router.get('/', getTags)
router.get('/article', getArticlesByTag)

export default router