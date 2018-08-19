
const expressEdge=require('express-edge')
const express=require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const edge = require('edge.js')

// const path=require('path')
// const Post = require('./database/models/Post')

const createPostController = require('./controllers/createPost')
const homePageController   = require('./controllers/homePage')
const storePostController  = require('./controllers/storePost')
const getPostController    = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController  = require('./controllers/storeUser')
const loginController      = require('./controllers/login')
const loginUserController  = require('./controllers/loginUser')
const logoutController     = require('./controllers/logout')


const app=new express();
mongoose.connect('mongodb://localhost/nodeBlog')

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
	secret:'secret',
	store: new mongoStore({
		mongooseConnection: mongoose.connection
	})
}))





app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)
app.set('views',`${__dirname}/views`)

app.use('*', (req,res,next)=>{
	edge.global('auth', req.session.userId)
	next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

//home page
app.get('/', homePageController);

//new post page
app.get('/posts/new', auth,  createPostController); //calls auth middleware before calling controller

//store post to database
app.post('/posts/store', auth, storePost, storePostController);

//view single post page
app.get('/post/:id', getPostController);

//register page
app.get('/auth/register', redirectIfAuthenticated, createUserController);

//register to database
app.post('/users/register', redirectIfAuthenticated, storeUserController);

//login page
app.get('/auth/login', redirectIfAuthenticated, loginController);

//login to database
app.post('/users/login', redirectIfAuthenticated, loginUserController);

//logout user
app.get('/auth/logout',  logoutController)


// app.get('/about', (req,res)=>{
// 	res.render('about')
// })

// app.get('/contact', (req,res)=>{
// 	res.render('contact')
// })



app.listen(4000,()=>{
	console.log('Server is now running 4000')
})

