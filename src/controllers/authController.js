const router = require('express').Router();

const authService = require('../services/authService');
const { sessionName } = require('../constants');
const { errorHandler } = require('./errorController');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        await authService.register(req.body);
        res.redirect('/auth/login');
    } catch (error) {
        res.status(401).render('register', { error: errorHandler(error) });
    }
    
    // let createdUser = await authService.register(req.body);

    // if(createdUser){
    //     res.redirect('/auth/login');
    // } else {
    //     res.status(400).redirect('404');
    // }
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
        res.status(400).render('login',{error: errorHandler('User not found or incorrect password')});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});

module.exports = router;