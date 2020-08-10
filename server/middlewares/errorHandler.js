const errorHandler = (err, req, res, next) => {
    console.log(err)
    let statusCode = 500
    let errorCode = "UNKNOWN_ERROR"
    let detail = null

    if(err.name === 'SequelizeValidationError') {
        statusCode = 400
        errorCode = 'validationError'
        let details = []
        err.errors.forEach(error => {
            details.push(error.message)
        });
        detail = details
    } else if(err.name) {
        errorCode = err.name
        detail = err.message
        if(err.status){
            statusCode = err.status
        }
    } else {
        detail = 'internal server error'
    }
    
    res.status(statusCode).json({errorCode, detail})
}

module.exports = errorHandler