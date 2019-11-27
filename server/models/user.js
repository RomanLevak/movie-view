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

userSchema.methods.generatePassword = function(salt, plainPassword) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            plainPassword,
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

userSchema.methods.setPassword = async function(plainPassword) {

    this.salt = crypto.randomBytes(
        config.get('crypto.hash.length')
    ).toString('hex')

    this.passwordHash = await this.generatePassword(this.salt, plainPassword)
}

userSchema.methods.checkPassword = async function(plainPassword) {
    if(!plainPassword) return false

    const passwordHash = await this.generatePassword(this.salt, plainPassword)

    return passwordHash === this.passwordHash
}

userSchema.methods.selectToSend = function(options = {}) {
    const {withEmail} = options

    return {
        id: this._id,
        displayName: this.displayName,
        email: withEmail ? this.email : undefined
    }
}

userSchema.statics.getIdByName = async function(name) {
    const user = await this.findOne({displayName: {
        // case insensitive search
        $regex: new RegExp(name, 'i')
    }})

    if(!user)
        return null

    return user.id
}

module.exports = mongoose.model('User', userSchema)
