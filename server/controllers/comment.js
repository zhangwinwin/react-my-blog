import db from '../models'
import { decodeToken, checkAuth } from '../lib/token'
import Joi from 'joi'
import commentSchema from '../schemas/comment'

/**
 * 获取评论详情
 */
function fetchCommentDetail (commentId) {
  return db.comment.findAndCountAll({
    where: {
      id: commentId
    },
    attributes: ['id', 'userId', 'content', 'createdAt'],
    include: [
      {
        model: db.reply,
        attributes: ['content', 'createdAt'],
        include: [{
          model: db.user,
          as: 'user',
          attributes: ['username', 'email']
        }]
      },
      {
        model: db.user,
        as: 'user',
        attributes: ['username', 'email']
      }
    ],
    order: [['createdAt', 'DESC']]
  })
}

/**
 * 获取评论列表
 */
function fetchCommentList (articleId) {
  return db.comment.findAndCountAll({
    where: { articleId },
    attributes: ['id', 'userId', 'content', 'createdAt'],
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['username']
      },
      {
        model: db.user,
        as: 'user',
        attributes: ['username']
      }
    ],
    order: [['createdAt', 'DESC']]
  })
}

/**
 * 获取文章详情
 */
function fetchArticleDetail (articleId) {
  return db.article.findByPk(articleId)
}

/**
 * 创建评论
 */
export async function createComment (ctx) {
  const { userId } = decodeToken(ctx)
  const { articleId, content } = ctx.request.body
  const validator = Joi.validate({ userId, articleId, content }, commentSchema.createComment)
  if (validator.error) {
    ctx.body = {
      code: 400,
      message: validator.error.message
    }
  } else {
    const comment = await db.comment.create({
      userId,
      articleId,
      content
    })
    const [result] = await Promise.all([
      fetchCommentList(articleId),
      fetchCommentDetail(comment.id),
      fetchArticleDetail(articleId)
    ])
    console.log('result', result)
    ctx.body = {
      code: 200,
      message: 'success',
      result
    }
  }
}

/**
 * 创建回复
 */
export async function replyComment (ctx) {
  const { userId } = decodeToken(ctx)
  const { articleId, content, commentId } = ctx.request.body
  const validator = Joi.validate({ userId, articleId, content, commentId }, commentSchema.createReply)

  if (validator.error) {
    ctx.body = {
      code: 400,
      message: validator.error.message
    }
  } else {
    await db.reply.create({
      userId,
      articleId,
      content,
      commentId
    })

    const [result] = await Promise.all([
      fetchCommentList(articleId),
      fetchCommentDetail(commentId),
      fetchArticleDetail(articleId)
    ])

    ctx.body = {
      code: 200,
      message: 'success',
      result
    }
  }
}

/**
 * 删除评论
 */
export async function deleteReply (ctx) {
  const isAuth = checkAuth(ctx)
  const { commentId, replyId } = ctx.query

  if (isAuth) {
    if (commentId) {
      await db.sequelize.query(
        `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.id=${commentId}`
      )
      ctx.body = {
        code: 200,
        message: '成功删除评论'
      }
    } else if (replyId) {
      await db.reply.destroy({ where: { id: replyId }})
      ctx.body = {
        code: 200,
        message: '成功删除回复'
      }
    } else {
      ctx.body = {
        code: 200,
        message: 'id不能为空'
      }
    }
  }
}

export async function getAboutComments (ctx) {
  const data = await fetchCommentList(-1)
  ctx.body = {
    code: 200,
    data
  }
}