const router = require('express').Router();
const cubes = require('../cubesDB.json');

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/details/:id', (req, res) => {
    let cubeId = req.params.id;
    let cube = cubes.find(cube => cube.id == cubeId);
    res.render('details', { cube });
});

module.exports = router;