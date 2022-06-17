const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

exports.getOne = (cubeId) => Cube.findById(cubeId);
exports.getOneWithAccessories = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.getAll = async (search, from, to) => {
    search = search? search.toLowerCase() : "";
    from = Number(from) || 0;
    to = Number(to) || 6;

    //MongoDB + Mongoose filter
    let cubes = await Cube.find({name: {$regex: new RegExp(search, 'i')}})
        .where('difficulty').lte(to).gte(from)
        .lean()
    return cubes;

    //  Service filter
    // let cubes = await Cube.find().lean();
    // let result = cubes.filter(cube => cube.name.toLowerCase().includes(search)).filter(cube => cube.difficulty >= from && cube.difficulty <= to);
    // return result;
}

exports.create = (cube) => Cube.create(cube);
exports.edit = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);

exports.attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    await cube.accessories.push(accessory);
    await accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
};