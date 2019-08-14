import Joi from 'joi'
import { regiester, login } from '../schemas/user'
import db from '../models'
import { encrypt, comparePassword } from '../lib/bcrypt'
import { createToken } from '../lib/token'

export async function register (ctx) {
  const { username, password, email } = ctx.request.body
  let response

  // 注册信息校验
  const validator = Joi.validate({ username, password, email}, regiester)
  if (validator.error) {
    response = {
      code: 400,
      message: validator.error.message
    }
  } else {
    const result = await db.user.findOne({
      where: { email }
    })
    if (result) {
      response = {
        code: 400,
        message: "邮箱已被注册"
      }
    } else {
      const user = await db.user.findOne({
        where: { username }
      })
      if (user) {
        response = {
          code: 400,
          message: "用户名已被注册"
        }
      } else {
        const saltPassword = await encrypt(password)
        await db.user.create({
          username,
          password: saltPassword,
          email
        })
        response = {
          code: 200,
          message: '注册成功'
        }
      }
    }
  }
  ctx.body = response
}

export async function userlogin (ctx) {
  const { account, password } = ctx.request.body
  // 校验登陆
  const validate = Joi.validate({ account, password }, login)
  console.log('account', account)
  let response
  if (validate.error) {
    response = {
      code: 400,
      message: validate.error.message
    }
  } else {
    const user = await db.user.findOne({
      $or: [
        {
          where: {
            username: account
          }
        },
        {
          where: {
            email: account
          }
        }
      ]
    })
    if (!user) {
      response = {
        code: 400,
        message: '用户不存在'
      }
    } else {
      const isMatch = await comparePassword(password, user.password)
      if (!isMatch) {
        response = {
          code: 400,
          message: '密码不正确'
        }
      } else {
        const { id, auth } = user
        const token = createToken({
          username: user.username,
          userId: id,
          auth,
          email: user.email
        })
        response = {
          code: 200,
          message: '登录成功',
          username: user.username,
          auth: user.auth,
          token
        }
      }
    }
  }
  ctx.body = response
}