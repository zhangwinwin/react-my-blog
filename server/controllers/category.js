import db from '../models'

export async function getCategories (ctx) {
  const data = await db.category.findAll({
    attributes: ['name', [db.sequelize.fn('COUNT', db.sequelize.col('name')), 'count']],
    group: 'name'
  })
  ctx.body = {
    code: 200,
    data
  }
}

export async function getArticlesByCate (ctx) {
  let { page = 1, pageSize = 10, name } = ctx.query
  let offset = (page - 1) * pageSize

  pageSize = parseInt(pageSize)

  const data = await db.article.findAndCountAll({
    attributes: ['id', 'title', 'createdAt'],
    include: [{
      model: db.category,
      attributes: ['name'],
      where: {
        name
      }
    }],
    offset,
    limit: pageSize,
    order: [['createdAt', 'DESC']],
    distinct: true
  })
  ctx.body = {
    code: 200,
    data
  }
}