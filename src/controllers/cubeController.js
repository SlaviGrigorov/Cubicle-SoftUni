const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    let cube = req.body;
    cube.owner = req.user._id;
    
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
    let cube = await cubeService.getOneWithAccessories(req.params.id).lean();
    let isOwner = false;
    if (req.user) {
        isOwner = cube.owner == req.user._id;
    }
    res.render('details', { cube, isOwner });
});

router.get('/attach-accessory/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    let accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render('attachAccessory', { cube, accessories });
});

router.post('/attach-accessory/:id', async (req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cube/details/${cubeId}`);
    console.log(accessoryId);
});

router.get('/edit/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    res.render('editCube', { cube });
});

router.post('/edit/:id', async (req, res) => {
    let updatedCube = await cubeService.edit(req.params.id, req.body);
    res.redirect(`/cube/details/${updatedCube._id}`);
});

router.get('/delete/:id', async (req, res) => {
    let cube = await cubeService.getOne(req.params.id).lean();
    res.render('deleteCube', { cube });
});

router.post('/delete/:id', async (req, res) => {
    try{
        await cubeService.deleteCube(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('404');
    }
});
module.exports = router;