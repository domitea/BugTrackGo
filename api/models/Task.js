/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	id: {
		type: 'string',
		primaryKey: true,
	},
	
	name: {
		type: 'string',
	},
	
	creator: {
		model: 'User'
	},
	
	belongsToProject: {
		model: 'Project'
	},

	belongsToBug: {
		model: 'Bug'
	},

	createdAt: {
		type: 'datetime'
	},

	description: {
		type: 'text',
		required: true
	},

	onBill: {
		type: 'boolean',
		defaultsTo: false
	},

	timeSpend: {
		collection: 'SpendTime',
		via: 'belongsTo'
	},

  }
};

