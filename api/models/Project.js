/**
* Project.js
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
    
    // Name of project
    name: {
      type: 'string',
      required: true      
    },
    
    // Creator of project
    creator: {
      model: 'User',
      required: true
    },
    
    
    description: {
      type: 'string',
      required: true
    },
    
    // If project is public It's visible for all registered developers - read only
    privacy: {
      type: 'string',
      enum: ['public', 'private'],
      required: true
    },
    
    status: {
      type: 'string',
      enum: ['developing', 'testing', 'production'],
      required: true
    },

    // One-to-Many realtionship for Bugs in project  
    bugs: {
      collection: 'Bug',
      via: 'belongsTo'
    },

	tasks: {
		collection: 'Task',
		via: 'belongsToProject'
	},
  }
};

