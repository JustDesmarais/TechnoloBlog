const addCommentHandler = (event) => {
  event.preventDefault();

  document.getElementById('comment-button').style.display = 'none';
  document.getElementById('submit-button').style.display = 'block';
  document.getElementById('comment-box').style.height = '100px';
};

const submitCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-text').value.trim();
  const post_id = document.querySelector('#main-post').getAttribute('data-id');

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({content, post_id}),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to create project');
    }
  }
}

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#new-post-text').value.trim();

  if (title && content) {
    console.log(title, content);
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  } console.log('no data')
};

const delCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

const editCommentHandler = async (event) => {
  event.preventDefault();
  const postID = event.target.getAttribute("data-id");
  try{

    if (postID) {
        document.location.replace(`/edit/${postID}`);
    } 
  } catch (err) {
    console.log(err);
  }
}

const editCommentSubmit = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#edit-post-text').value.trim();

  if (title && content) {
    console.log(title, content);
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};


document.addEventListener('DOMContentLoaded', function () {
document
  .querySelector('.new-post-form')
  .addEventListener('click', newFormHandler);
});

document.addEventListener('DOMContentLoaded', function () {
  const delButtons = document.querySelectorAll('.delete-button');
  
  delButtons.forEach(function(db) {
    db.addEventListener('click', delButtonHandler);
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('#comment-button')
    .addEventListener('click', addCommentHandler);
  });

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('#submit-button')
    .addEventListener('click', submitCommentHandler);
  });

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('#delComment')
    .addEventListener('click', delCommentHandler);
  });

document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll('.edit-button');
  
  editButtons.forEach(function(eb){
    eb.addEventListener('click', editCommentHandler);
  })
});

  document.addEventListener('DOMContentLoaded', function () {
    document
      .querySelector('.edit-post-form')
      .addEventListener('click', editCommentSubmit);
    });