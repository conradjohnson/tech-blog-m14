const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// function to seed our database with our seed data in /seeds directory.
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seed users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // seed posts with random user_id
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // seed comments 
  const comments = await Comment.bulkCreate(commentData,{
        individualHooks: true,
        returning: true,
      });

  process.exit(0);
};

seedDatabase();
