var express = require('express')
var User = require('../models/user')
var router = express.Router()



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
router.get('/getUser', function(req,res, next){
    User.find(function(err, users){
        if(err){
            res.send(err)
        }
        else{
            res.send(users)
        }
    })
})

router.get('/getUser/:id', function(req,res, next){
    var id=req.params.id
    User.findById(id).exec(function(err, user){
        if(err){
            res.send(err)
        }
        else{
            res.send(user)
        }
    })
})


router.get('/deleteUser/:id', function(req,res, next){
    var id=req.params.id
    
    User.findByIdAndRemove(id).exec(function(err, user){
        if(err){
            res.send(err)
        }
        else{
            res.send(user)
        }
    })
})



router.post('/addTodos/:id', function(req,res, next){
    var id=req.params.id
    var username=req.body.username
    var password=req.body.password
    var email=req.body.email
    
    
    Todo.updateOne({ "_id" : id }, { $set: { username : username , email : email , password : password} }).exec(function(err, user){
        if(err){
            res.send(err)
        }
        else{
            res.send(user)
        }
    })
})


router.post('/login', function(req,res, next){  
      
    var password=req.body.password
    var email=req.body.email
    User.findOne({ "email" : email } ).exec(function(err, user){
        if(err){
            res.send(err)
        }
        else{
            if(user){
                if (password== user.password)
                {
                    res.send({message:"success",user})
                }  else {
                    res.send({message:'wrong password'});
                }
            } else {
                res.send({message:'wrong email'});
            }
              
        }
    })
})

router.get('/addTodos/:idUser/:idTodo', function(req,res, next){
    var idUser=req.params.idUser
    var idTodo=req.params.idTodo

    User.updateOne({ "_id" : idUser }, { $push: { todos : idTodo}} ).exec(function(err, user){
        if(err){
            res.send(err)
        }
        else{
            res.send(user)
        }
    })
})
router.get('/deleteTodos/:idUser/:idTodo', function(req,res, next){
    var idUser=req.params.idUser
    var idTodo=req.params.idTodo

    User.updateOne({ "_id" : idUser }, { $pull: { todos : idTodo}} ).exec(function(err, user){
        if(err){
            res.send(err)
        }
        else{
            res.send(user)
        }
    })
})

router.get('/deleteTodo/:idUser/:idTodo', function(req,res, next){
    var idUser=req.params.idUser
    var idTodo=req.params.idTodo

    User.findOne({ "_id" : idUser } ).exec(function(err, user){
        if(err){
           
            res.send(err)
        }
        else{
            for(var i=0; i<=user.todos.length; i++){
                
                
                if (user.todos[i]==idTodo ){
                    
                    user.todos.splice(i, 1);
                    
                    break;                          
                } 
            }
            User.updateOne({ "_id" : idUser }, { $set: { todos : user.todos}} ).exec(function(err, user){
                if(err){
                    res.send(err)
                }
                else{
                    res.send(user)
                }
            })
        }
    })
})

module.exports=router;