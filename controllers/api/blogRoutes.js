const router = require('express').Router();
const { Blog, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    
    // const user = await User.findByPk(user_id)

    const { title, author, text, user_id } = req.body;
    
    const newBlog = await Blog.create(
      {
        title,
        author,
        text,
        user_id,
        createdAt: new Date()
      },
    );

    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
    console.error(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
