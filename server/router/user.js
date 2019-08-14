import Router from 'koa-router'
import  { updateUser, deleteUser } from '../controllers/user'
const router = new Router()

router.put('/:id', updateUser)
router.delete('/delete', deleteUser)

export default router