const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const saltRounds = 10;
const secret = "asdjkafaffjaja[dafl;aafasd";

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
};

exports.login = async (username, password) => {
    let user = await User.findOne({username});
    if (!user) {
        return false;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        let result = new Promise((resolve, reject) => {
            jwt.sign({_id: user._id, username: user.username}, secret, (err, token) => {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            });
        });
        return result;
    } else {
        return validPassword;
    }
};