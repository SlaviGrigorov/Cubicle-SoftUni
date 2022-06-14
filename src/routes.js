const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;