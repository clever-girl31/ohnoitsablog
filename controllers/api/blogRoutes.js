const router = require('express').Router();
const { Blog } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const { title, text } = req.body;
    const { user_id } = req.session;

    console.log('req.session:', req.session);
    console.log('req.session.user_id:', req.session.user_id);

    const newBlog = await Blog.create({
      title,
      text,
      user_id
    });

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
