const mongoose = require('../libs/mongoose')
const User = require('../models/user')
const {Schema} = mongoose

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    movies: [String],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

listSchema.methods.setUserByEmail = async function(email) {
    const user = await User.findOne({email})
    this.user = user._id
}

module.exports = mongoose.model('List', listSchema)
