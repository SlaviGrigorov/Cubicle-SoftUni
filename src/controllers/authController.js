const router = require('express').Router();

const authService = require('../services/authService');
const { sessionName } = require('../constants');

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
        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');
    } else {
        res.status(400).send('User not found or incorrect password');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});

module.exports = router;