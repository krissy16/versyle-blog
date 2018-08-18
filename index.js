
const expressEdge=require('express-edge')
const express=require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const connectMongo = require('connect-mongo')
//const connectFlash = require('connect-flash')
const edge = require('edge.js')

const app=new express();
//mongoose.connect('mongodb://localhost/versyleBlog')

app.use(express.static('public'))
app.use(expressEdge)
app.set('views',`${__dirname}/views`)

app.get('/', (req, res)=>{
	res.render('index')
});




app.listen(4000,()=>{
	console.log('Server is now running on port 4000')
})

