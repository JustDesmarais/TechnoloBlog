const { Post } = require('../models');

const postData = [
  {
    title: 'MySQL Cluster CGE',
    content: 'MySQL Cluster enables users to meet the database challenges of next generation web, cloud, and communications services with uncompromising scalability, uptime and agility.',
    user_id: 1,
  },
  {
    title: 'MySQL Enterprise Edition',
    content: 'The most comprehensive set of advanced features, management tools and technical support to achieve the highest levels of MySQL scalability, security, reliability, and uptime.',
    user_id: 1,
  },
  {
    title: 'Session Storage',
    content: 'Truly the most effective way to ensure that the user has full usibility of your web-app. Using session storage means your users can freely navigate your app once logged in.  Another bonus is that it will not rely on local storage to track and can be managed on the server side',
    user_id: 2,
  },
  {
    title: 'Object-Relational Mapping',
    content: 'A programming technique for converting data between a relational database and the heap of an object-oriented programming language. This creates, in effect, a virtual object database that can be used from within the programming language.',
    user_id: 2,
  },
  {
    title: 'Java vs. JavaScript',
    content: 'JavaScript is a loosely typed language and has a more relaxed syntax and rules. Java is an object-oriented programming language primarily used for developing complex enterprise applications. JavaScript is a scripting language used for creating interactive and dynamic web pages.',
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;