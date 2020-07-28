const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' // create a reference to another model
        }
    }, {
        timestamps: true
    });


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
