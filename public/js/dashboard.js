console.log('dashboard.js is linked')

// delete post
const deletePostButton = document.querySelectorAll('.deletePostButton')

const deletePost = async (event) => {
  console.log('click')
  const id = event.target.getAttribute('name')
  console.log(id)
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    location.reload();
  } else {
    alert('did not delete');
  }
};
function click() {
  console.log('click')
}

deletePostButton.forEach((button) => {
  button.addEventListener('click', deletePost);
});


// toggle edit post.
const editPostButton = document.querySelectorAll('.editPostButton')
const editBlogPostContainer = document.getElementById('editBlogPost')
const editBlogTitle = document.getElementById('editBlogTitle')
const editBlogText = document.getElementById('editBlogText')
const submitEdit = document.querySelectorAll('.submitEdit')

function toggleEdit(event) {
  const id = event.target.getAttribute('name')
  submitEdit.forEach((button) => {
  button.setAttribute('name', id);
  });
  // fetch blog data here
  fetch(`/api/blogs/${id}`)
    .then((response) => response.json())
    .then((data) => {

      const { title, text } = data

      editBlogPostContainer.style.display = 'flex';
      editBlogTitle.value = title
      editBlogText.innerHTML = text
    })
}
editPostButton.forEach((button) => {
  button.addEventListener('click', toggleEdit);
});

const cancelEdit = document.getElementById('cancelEdit')

function hideEdit() {
  location.reload()
}

cancelEdit.addEventListener('click', hideEdit)

const submitEditHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('name')
  const title = editBlogTitle.value
  const text = editBlogText.value
  console.log(id, title, text)
  if (title && text) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      console.log('response ok')
    } else {
      console.log('no content')
    }
  }
}

submitEdit.forEach((button) => {
  button.addEventListener('click', submitEditHandler);
});

// toggle visibility of container where user can create post
const postEntryToggle = document.getElementById('addPost')
const createBlogPost = document.getElementById('createBlogPost')

function toggler () {
  if (createBlogPost.style.display === 'none') {
    createBlogPost.style.display = 'flex';
    postEntryToggle.innerHTML = 'Hide'
  } else if (createBlogPost.style.display === 'flex'){
    createBlogPost.style.display = 'none'
    postEntryToggle.innerHTML = 'Create New Entry'
  }
}

postEntryToggle.addEventListener('click', toggler)

// create new blog post
const newBlogTitle = document.getElementById('newBlogTitle')
const newBlogText = document.getElementById('newBlogText')
const blogSubmit = document .getElementById('blogSubmit')

const submitBlogHandler = async (event) => {
  event.preventDefault();
  console.log('click')
  const title = newBlogTitle.value
  console.log(title)
  const text = newBlogText.value
  
  if (title && text) {
    console.log('content')
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      location.reload()

    } else {
      console.log('no content')
    }
  }
}

blogSubmit.addEventListener('click', submitBlogHandler)




