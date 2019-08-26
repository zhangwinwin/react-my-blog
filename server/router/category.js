import Router from 'koa-router'
import { getCategories } from '../controllers/category'

const router = new Router()

router.get('/', getCategories)

export default router