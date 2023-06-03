const router = require('express').Router();
const { Blog, User } = require('../models')

// renders homepage onto main template
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({ raw: true });

    res.render('homepage', { blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: true
    });
  } catch (err) {;
    res.status(500).json(err);
    console.error(err)
  }
});

// render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});






module.exports = router