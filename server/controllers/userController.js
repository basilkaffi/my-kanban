const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { checkingPwd } = require('../helpers/bcrypt')
const { Op } = require('sequelize')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.gClient_id)

class UserController {
    static register(req, res, next){
        const { name, email, password } = req.body
        User.findOne({
            where: { 
                [Op.or]: [ 
                    { email },
                    { name }
                 ]
             }
        })
        .then(user => {
            if(user) {
                throw {name: 'registerFailed', message: 'email or username already exist', status:400}
            } else {
                return User.create({
                    name,
                    email,
                    password
                })
            }
        })
        .then(user => {
            const token = generateToken(user)
            res.status(201).json({username: user.name, token})
        })
        .catch(next)
    }
    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user => {
            if(user){
                const isValid = checkingPwd(password, user.password)
                console.log(isValid)
                if(isValid) {
                    const token = generateToken(user)
                    res.status(200).json({username: user.name, token})
                } else {
                    throw {name: 'passwordWrong', message: 'email or password is wrong', status: 400}
                }
            } else {
                throw {name: 'emailWrong', message: 'email or password is wrong', status: 400}
            }
        })
        .catch(next)
    }
    static googleSign(req, res, next){
        const { id_token } = req.body
        let email = null
        let name = null
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.gClient_id
        }).then(response => {
            const payload = response.getPayload()
            email = payload.email
            name = payload.name
            return User.findOne({
                where: { email }
            })
        }).then(user => {
            if(user) {
                const token = generateToken(user)
                res.status(200).json({username: user.name, token})
            } else {
                return User.create({
                    name,
                    email,
                    password: "password filler"
                })
            }
        }).then(user => {
            const token = generateToken(user)
            res.status(201).json({username: user.name, token})
        }).catch(next)
    }
}

module.exports = UserController