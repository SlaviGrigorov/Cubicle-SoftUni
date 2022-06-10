const { append } = require('express/lib/response');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
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