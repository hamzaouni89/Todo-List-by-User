var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  username: String,   email: {
    type:String,
    unique: true
}, password : String , todos: [{type: Schema.Types.ObjectId,ref: 'Todo', require: false}]
}) 
module.exports=mongoose.model('User',userSchema)