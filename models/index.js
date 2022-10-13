const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// database relationships mapping 1:M relationships with their corresponding foreign key.
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });
Post.belongsTo(User, {
    foreignKey: 'user_id'
  });
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Comment };
