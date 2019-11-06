const mongoose = require('../libs/mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email cannot be blank',
        validate: [
            {
                validator(value) {
                    return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)
                },
                message: 'Incorrect email'
            }
        ],
        unique: 'This email already exists'
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        required: true,
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
