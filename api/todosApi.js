var express = require('express')
var Todo = require('../models/todo')
var router = express.Router()
var authenticate = require('./auth').authenticate;

router.post('/addTodo', authenticate, function (req, res, next) {
    var todo = new Todo(req.body);
    console.log(req.body)
    todo.save(function (err, todo) {
        if (err) {
            res.send(err)
        } else {
            res.send(todo)
        }
    })
})
router.get('/getTodos', authenticate, function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(todos)
        }
    })
})

router.get('/getTodo/:id', authenticate, function (req, res, next) {
    var id = req.params.id
    Todo.findById(id).exec(function (err, todo) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(todo)
        }
    })
})


router.get('/deleteTodo/:id', authenticate, function (req, res, next) {
    var id = req.params.id

    Todo.findByIdAndRemove(id).exec(function (err, todo) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(todo)
        }
    })
})

router.post('/updateTodo/:id', authenticate, function (req, res, next) {
    var id = req.params.id
    var titre = req.body.titre
    var description = req.body.description

    Todo.findByIdAndUpdate({ "_id": id }, { $set: { titre: titre, description: description } }).exec(function (err, todo) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(todo)
        }
    })
})

module.exports = router;