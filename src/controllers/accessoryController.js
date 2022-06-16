const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req, res) => {
    let accessory = req.body;
    console.log(accessory);

    // res.status(200).send(`Accessory send ${accessory.imageUrl}`);
});
module.exports = router;