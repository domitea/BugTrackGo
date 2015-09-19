/**
* SpendTime.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	belongsTo: {
		model: 'Task'
	},

	hours: {
		type: 'integer',
		required: true
	},

	minutes: {
		type: 'integer',
		required: true
	},

	description: {
		type: 'text',
		required: true
	},

	createdAt: {
		type: 'datetime'
	},

	creator: {
	 	model: 'User'
	},
  }
};

