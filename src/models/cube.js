const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    imgURL: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});

cubeSchema.path('imgURL').validate(function() {
    return this.imgURL.startsWith('http');
}, "Invalid url.");

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;