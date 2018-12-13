const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	tag: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Tag', tagSchema);
