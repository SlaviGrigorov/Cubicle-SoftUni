const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },

});

cubeSchema.path('imgUrl').validate(function() {
    return this.name.startsWith('http');
}, "Invalid url.");

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;