
// function to help us convert line breaks in text entry to '<br/>' for db text storage.
async function nl2br (str) {   
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br />' +'$2');
}


// When comment is submitted, let's send that data to our API.
const addCommentHandler = async (event) => {
    event.preventDefault();

    const body = await nl2br(document.querySelector('#comment-body').value.trim());
    const post_id = document.querySelector('#post-id').value;
    
    if (body && post_id) {
        const response = await fetch(`/api/posts/${post_id}/comment`, {
          method: 'POST',
          body: JSON.stringify({ body }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace(`/post/${post_id}`);
        } else {
          alert('Failed to create project');
        }
      }


    
  };

// when the delete comment button is pushed, let's send that to our API for deletion.
const delCommentHandler = async (event) => {
  event.preventDefault();
  alert('here!1');
  const post_id = document.querySelector('#post-id').value;
  const comment_id = event.target.getAttribute('data-id');
  if (comment_id) {
    alert('here2id:' + post_id + " cid:" + comment_id);
    alert(`/api/posts/${post_id}/comment/${comment_id}`);
    const response = await fetch(`/api/posts/${post_id}/comment/${comment_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('here!3');
      document.location.reload();
    } else {
      alert('Failed to delete comment');
      alert(response.statusText)
    }
  }
};

// event listener for the submit comment button.
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', addCommentHandler);

// we have multiple delete buttons when blog author wants to delete one of the posts.
// loop through them and attach the delete comment event handler.
const deleteButtons = document.querySelectorAll('.delete-comment-button');
for (let i=0; i< deleteButtons.length; i++){
  deleteButtons[i].addEventListener('click', delCommentHandler);
}