exports.errorHandler = (err) => {
    let errors = [];

    if (err.name === 'MongoServerError' && err.code === 11000) {
        errors.push('Username already taken!');
    } else if (err.name === "ValidationError") {
        Object.values(err.errors).forEach(error => {
            errors.push(error.message);
        });
    } else {
        errors.push(err);
    }
    return (errors);
};