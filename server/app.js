import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import logger from 'koa-logger'

import router from './router'

const app = new Koa()

app.use(cors())
.use(bodyparser())
.use(logger())
app.use(router.routes(), router.allowedMethods())

app.listen(3030, () => {
  console.log('app started at port 3030...')
})