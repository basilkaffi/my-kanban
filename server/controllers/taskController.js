const { Task, User } = require('../models')

class TaskController {
    static getTasks(req, res, next){
        Task.findAll({ include: [User], order: [['id', 'ASC']] })
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
    }
    static createTask(req, res, next){
        const{ title, category } = req.body
        Task.create({
            title,
            category,
            UserId: req.userId
        })
        .then(task => {
            res.status(201).json(task)
        })
        .catch(next)
    }
    static updateTask(req, res, next){
        const { id } = req.params
        const { title, category } = req.body
        Task.update({
            title,
            category
        }, {
            where: { id }
        })
        .then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "Task successfully updated"})
            } else {
                throw { name: 'errorUpdate', message: 'task not found', status: 404 }
            }
        })
        .catch(next)
    }
    static deleteTask(req, res, next){
        const { id } = req.params
        Task.destroy({
            where: { id }
        }).then(response => {
            if(response === 1) {
                res.status(200).json({message: "Task successfully deleted"})
            } else {
                throw { name: 'errorDelete', message: 'Task not found', status: 404 }
            }
        }).catch(next)
    }
}

module.exports = TaskController