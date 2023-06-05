console.log('addComment.js is linked')

const submitComment = document.getElementById('submitComment')
const commentTextArea = document.getElementById('commentTextArea')

const commentingAs = document.getElementById('commentingAs').textContent
const author = commentingAs.substring(commentingAs.lastIndexOf("@") + 1)
console.log(author)

const url = window.location.href
const blog_id = url.substring(url.lastIndexOf("/") + 1);
console.log(blog_id)

const submitCommentHandler = async (event) => {
  event.preventDefault();
  console.log('click')
  const content = commentTextArea.value
  
  if (content) {
    console.log('content')
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ author, content, blog_id }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      console.log('response ok')
      location.reload()
    } else {
      console.log('no content')
    }
  }
}

submitComment.addEventListener('click', submitCommentHandler)