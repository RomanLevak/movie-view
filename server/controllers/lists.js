const List = require('../models/list')
const HTTPError = require('../libs/http-error')
const ah = require('../libs/async-handler')

const getLatest = ah(async (req, res, next) => {
    const {page} = req.params

    const lists = await List.getLatestLists(page || 1)

    const listsToSend = await List.selectToSendArr(
        lists,
        {populateUser: true}
    )

    const totalPages = await List.getTotalPages()

    res.json({lists: listsToSend, totalPages})
})

const getById = ah(async (req, res, next) => {
    const {id} = req.params

    if(id) {
        const list = await List.findById(id)

        if(!list)
            return next(new HTTPError(404, 'Such list does not exist'))

        return res.json(await list.selectToSend({
            populateUser: true
        }))
    }
})

const getListsByUserId = ah(async (req, res, next) => {
    const userId = req.params.userId
    const lists = await List.find({user: userId})

    const listsToSend = await List.selectToSendArr(
        lists,
        {populateUser: true}
    )

    res.json(listsToSend)
})

const create = ah(async (req, res, next) => {
    const {title} = req.body
    const {user} = req

    const list = new List({title, user})
    await list.save()

    res.status(201).json(await list.selectToSend())
})

const update = ah(async (req, res, next) => {
    const {id} = req.params
    const updateValues = {}

    for(const pair of req.body)
        updateValues[pair.propName] = pair.value

    const newList = await List
        .findOneAndUpdate(
            {_id: id},
            {$set: updateValues},
            {new: true} // return updated doc
        )

    if(!newList)
        return next(HTTPError(404, 'Such list does not exist'))

    res.json(await newList.selectToSend())
})

const remove = ah(async (req, res, next) => {
    const {id} = req.params

    const deletedList = await List.findOneAndDelete({_id: id})

    if(!deletedList)
        return next(new HTTPError(404, 'Such list does not exist'))

    res.json(await deletedList.selectToSend())
})

const checkOwner = ah(async (req, res, next) => {
    if(!req.isAuthenticated())
        return next(new HTTPError(401))

    const listId = req.params.id
    const ownerId = req.user.id

    const list = await List.findById(listId)

    if(!list)
        return next(new HTTPError(404, 'Such list does not exist'))

    if(list.user.toString() == ownerId)
        return next()

    next(new HTTPError(401, 'You do not have such list'))
})

const addMovie = ah(async (req, res, next) => {
    const listId = req.params.id
    const {movieId} = req.params

    const newList = await List.findOneAndUpdate(
        {_id: listId},
        {$addToSet: {movies: movieId}},
        {new: true} // return updated doc
    )

    res.json(await newList.selectToSend())
})

const removeMovie = ah(async (req, res, next) => {
    const listId = req.params.id
    const {movieId} = req.params

    const newList = await List.findOneAndUpdate(
        {_id: listId},
        {$pull: {movies: movieId}},
        {new: true} // return updated doc
    )

    res.json(await newList.selectToSend())
})

module.exports = {
    getLatest,
    getById,
    getListsByUserId,
    create,
    update,
    remove,
    addMovie,
    removeMovie,
    checkOwner
}
