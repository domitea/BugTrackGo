/**
* Bug.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    
    name: {
      type: 'string',
      required: true
    },
    
   creator: {
      model: 'User',
      required: true
    },
    
    // Bug can be assinged to developer who is developer of project..,
    assignedTo: {
      model: 'User'
    },
    
    belongsTo: {
      model: 'Project',
      required: true
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
  }
};
