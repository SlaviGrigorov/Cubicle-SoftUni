const router = require('express').Router();
const cubes = require('../cubesDB.json');

router.get('/', (req, res) => {
    res.render('index', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;