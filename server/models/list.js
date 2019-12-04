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
