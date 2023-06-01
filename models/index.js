const User = require('./User');
const Blog = require('./Blogs');

User.hasMany(Blog, {
  foreignKey: 'name',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'name'
});

module.exports = { User, Blog };
