import Router from 'koa-router'
import  { createComment, replyComment, deleteReply, getAboutComments } from '../controllers/comment'
const router = new Router()

router.post('/', createComment)
router.post('/reply', replyComment)
router.delete('/', deleteReply)
router.get('/', getAboutComments)

export default router