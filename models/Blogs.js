const { Model, DataTypes } = require('sequelize');
const sequelize = ('./config/connection')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.VARCHAR(100),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'name'
      }
    },
    text: {
      type: DataTypes.VARCHAR(2500),
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogData'
  }
)

module.exports = Blog