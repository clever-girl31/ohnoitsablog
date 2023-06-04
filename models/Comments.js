// Define the Comment model
const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING(140),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blogs',
      key: 'id'
    }
  },
},
{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'Comment',
  tableName: 'comments'
});

module.exports = Comment;