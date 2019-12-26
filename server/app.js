import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import logger from 'koa-logger'

import router from './router'

const app = new Koa()

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return 'http://localhost:3000';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
.use(bodyparser())
.use(logger())
app.use(router.routes(), router.allowedMethods())

app.listen(3030, () => {
  console.log('app started at port 3030...')
})