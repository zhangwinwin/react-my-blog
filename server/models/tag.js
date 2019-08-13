function tag (sequelize, dataTypes) {
  const Tag = sequelize.define('tag', {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false
    }
  })

  Tag.associate = models => {
    Tag.belongsTo(models.article, {
      foreignKey: 'articleId',
      targetKey: 'id'
    })
  }

  return Tag
}

export default tag