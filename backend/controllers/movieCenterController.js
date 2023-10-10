const passport = require('passport')
const movieCenter = require('../models/movieCenter')
const common = require('../common/index')
require('../config/passport')(passport)


async function get(req, res) {
    try {
        return common.successResponse(res, await movieCenter.find())
    } catch (err) {
        return common.errorResponse(res)
    }
}

async function create(req, res) {
    let {name, slug, address, image} = req.body

    let slugIsExist = await checkUniqueSlug(slug)
    if(slugIsExist) {
        return common.errorResponse(res, 'This slug is already exist!')
    }

    let newMovieCenter = new movieCenter({
        name: name,
        slug: slug,
        address: address,
        image: image
    })

    try {
        let isSaved = await newMovieCenter.save()
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
            let data = await movieCenter.findOne({ slug: slug })
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
    let {name, slug, address, image, status} = req.body

    if(id) {
        try {
            let data = await movieCenter.findOne({ _id: id })
            if(data) {
                let isUpdated = await movieCenter.updateOne(
                    {"_id": id},
                    {
                        name: name,
                        slug: slug,
                        address: address,
                        image: image,
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

    if(id && await movieCenter.findOne({ _id: id })) {
        try {
            let isDeleted = await movieCenter.deleteOne({ _id: id })
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
    let data = await movieCenter.findOne({ slug: slug});
    if(data) return true
    return false
}

module.exports = {
    get, create, find, update, destroy
}