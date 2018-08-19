module.exports = (req,res, next) =>{
	if(!req.files.image || !req.body.title || !req.body.subtitle || !req.body.username || !req.body.content){
		return res.redirect('/posts/new')
	}
	next()
}