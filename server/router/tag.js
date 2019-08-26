import Router from 'koa-router'
import { getTags} from '../controllers/tag'

const router = new Router()

router.get('/', getTags)

export default router