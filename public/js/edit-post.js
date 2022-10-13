// function to help us convert line breaks in text entry to '<br/>' for db text storage.
function nl2br (str) {   
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br />' +'$2');
}

// when a blog post is edited, and then submitted, this will repost that blog post to our API
const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-description').value.trim();
  const body = nl2br(document.querySelector('#post-body').value.trim());
  const author = document.querySelector('#post-author').value;
  const id = document.querySelector('#post-id').value;

  if (id && title && description && body && author) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, body, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update post');
    }
  }
};

// event listener for editing post submission.
document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editPostHandler);


