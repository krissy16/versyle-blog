const Post = require('../database/models/Post')
const User = require('../database/models/User')

module.exports = async (req, res) => {
	const post = await Post.findById(req.params.id)
	const user = await User.findById(post.user_id)
	//console.log(post.user_id+"---"+user+"---------")
	res.render('post',{
		post,
		user
	})
};