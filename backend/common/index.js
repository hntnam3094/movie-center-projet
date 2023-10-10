function getTokenFromHeader(req, res, next) {
    if (req.headers && req.headers.authorization) {
        console.log(req.headers.authorization)
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
        return next();
        } else {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized'
            })
        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized'
        })
    }
}

function successResponse (res, data = [], message = 'Action successful') {
    return res.json({
        success: true,
        message: message,
        data: data
    })
}

function errorResponse (res, err = 'Action failed', code = 500) {
    return res.status(code).json({
        success: false,
        message: err
    })
}

function unauthorizedResponse (res) {
    return res.status(403).send({
        success: false,
        message: 'Unauthorized'
    })
}

module.exports = {
    getTokenFromHeader,
    successResponse,
    errorResponse,
    unauthorizedResponse
}