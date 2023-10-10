const passport = require('passport')
const movie = require('../models/movie')
const common = require('../common/index')
require('../config/passport')(passport)


async function get(req, res) {
    try {
        return common.successResponse(res, await movie.find())
    } catch (err) {
        return common.errorResponse(res)
    }
}

async function create(req, res) {
    let {name, slug, content, time} = req.body

    let slugIsExist = await checkUniqueSlug(slug)
    if(slugIsExist) {
        return common.errorResponse(res, 'This slug is already exist!')
    }

    let newMovie = new movie({
        name: name,
        slug: slug,
        content: content,
        time: time
    })

    try {
        let isSaved = await newMovie.save()
        if(isSaved) {
            return common.successResponse(res)
        } else {
            return common.errorResponse(res)
        }
    } catch (err) {
        return common.errorResponse(res)
    }
}

async function find(req, res) {
    let slug = req.params.slug

    if(slug) {
        try {
            let data = await movie.findOne({ slug: slug })
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
    let {name, slug, content, time} = req.body

    if(id) {
        try {
            let data = await movie.findOne({ _id: id })
            if(data) {
                let isUpdated = await movie.updateOne(
                    {"_id": id},
                    {
                        name: name,
                        slug: slug,
                        content: content,
                        time: time
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

    if(id && await movie.findOne({ _id: id })) {
        try {
            let isDeleted = await movie.deleteOne({ _id: id })
            if(isDeleted) {
                return common.successResponse(res)
            }
        } catch (err) {
            return common.errorResponse(res)
        }
    }
    return common.errorResponse(res, 'Not found', 404)
}

async function checkUniqueSlug(slug) {
    let data = await movie.findOne({ slug: slug});
    if(data) return true
    return false
}

module.exports = {
    get, create, find, update, destroy
}