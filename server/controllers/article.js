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

export async function update (ctx) {
  const isAuth = checkAuth(ctx)
  if (isAuth) {
    const { articleId, title, content, categories, tags, showOrder } = ctx.request.body

    if (!!showOrder) {
      // 文章设置置顶
      await db.article.update({ showOrder }, { where: { id: articleId } })
      ctx.body = {
        code: 200,
        message:  '文章置顶成功'
      }
    } else {
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

        await db.tag.buikCreate(tagList)

        await db.category.destroy({ where: { articleId } })
        await db.category.buikCreate(categoryList)

        ctx.body = {
          code: 200,
          message: '文章修改成功'
        }
      }
    }
  }
}