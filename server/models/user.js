import moment from 'moment'

const user = (sequelize, dataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: dataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
        comment: '通过bcrypt加密过的密码'
      },
      email: {
        type: dataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      auth: {
        type: dataTypes.TINYINT,
        defaultValue: 2,
        comment: '用户权限：1-root， 2-普通用户'
      },
      createdAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get () {
          return moment(this.getDataValue('createdAt')).format('YYYY:MM:DD HH:mm:ss')
        }
      },
      updatedAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get () {
          return moment(this.getDataValue('updatedAt')).format('YYYY:MM:DD HH:mm:ss')
        }
      }
    },
    {
      timeStamps: true
    }
  )
  User.associate = models => {
    User.hasMany(models.comment)
    User.hasMany(models.reply)
  }
  return User
}

export default user