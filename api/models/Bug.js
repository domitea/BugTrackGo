/**
* Bug.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
   
    id: {
      type: 'string',
      primaryKey: true
    },
    
    name: {
      type: 'string',
      required: true
    },
    
   creator: {
      model: 'User',
    },
    
    // Bug can be assinged to developer who is developer of project..,
    assignedTo: {
      model: 'User'
    },
    
    belongsTo: {
      model: 'Project',
    },
    
    description: {
      type: 'string',
      required: true
    },

    priority: {
      type: 'string',
      enum: ['none', 'low', 'normal', 'high'],
      defaultsTo: 'normal'
    },

	 solved: {
		 type: 'boolean',
		 defaultsTo: 'false'
	 },

	 comments: {
		 collection: 'Comment',
		 via: 'belongsTo'
	 }
  }
};

