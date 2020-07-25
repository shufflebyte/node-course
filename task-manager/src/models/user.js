const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        //minLength: 7, // optional with this
        validate(value) {
            if (value.includes("password")) {
                throw new Error("Password must not include string 'password'");
            }
            if (value.length < 6) {
                throw new Error("Password must have at least 6 characters");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("email is invalid");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value<0) {
                throw new Error("Age cannot be negative.");
            }
        }
    }
});

module.exports = User;

// const me = new User({
//     name: "Florian",
//     password: "horsthugo",
//     email: "flo@flo.de",
// });

// me.save().then((result) => {
//     console.log("saved " + me.name);
// }).catch((error) => {
//     console.log(error.message);
//     console.log("Recieved error: ", error._message);
// });