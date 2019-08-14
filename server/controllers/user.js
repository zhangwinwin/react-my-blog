import Joi from 'joi'
import { regiester, login } from '../schemas/user'
import db from '../models'
import { encrypt, comparePassword } from '../lib/bcrypt'
import { createToken, checkAuth } from '../lib/token'

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

export async function updateUser (ctx) {
  const userId = parseInt(ctx.params.id)
  const { username, oldPassword, password, email } = ctx.request.body
  const user = await db.user.findByPk(userId)

  let response = {}
  let token

  if (!user.email) {
    const result = await db.user.findOne({
      where: {
        email
      }
    })
    
    if (result) {
      response = {
        code: 400,
        message: '该邮箱已被注册'
      }
    } else {
      await db.user.update({ email }, {
        where: {
          id: userId
        }
      })
      response = {
        code: 200,
        message: `已成功绑定邮箱${email}`
      }
    }
  } else {
    if (oldPassword) {
      const isMatch = await comparePassword(oldPassword, user.password)
      if (isMatch) {
        if (isMatch) {
          if (!username && !password) {
            response = {
              code: 400,
              message: '用户名/密码参数错误'
            }
          } else if (username && !password) {
            const result = await db.user.findOne({
              where: {
                username
              }
            })
            if (result) {
              response = { code: 400, message: '用户名已被占用' }
            } else {
              await db.user.update({ username }, {
                where: {
                  id: userId
                }
              })
              response = {
                code: 200,
                message: '用户名修改成功'
              }
            }
          } else if (!username && password) {
            const saltPassword = await encrypt(password)
            await db.user.update({
              password: saltPassword
            }, {
              where: {
                id: userId
              }
            })
            response = {
              code: 200,
              message: '密码修改成功'
            }
          } else {
            const saltPassword = await encrypt(password)
            await db.user.update({ username, password: saltPassword }, {
              where: {
                id: userId
              }
            })
            response = {
              code: 200,
              message: '用户名/密码修改成功'
            }
          }
        }
      } else {
        response = {
          code: 400,
          message: '密码不正确'
        }
      }
    } else {
      response = {
        code: 400,
        message: '请输入原密码验证您的身份'
      }
    }
  }
  if (response.code === 200) {
    const result = await db.user.findById(userId)
    const { username, id, email, auth } = result
    token = createToken({ username, user: id, auth, email })
    response.token = token
  }
  ctx.body = response
}

export async function deleteUser (ctx) {
  const isAuth = checkAuth(ctx)
  if (isAuth) {
    let { userId } = ctx.query
    userId = parseInt(userId)
    await db.sequelize.query(
      `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.userId=${userId}`
    )
    await db.user.destroy({
      where: {
        id: userId
      }
    })
    ctx.body = {
      code: 200,
      message: '成功删除用户'
    }
  }
}