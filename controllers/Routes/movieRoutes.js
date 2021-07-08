const router = require('express').Router();
const { movies } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const movieData = await movies.findAll({
      include: [
        {},
      ],
    });

    // Serialize data so the template can read it
    const movies = movieData.map((googleBook) => movies.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      movies, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/googleBook/:id', async (req, res) => {
  try {
    const movieData = await movies.findByPk(req.params.id, {
      include: [
        {},
      ],
    });

    const movies = movieData.get({ plain: true });

    res.render('movies', {
      ...movies,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: movies }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;