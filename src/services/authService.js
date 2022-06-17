const bcrypt =  require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

exports.register = async ({username, password, repeatPassword}) => {
    if (password !== repeatPassword || username === "") {
        return false;
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let createdUser = User.create({
        username,
        password: hashedPassword
    });
    return createdUser;
}