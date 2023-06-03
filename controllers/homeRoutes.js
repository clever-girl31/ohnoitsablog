const router = require('express').Router();
const { Blog, User } = require('../models')

// renders homepage onto main template
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.session;
    const user = await User.findByPk(user_id);
    
    console.log('user_id____', req.session.user_id)
    console.log('user______', user)

    const blogs = await Blog.findAll({ raw: true });

    const loggedIn = req.session.logged_in;
    res.render('homepage', { blogs, loggedIn });
    console.log(blogs)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.logged_in) {
    loggedIn = false
    res.redirect('/login');
    return;
  }
  try {
    console.log('req.session.user_id_____', req.session.user_id)
    const userID = req.session.user_id
    console.log(userID)
    const userData = await User.findByPk(userID, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog, as: 'blogs' }],
    });

    console.log('userData:_____', userData);

    // if (!userData) {
    //   console.log('User data not found.');
    //   res.status(404).json({ message: 'User not found even though I know you are looking for user.',userID});
    //   return;
    // };

    const user = userData.get({ plain: true });
    console.log('user________', user)
    res.render('dashboard', {
      ...user,
      loggedIn: true,
      blogs: user.blogs || [],
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

// view single blog post
router.get('/blogs/:id', async (req, res) => {

  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      res.status(404).json({ message: 'Blog post not found.' });
      return;
    }

    let loggedIn = false;

    if (req.session.logged_in){
      loggedIn = true;
      const userID = req.session.user_id;
      console.log(userID)
      const userData = await User.findByPk(userID, {
        attributes: { exclude: ['password'] },
      });
      console.log('userData____________________________', userData.username)
      res.render('blog', { blog, userData, loggedIn })
    } else {
      res.render('blog', { blog, loggedIn })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = router