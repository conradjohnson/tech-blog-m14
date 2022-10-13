function nl2br (str) {   
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br />' +'$2');
}

const newFormHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-description').value.trim();
  const body = nl2br(document.querySelector('#post-body').value.trim());
  const author = document.querySelector('#post-author').value;

  if (title && description && body && author) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, description, body, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const editButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    if (id){
      document.location.replace(`/edit-post/${id}`);
    } else {
      alert('Cannot find that project to edit');
    }
      
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

const deleteButtons = document.querySelectorAll('.delete-post-button');
for (let i=0; i< deleteButtons.length; i++){
  deleteButtons[i].addEventListener('click', delButtonHandler);
}
// document
//   .querySelectorAll('#delete-post-button')
//   .addEventListener('click', delButtonHandler);

const editButtons = document.querySelectorAll('.edit-post-button');
for (let i=0; i< editButtons.length; i++){
  editButtons[i].addEventListener('click', editButtonHandler);
}
  