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




