const errorMiddleware = (err, req, res, next) => {
    try {
        const error = { ...err }
        error.message = err.message

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(el => el.message)
            error.message = message.join(', ')
            error.statusCode = 400
        }

        if (err.code === 11000) {
            error.message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error.statusCode = 400
        }

        if (err.name === 'CastError') {
            error.message = `Resource not found`
            error.statusCode = 404
        }

        if (err.name === 'JsonWebTokenError') {
            error.message = `Json web token is invalid`
            error.statusCode = 401
        }

        if (err.name === 'TokenExpiredError') {
            error.message = `Json web token is expired`
            error.statusCode = 401
        }


        if (error.name === 'CustomError') {
            error.statusCode = error.statusCode || 400
        }


        if (error.name === 'SyntaxError') {
            error.message = `Invalid syntax`
            error.statusCode = 400
        }


        if (error.code === 'ENOTFOUND') {
            error.message = `No internet connection`
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })


    } catch (error) {
        next(error)
    }
}

export default errorMiddleware