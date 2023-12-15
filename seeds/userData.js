const { User } = require('../models');

const userData = [
  {
    username: 'Techspert32',
    email: 'sample@tryit.com',
    password: 'password123',
  },
  {
    username: 'bloggerGirl6',
    email: 'AnuEmail@server.com',
    password: 'password123',
  },
  {
    username: 'AnotherUser',
    email: 'sizzle@realreel.com',
    password: 'password123',
  },
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;