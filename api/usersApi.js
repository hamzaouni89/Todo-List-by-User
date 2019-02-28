var express = require('express')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var router = express.Router()


const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2'


router.post('/register', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    if (username == null || password == null || email == null) {
        res.status(400).send({
            'error': 'missing  parametres'
        });
    }
    User.findOne({
            attributes: ['email'],
            where: {
                email: email
            }
        })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(password, 10, function (err, bcryptedPassword) {
                    var newUser = User.create({
                            email: email,
                            username: username,
                            password: bcryptedPassword
                        })
                        .then(function (newUser) {
                            res.status(201).send({
                                '_id': newUser._id
                            })
                        })
                        .catch(function (err) {
                            res.status(500).send({
                                'error': 'cannot add user'
                            })
                        })
                })

            } else {
                res.status(409).send({
                    'error': 'user already exsit'
                })
            }

        })
        .catch(function (err) {
            res.status(500).send({
                'error': 'unable to verify user'
            })
        });
})
router.post('/login', function (req, res) {


    var password = req.body.password
    var email = req.body.email
    if (password == null || email == null) {
        res.status(400).send({
            'error': 'missing parametres'
        })
    }
    User.findOne({"email": email}).exec(function (err,userfound) {
            if (userfound) {
                bcrypt.compare(password, userfound.password, function (err, resBycrypt) {
                    if (resBycrypt) {

                        const token = jwt.sign({
                                '_id': userfound._id,
                                'email': userfound.email,
                                'username': userfound.username,
                            },
                            JWT_SIGN_SECRET, {
                                expiresIn: '1h'
                            });
                            res.status(200).send({
                                Message: 'authentification valide',
                                token: token
                            })
                   
                    } else {
                        res.status(403).send({
                            'error': 'invalid password'
                        })
                    }
                    
                });
            } else {
                res.status(404).send({
                    'error': 'user not exist in DB'
                })
            }

        })

});


router.post('/addUser', function (req, res, next) {
    var user = new User(req.body);
    console.log(req.body)
    user.save(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})
router.get('/getUser', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            res.send(err)
        } else {
            res.send(users)
        }
    })
})

router.get('/getUser/:id', function (req, res, next) {
    var id = req.params.id
    User.findById(id).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})


router.get('/deleteUser/:id', function (req, res, next) {
    var id = req.params.id

    User.findByIdAndRemove(id).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})



router.post('/addTodos/:id', function (req, res, next) {
    var id = req.params.id
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email


    Todo.updateOne({
        "_id": id
    }, {
        $set: {
            username: username,
            email: email,
            password: password
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})


router.post('/loginUser', function (req, res, next) {

    var password = req.body.password
    var email = req.body.email
    User.findOne({
        "email": email
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            if (user) {
                if (password == user.password) {
                    res.send({
                        message: "success",
                        user
                    })
                } else {
                    res.send({
                        message: 'wrong password'
                    });
                }
            } else {
                res.send({
                    message: 'wrong email'
                });
            }

        }
    })
})

router.get('/addTodos/:idUser/:idTodo', function (req, res, next) {
    var idUser = req.params.idUser
    var idTodo = req.params.idTodo

    User.updateOne({
        "_id": idUser
    }, {
        $push: {
            todos: idTodo
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})
router.get('/deleteTodos/:idUser/:idTodo', function (req, res, next) {
    var idUser = req.params.idUser
    var idTodo = req.params.idTodo

    User.updateOne({
        "_id": idUser
    }, {
        $pull: {
            todos: idTodo
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})

router.get('/deleteTodo/:idUser/:idTodo', function (req, res, next) {
    var idUser = req.params.idUser
    var idTodo = req.params.idTodo

    User.findOne({
        "_id": idUser
    }).exec(function (err, user) {
        if (err) {

            res.send(err)
        } else {
            for (var i = 0; i <= user.todos.length; i++) {


                if (user.todos[i] == idTodo) {

                    user.todos.splice(i, 1);

                    break;
                }
            }
            User.updateOne({
                "_id": idUser
            }, {
                $set: {
                    todos: user.todos
                }
            }).exec(function (err, user) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(user)
                }
            })
        }
    })
})

module.exports = router;