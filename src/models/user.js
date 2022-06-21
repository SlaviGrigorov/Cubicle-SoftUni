const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../constants');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long'],
        validate: {
            validator: function(v) {
                const regEx = new RegExp('^[a-zA-Z0-9]*$')
                return regEx.test(v);
            },
            message:`Only letters and numbers are allowed for username!`
          },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should contain atleast 8 characters'],
        validate: {
            validator: function(v) {
                const regEx = new RegExp('^[a-zA-Z0-9]*$')
                return regEx.test(v);
            },
            message:`Only letters and numbers are allowed for password!`
          },
    }
});

userSchema.virtual('repeatPassword').set(function(value) {
    if (this.password !== value) {
        throw (`Passwords don't match`);
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, saltRounds)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;