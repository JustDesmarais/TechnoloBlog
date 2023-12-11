const { User } = require('../models');

const userData = [
  {
    username: 'Techspert32',
    email: 'sample@tryit.com',
    password: 'password123',
  },
  {
    username: 'bloggerGirl6',
    email: 'sample@tryit.com',
    password: 'password123',
  },
  {
    username: 'AnotherUser',
    email: 'sample@tryit.com',
    password: 'password123',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;