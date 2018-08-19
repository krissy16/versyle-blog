const User = require('../database/models/User')
const bcrypt = require('bcrypt')

module.exports=(req,res)=>{
	const {email, password} = req.body
	//try to find the user
	User.findOne({email}, (error, user)=>{
		if(user){
			//compare user password
			bcrypt.compare(password, user.password, (error, result)=>{
				//if user password correct, then login user
				if(result){
					//store user session
					req.session.userId=user._id
					//redirect
					res.redirect('/')
				}
				//else redirect user back
				else{
					res.redirect('/auth/login')
				}
			})
		}
		else{
			return res.redirect('/auth/login')
		}
	})
}