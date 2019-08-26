import db from '../models'
// import sequelize from 'sequelize'
import Joi from 'joi'
import Article from '../schemas/article'
import { checkAuth } from '../lib/token'

export async function createArticle (ctx) {
  const isAuth = checkAuth(ctx)
  if (isAuth) {
    // 取出post值
    const { title, content, categories, tags } = ctx.request.body
    // 验证
    const validator = Joi.validate(ctx.request.body, Article.create)
    if (validator.error) {
      ctx.body = {
        code: 400,
        message: validator.error.message
      }
    } else {
      const tagList = tags.map(t => ({name: t}))
      console.log(tagList)
      const categoryList = categories.map(c => ({name: c}))
      const data = await db.article.create(
        {
          title,
          content,
          tags: tagList,
          categories: categoryList
        },
        {
          include: [db.tag, db.category]
        }
      )
      ctx.body = {
        code: 200,
        message: '成功创建文章',
        data
      }
    }
  }
}

export async function updateArticle (ctx) {
  const isAuth = checkAuth(ctx)
  let isTop = false
  if (isAuth) {
    const { articleId, title, content, categories, tags, showOrder } = ctx.request.body
    console.log(ctx.request.body)
    if (!!showOrder) {
      // 文章设置置顶
      await db.article.update({ showOrder }, { where: { id: articleId } })
      isTop = true
    }

    const validator = Joi.validate(ctx.request.body, Article.update)
    if (validator.error) {
      ctx.body = {
        code: 400,
        message: validator.error.message
      }
    } else {
      const tagList = tags.map(tag => ({name: tag, articleId}))
      const categoryList = categories.map(cate => ({name: cate, articleId}))

      await db.article.update({ title, content }, { where: { id: articleId } })

      await db.tag.destroy({ where: { articleId } })

      await db.tag.bulkCreate(tagList)

      await db.category.destroy({ where: { articleId } })
      await db.category.bulkCreate(categoryList)

      if (isTop) {
        ctx.body = {
          code: 200,
          message: '文章修改成功, 并置顶'
        }
      } else {
        ctx.body = {
          code: 200,
          message: '文章修改成功'
        }
      }
    }
  }
}

// 获取文章详情
export async function getArticleById (ctx) {
  const id = ctx.params.id
  const data = await db.article.findOne({
    where: { id },
    include: [
      { model: db.tag, attributes: ['name'] },
      { model: db.category, attributes: ['name'] },
      {
        model: db.comment,
        attributes: ['id', 'userId', 'content', 'createdAt'],
        include: [
          {
            model: db.reply,
            attributes: ['id', 'userId', 'content', 'createdAt'],
            include: [{ model: db.user, as: 'user', attributes: ['username'] }]
          },
          { model: db.user, as: 'user', attributes: ['username'] }
        ]
      }
    ],
    order: [[db.comment, 'createdAt', 'DESC']],
    row: true
  })
  ctx.body = {
    code: 200,
    data
  }
}