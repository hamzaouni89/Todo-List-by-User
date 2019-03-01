var mongoose = require('mongoose')
var todoSchema = new mongoose.Schema({
    titre: String, description: String, owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('Todo', todoSchema)