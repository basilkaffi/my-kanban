const jwt = require('jsonwebtoken')

const generateToken = user => {
    return jwt.sign({
        userId: user.id
    }, process.env.SECRET_TOKEN)
}

const verifyToken = token => {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}

module.exports = {
    generateToken,
    verifyToken
}