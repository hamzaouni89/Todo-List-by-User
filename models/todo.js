var mongoose = require('mongoose')
var todoSchema = new mongoose.Schema({
    titre: String, description : String 
}) 
module.exports=mongoose.model('Todo',todoSchema)