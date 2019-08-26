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