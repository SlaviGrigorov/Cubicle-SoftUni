const fs = require('fs');

const Cube = require('../models/cube');

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getAll = (search, from, to) => {
    let cubes = Cube.find().lean();
    return cubes;

    // JSON DB...
    // search = search? search.toLowerCase() : "";
    // from = Number(from) || 0;
    // to = Number(to) || 6;

    // let result = cubes.filter(cube => cube.name.toLowerCase().includes(search)).filter(cube => cube.difficulty >= from && cube.difficulty <= to);
    // return result;
}

exports.create = (cube) => Cube.create(cube);