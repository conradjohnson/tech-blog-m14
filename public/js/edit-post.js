const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-description').value.trim();
  const body = document.querySelector('#post-body').value.trim();
  const author = document.querySelector('#post-author').value;
  const id = document.querySelector('#post-id').value;
  alert('edit!');
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

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', newFormHandler);


