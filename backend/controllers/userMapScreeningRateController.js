const passport = require('passport')
const screeningRate = require('../models/screeningRate')
const common = require('../common/index')
require('../config/passport')(passport)


async function get(req, res) {
    try {
        return common.successResponse(res, await screeningRate.find())
    } catch (err) {
        return common.errorResponse(res)
    }
}

async function create(req, res) {
    let { movie_theater_id, movie_id, chair, date, start_time, end_time } = req.body

    // let slugIsExist = await checkUniqueName(name)
    // if(slugIsExist) {
    //     return common.errorResponse(res, 'This name is already exist!')
    // }

    let newScreeningRate = new screeningRate({
        movie_theater_id: movie_theater_id,
        movie_id: movie_id,
        chair: chair,
        date: date,
        start_time: start_time,
        end_time: end_time,
    })

    try {
        let isSaved = await newScreeningRate.save()
        if(isSaved) {
            return common.successResponse(res)
        } else {
            return common.errorResponse(res)
        }
    } catch (err) {
        throw err
        return common.errorResponse(res)
    }
}

async function find(req, res) {
    let id = req.params.id

    if(id) {
        try {
            let data = await screeningRate.findOne({ _id: id })
            if(data) {
                return common.successResponse(res, data)
            }
        } catch (err) {
            common.errorResponse(res)
        }
    } 

    return common.errorResponse(res, 'Not found', 404)
}

async function update(req, res) {
    let id = req.params.id
    let { movie_theater_id, movie_id, chair, date, start_time, end_time, status } = req.body

    if(id) {
        try {
            let data = await screeningRate.findOne({ _id: id })
            if(data) {
                let isUpdated = await screeningRate.updateOne(
                    {"_id": id},
                    {
                        movie_theater_id: movie_theater_id,
                        movie_id: movie_id,
                        chair: chair,
                        date: date,
                        start_time: start_time,
                        end_time: end_time,
                        status: status
                    }
                )

                if(isUpdated) {
                    return common.successResponse(res)
                }
            }
        } catch (err) {
            return common.errorResponse(res)
        }
    }

    return common.errorResponse(res, 'Not found', 404)
}

async function destroy(req, res) {
    let id = req.params.id

    if(id && await screeningRate.findOne({ _id: id })) {
        try {
            let isDeleted = await screeningRate.deleteOne({ _id: id })
            if(isDeleted) {
                return common.successResponse(res)
            }
        } catch (err) {
            return common.errorResponse(res)
        }
    }
    return common.errorResponse(res, 'Not found', 404)
}

async function checkUniqueName(name) {
    let data = await screeningRate.findOne({ name: name});
    if(data) return true
    return false
}

module.exports = {
    get, create, find, update, destroy
}