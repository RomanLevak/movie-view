const mongoose = require('../libs/mongoose')
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

listSchema.methods.selectToSend = async function(options = {}) {
    const {populateUser} = options
    const result = {}

    if(populateUser) {
        await this.populate('user').execPopulate()
        result.user = await this.user.selectToSend()
    } else
        result.user = this.user

    return {
        ...result,
        id: this._id,
        movies: this.movies,
        title: this.title,
        createdAt: this.createdAt
    }
}

listSchema.statics.selectToSendArr = async function(lists, options = {}) {
    const listsToSend = await Promise.all(lists.map(
        async el => await el.selectToSend(options)
    ))

    return listsToSend
}

listSchema.statics.getWithOffset = async function(start, count, filter = {}) {
    const lists = await this
        .find(filter)
        .sort([['createdAt', -1]])
        .skip(start)
        .limit(count)

    return lists
}

module.exports = mongoose.model('List', listSchema)
