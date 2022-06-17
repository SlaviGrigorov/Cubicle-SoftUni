const router = require('express').Router();

const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    let createdUser = await authService.register(req.body);

    if(createdUser){
        res.redirect('/auth/login');
    } else {
        res.status(400).redirect('404');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const token = await authService.login(username, password);
    if (token) {
        res.cookie('session', token);
        res.redirect('/');
    } else {
        res.status(400).send('User not found or incorrect password');
    }
});

module.exports = router;