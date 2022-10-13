const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// helper function to get username when needed.
async function getUserName(userId){
    const userData = await User.findOne({ where: { id: userId } });
    const user = userData.get({ plain: true });
    return user.name;
}


// Posting a blog post route.  Will check for authenticated users.
router.post('/', withAuth, async (req, res) => {
  
  try {
    
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Posting a comment route.  Will check for authenticated uers.
router.post('/:id/comment', withAuth, async (req, res) => {
  try {
    const authorString = await getUserName(req.session.user_id);
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
      author: authorString,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

// Editing a blog post route. Will check for authentication. 
router.put('/:id', withAuth, async (req, res) => {   
    try {
        const updateData = await Post.update(
            {...req.body },
            {where:{id:req.params.id}}
            );
        if (!updateData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
          }
          res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleting a blog post route.  Will check for authentication, and that user is blog post owner.
router.delete('/:id', withAuth, async (req, res) => {
   
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleting a comment route.  Will check for authentication.
router.delete('/:id/comment/:cid', withAuth, async (req, res) => {
  console.log('gonna del.');
  try {

    const commentData = await Comment.destroy({
      where: {
        id: req.params.cid,
        post_id: req.params.id,
      },
    });

  if (!commentData) {
    res.status(404).json({ message: 'No comment found with this id!' });
    return;
  }

  res.status(200).json(commentData);
} catch (err) {
  console.log(err)
  res.status(500).json(err.message);
}
});

module.exports = router;
