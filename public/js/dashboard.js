console.log('dashboard.js is linked')

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
      window.alert('Blog Posted!')
      // setTimeout(() => {
      //   location.reload();
      // }, 3000);
      location.reload()

    } else {
      console.log('no content')
    }
  }
}

blogSubmit.addEventListener('click', submitBlogHandler)
