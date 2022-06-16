const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    let cube = req.body;
    
    // Check for empty fields in form data
    if (cube.name === "" || cube.imageURL === "" || cube.difficulty === "") {
        return res.status(400).send("Please fill all fields!");
    };

    // Save data into DB
    try {
        await cubeService.create(cube);
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/details/:id', async (req, res) => {
    let cube = await cubeService.getOne(req.params.id).lean();
    res.render('details', { cube });
});

router.get('/attach-accessory/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    let accessories = await accessoryService.getAll().lean();

    res.render('attachAccessory', { cube, accessories });
});

router.post('/attach-accessory/:id', async (req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cube/details/${cubeId}`);
    console.log(accessoryId);
});

module.exports = router;