const fs = require('fs');

let cubes = require('../cubesDB.json');

exports.getOne = (cubeId) => cubes.find(cube => cube.id == cubeId);

exports.getAll = (search, from, to) => {
    search = search? search.toLowerCase() : "";
    from = Number(from) || 0;
    to = Number(to) || 6;

    let result = cubes.filter(cube => cube.name.toLowerCase().includes(search)).filter(cube => cube.difficulty >= from && cube.difficulty <= to);
    return result;
}

exports.save = (cube) => {
    cube.id = cubes[cubes.length - 1].id + 1;
    cubes.push(cube);
    let data = JSON.stringify(cubes, "", 4);
    fs.writeFile('./src/cubesDB.json', data, (err) => console.log(err));
}