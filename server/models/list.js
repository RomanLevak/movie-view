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

listSchema.methods.selectToSend = async function() {
    await this.populate('user').execPopulate()

    return {
        id: this._id,
        movies: this.movies,
        title: this.title,
        createrAt: this.createdAt,
        user: this.user.selectToSend()
    }
}

listSchema.statics.getLatestLists = async function(page = 1) {
    const lists = await this
        .find()
        .sort([['createdAt', -1]])
        .skip((page - 1) * 10)
        .limit(10)

    return lists
}

listSchema.statics.getTotalPages = async function() {
    const totalDocs = await this.countDocuments()
    const totalPages = ~~(totalDocs/10) + 1

    return totalPages
}

module.exports = mongoose.model('List', listSchema)
