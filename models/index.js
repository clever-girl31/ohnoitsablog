const User = require('./User.js');
const Blog = require('./Blogs.js');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  as: 'blogs',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, { foreignKey: 'user_id' });
module.exports = { User, Blog };
