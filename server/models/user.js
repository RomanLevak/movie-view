const mongoose = require('../libs/mongoose')
const {Schema} = mongoose
const crypto = require('crypto')
const config = require('config')

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Email cannot be blank',
        validate: [{
            validator(value) {
                return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)
            },
            message: 'Incorrect email'
        }],
        unique: 'This email already exists'
    },

    displayName: {
        type: String,
        required: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    salt: {
        required: true,
        type: String
    },

    lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
}, {timestamps: true})

userSchema.methods.generatePassword = function(salt, password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password,
            salt,
            config.get('crypto.hash.iterations'),
            config.get('crypto.hash.length'),
            'sha512',
            (err, key) => {
                if(err) return reject(err)

                resolve(key.toString('hex'))
            }
        )
    })
}

userSchema.methods.setPassword = async function(password) {
    this.salt = crypto.randomBytes(
        config.get('crypto.hash.length')
    ).toString('hex')

    this.passwordHash = await this.generatePassword(this.salt, password)
}

userSchema.methods.checkPassword = async function(password) {
    if(!password) return false

    const hash = await this.generatePassword(this.salt, password)

    return hash === this.passwordHash
}

userSchema.methods.selectToSend = function(options = {}) {
    const {withEmail} = options

    return {
        id: this._id,
        displayName: this.displayName,
        email: withEmail ? this.email : undefined
    }
}

module.exports = mongoose.model('User', userSchema)
