const router = require('express').Router();
const userRoutes = require('./userRoutes');
const googleBookRoutes = require('./googleBookRoutes');
const songRoutes = require('./songRoutes');

router.use('/users', userRoutes);
router.use('/googleBooks', googleBookRoutes);
router.use('/songs', songRoutes);

module.exports = router;

router.use('/users', userRoutes);

module.exports = router;
