const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    
    // const user = await User.findByPk(user_id)

    const { author, content, blog_id } = req.body;
    
    const newComment = await Comment.create(
      {
        author,
        content,
        blog_id,
        createdAt: new Date()
      },
    );

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
    console.error(err)
  }
});

module.exports = router;