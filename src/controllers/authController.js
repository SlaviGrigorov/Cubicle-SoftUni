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

module.exports = router;