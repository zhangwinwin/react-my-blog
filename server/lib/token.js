import jwt from 'jsonwebtoken'
import Token from '../config'

export function createToken (info) {
  const token = jwt.sign(info, Token.TOKEN_SECRET, { expiresIn: Token.TOKEN_EXPIRESIN})
  console.log('generated token')
  return token
}

export function decodeToken (ctx) {
  const authorizationHeader = ctx.header['authorization']
  const token = authorizationHeader.split(' ')[1]
  return jwt.decode(token)
}

export function checkAuth (ctx) {
  const { auth } = decodeToken(ctx)
  if (auth === 1) {
    return true
  } else {
    ctx.body = { code: 401, message: '您无权限进行此操作' }
    return false
  }
}