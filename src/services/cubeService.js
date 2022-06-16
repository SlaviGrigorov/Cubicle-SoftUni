const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

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

exports.attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    await cube.accessories.push(accessory);
    await accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
};