const router = require('express').Router()
const taskController = require('../controllers/taskController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', taskController.getTasks)
router.post('/', taskController.createTask)
router.put('/:id', authorization, taskController.updateTask)
router.patch('/:id', authorization, taskController.updateTask)
router.delete('/:id', authorization, taskController.deleteTask)

module.exports = router