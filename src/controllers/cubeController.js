const router = require('express').Router();
const fs = require('fs');

let cubes = require('../cubesDB.json');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    let cube = req.body;
    
    // Check for empty fields in form data
    if (cube.name === "" || cube.imageURL === "" || cube.difficulty === "") {
        return res.send("Please fill all fields!");
    };

    // Save data into JSON
    cube.id = cubes[cubes.length - 1].id + 1;
    cubes.push(cube);
    let data = JSON.stringify(cubes, "", 4);
    fs.writeFile('./src/cubesDB.json', data, (err) => err? res.status(400): res.redirect('/'));
});

router.get('/details/:id', (req, res) => {
    let cubeId = req.params.id;
    let cube = cubes.find(cube => cube.id == cubeId);
    res.render('details', { cube });
});

module.exports = router;