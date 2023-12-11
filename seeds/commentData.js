const { Comment } = require('../models');

const commentData = [
  {
    content: 'This is so true!',
    user_id: 2,
    post_id: 1, 
  },
  {
    content: 'I actually prefer different database options',
    user_id: 3,
    post_id: 1, 
  },
  {
    content: 'Such an important concept! It did give me trouble in class though',
    user_id: 1,
    post_id: 4, 
  },
  {
    content: 'First',
    user_id: 3,
    post_id: 3, 
  },
  {
    content: 'Nothing about this makes sense to me. Back to the books!',
    user_id: 3,
    post_id: 4, 
  },
  {
    content: 'Is this the right place to talk about this?',
    user_id: 1,
    post_id: 5, 
  },
  {
    content: 'My only experience with this was in school and now it has exited my brain',
    user_id: 2,
    post_id: 2, 
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;