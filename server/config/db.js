const isDev = process.env.NODE_ENV === 'development'

const config = {
  database: isDev ? 'react-my-blog' : undefined,
  user: isDev ? 'root' : '',
  password: isDev ? 'Mysql123' : '',
  options: {
    host: isDev ? 'localhost' : '',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false, // 默认不加时间戳 
      freezeTableName: true // 表明默认不加s
    },
    timezone: '+08:00'
  }
}

export default config
