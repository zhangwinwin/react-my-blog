import jwt from 'jsonwebtoken'
import { TOKEN_SECRET, TOKEN_EXPIRESIN } from '../config'

export function createtoken (info) {
  const token = jwt(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN})
  console.log('generated token')
  return token
}

export function decodeToken (ctx) {
  const authorizationHeader = ctx.header['authorization']
  const token = authorizationHeader.split(' ')[1]
  return jwt.decode(token)
}

export function checkAuto (ctx) {
  const { auth } = decodeToken(ctx)
  if (auth === 1) {
    return true
  } else {
    ctx.body = { code: 401, message: '您无权限进行此操作' }
    return false
  }
}