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
  try {
    res.render('dashboard',);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// render login page
router.get('/login', async (req, res) => {
  try {
    res.render('login',);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router