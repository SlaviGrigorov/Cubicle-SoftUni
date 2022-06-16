const Accessory = require('../models/accessory');

exports.create = (accessory) => Accessory.create(accessory);

exports.getAll = () => Accessory.find();

exports.getAllAvailable = (ids) => Accessory.find({_id: {$nin: ids}});

