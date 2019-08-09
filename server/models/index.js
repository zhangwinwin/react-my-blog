// import fs from 'fs'
// import path from 'path'
import config from '../config'
import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

let db = {}

// fs.readFileSync(__dirname)
//   .filter(file => file !== 'index.js')
//   .forEach(file => {
//     const model = sequelize.import(path.join(__dirname, file))
//     db[model.name] = model
//   })

db.sequelize = sequelize

export default db