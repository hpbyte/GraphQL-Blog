const Post = require('../models/post');
const Tag = require('../models/tag');
const User = require('../models/user');

const resolver = {
	// Queries
	// get all posts
	posts: () => {
		return Post.find().then(posts => posts).catch(err => err);
	},
	// get a specific post based on id
	post: (args) => {
		return Post.findById(args.id).then(post => post).catch(err => err);
	},
	// get all tags
	tags: () => {
		return Tag.find().then(tags => tags).catch(err => err);
	},
	tag: (args) => {
	  	return Tag.findById(args.id).then(tag => tag).catch(err => err);
	}
};

module.exports = resolver;
