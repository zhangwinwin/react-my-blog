import db from './db'
// const isDev = process.env.NODE_ENV === 'development'

const TOKEN_SECRET = 'blog-token'
const TOKEN_EXPIRESIN = '720h'
export default {
  db,
  TOKEN_SECRET,
  TOKEN_EXPIRESIN
}
