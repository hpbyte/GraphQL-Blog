const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	comment: {
		type: String,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	comments: [commentSchema],
	tags: [{
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Post', postSchema);
