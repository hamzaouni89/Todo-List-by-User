var express = require('express')
var app = express()
var db=require('./database/db')
var users=require('./api/usersApi')
var todos=require('./api/todosApi')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/todos',todos)
app.use('/users',users)

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, (err =>{
  if(err) throw err;
  console.log('server is running on port 3000')
}))