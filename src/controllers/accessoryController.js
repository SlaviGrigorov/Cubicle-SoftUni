const router = require('express').Router();

const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', async (req, res) => {
    let accessory = req.body;
    await accessoryService.create(accessory);
    res.redirect('/');
    // res.status(200).send(`Accessory send ${accessory.imageUrl}`);
});
module.exports = router;