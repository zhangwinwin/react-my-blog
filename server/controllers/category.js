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