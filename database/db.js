var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todoDatabse' , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex : true})