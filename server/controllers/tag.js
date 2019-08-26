import db from '../models'

export async function getTags (ctx) {
  const data = await db.tag.findAll({
    attributes: ['name', [db.sequelize.fn('COUNT', db.sequelize.col('name')), 'count']],
    group: 'name'
  })
  ctx.body = {
    code: 200,
    data
  }
}

export async function getArticlesByTag (ctx) {
  let { page = 1, pageSize = 10, name } = ctx.query
  console.log('query', ctx.query)
  let offset = (page - 1) * pageSize

  pageSize = parseInt(pageSize)
  const data = await db.article.findAndCountAll({
    attributes: ['id', 'title', 'createdAt'],
    include: [{
      model: db.tag,
      where: {
        name
      }
    },
    {
      model: db.category
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