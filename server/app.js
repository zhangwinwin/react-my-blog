const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const logger = require('koa-logger')

const router = require('./router')

const app = new Koa()

app.use(router.routes(), router.allowedMethods())
app.use(cors())
  .use(bodyparser())
  .use(logger())

app.listen(3030, () => {
})