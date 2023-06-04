const User = require('./User.js');
const Blog = require('./Blogs.js');
const Comment = require('./Comments.js')

User.hasMany(Blog, {
  foreignKey: 'user_id',
  as: 'blogs',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, { foreignKey: 'blog_id' });
Blog.hasMany(Comment);

Blog.belongsTo(User, { foreignKey: 'user_id' });
module.exports = { User, Blog, Comment };
