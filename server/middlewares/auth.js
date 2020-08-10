const { verifyToken } = require('../helpers/jwt')
const { Task, User } = require('../models')

const authentication  = (req, res, next) => {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token)
    req.userId = decoded.userId
    User.findByPk(decoded.userId)
    .then(user => {
        if(user) {
            next()
        } else {
            throw {name: 'authenticationError', message: "user not found", status:404}
        }
    })
    .catch(err => {
        console.log(err)
        throw {name:"authenticationError", message: err.message, status: 500}
    })
}

const authorization  = (req, res, next) => {
    const { id } = req.params
    Task.findByPk(id)
    .then(task => {
        if(task) {
            if(task.UserId === req.userId) {
                next()
            } else {
                throw {name: "authorizationError" , message: "unauthorized to do this action", status: 403}
            }
        } else {
            throw {name: "authorizationError" , message: "Task not found", status: 404}
        }
    })
    .catch(next)
}

module.exports = {
    authentication,
    authorization
}
