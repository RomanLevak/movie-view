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

listSchema.statics.getAllLists = async function() {
    let lists = await this.find()

    lists = Promise.all(lists.map(async list => await list.selectToSend()))

    return lists
}

listSchema.methods.selectToSend = async function() {
    await this.populate('user', 'displayName').execPopulate()

    return {
        id: this._id,
        movies: this.movies,
        title: this.title,
        user: this.user
    }
}

module.exports = mongoose.model('List', listSchema)
