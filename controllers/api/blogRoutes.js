const router = require('express').Router();
const { Blog, User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userID = req.session.user_id
    console.log('userID__________', userID)
    const userData = await User.findByPk(userID, {
      attributes: { exclude: ['password'] },
    });
    
    const user = userData.get({ plain: true });
    const { title, text } = req.body;
    
    const newBlog = await Blog.create(
      {
        title,
        author: user.username,
        text,
        user_id: user.id,
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
