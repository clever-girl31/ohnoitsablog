const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.error(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('_________________________before timeout_____________')
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 3000)
    });

    const userDataPromise = User.findOne({ where: { username : req.body.username} });

    const raceResult = Promise.race([timeoutPromise, userDataPromise])
    const userData = await userDataPromise
    console.log('________________after timeout______________' + 'userData__' + userData + 'userDataPromise____' + userDataPromise)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save()

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    res.status(400).json(err);
    console.error(err)
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router