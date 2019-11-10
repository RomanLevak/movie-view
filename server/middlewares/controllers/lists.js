const List = require('../../models/list')
const HTTPError = require('../../libs/http-error')
const ah = require('../../libs/async-handler')

module.exports.get = ah(async (req, res, next) => {
    const {id} = req.params

    if(id) {
        const list = await List.findById(id)

        return res.json(await list.selectToSend())
    }

    const lists = await List.getAllLists()

    return res.json(lists)
})

module.exports.post = ah(async (req, res, next) => {
    const {title} = req.body
    const {user} = req.session.passport

    const list = new List({title, user})
    await list.save()

    res.status(201).json(await list.selectToSend())
})

module.exports.put = ah(async (req, res, next) => {
    const {id} = req.params
    const updateValues = {}

    for(const pair of req.body)
        updateValues[pair.propName] = pair.value

    const newList = await List
        .findOneAndUpdate({_id: id}, {$set: updateValues}, {new: true})

    if(!newList)
        return next(new HTTPError(404, 'such list doesnt exist'))

    res.json(await newList.selectToSend())
})

module.exports.delete = ah(async (req, res, next) => {
    const {id} = req.params

    const deletedList = await List.findOneAndDelete({_id: id})

    if(!deletedList)
        return next(new HTTPError(404, 'such list doesnt exist'))

    res.json(await deletedList.selectToSend())
})
