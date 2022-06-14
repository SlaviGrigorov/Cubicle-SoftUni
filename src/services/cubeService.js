const fs = require('fs');

let cubes = require('../cubesDB.json');

exports.getOne = (cubeId) => cubes.find(cube => cube.id == cubeId);

exports.save = (cube) => {
    cube.id = cubes[cubes.length - 1].id + 1;
    cubes.push(cube);
    let data = JSON.stringify(cubes, "", 4);
    fs.writeFile('./src/cubesDB.json', data, (err) => console.log(err));
}