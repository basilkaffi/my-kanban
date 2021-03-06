const router = require('express').Router()
const taskRoutes = require('./taskRoutes')
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleSign', userController.googleSign)
router.use('/tasks', taskRoutes)
router.use(errorHandler)

module.exports = router