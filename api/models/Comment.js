/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {

		creator: {
			model: 'User',
			required: true
		},

		creatorName: {
			type: 'string',
			required: true
		},

		belongsTo: {
			model: 'Bug',
			required: true
		},

		text: {
			type: 'String',
			required: true
		}
	}
};
