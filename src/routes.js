const router = require('express').Router();
const fs = require('fs');

let cubes = require('./cubesDB.json');

router.get('/', (req, res) => {
    res.render('index', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;