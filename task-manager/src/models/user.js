const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
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
            unique: true,   // emails can only be used once
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("email is invalid");
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age cannot be negative.");
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    });

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismysecret');
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
};

// Find a user by email and compare ptyped password with stored password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

// Hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    //console.log("just before saving!");

    // when new user created or password of existing user has been changed
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
