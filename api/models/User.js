var User = {
  // Enforce model schema in the case of schemaless databases
  //schema: true,

  beforeCreate: function(values, next) {
    next();
  },

  attributes: { 
    
    id: {
      type: 'string',
      primaryKey: true
    },
    
    username: { 
     type: 'string', 
     unique: true 
    },
    
    email: { 
      type: 'email',  
      unique: true 
    },
    
    passports: { 
      collection: 'Passport', 
      via: 'user' 
    },
    
    admin: {
      type: 'boolean'
    },

    projects: {
      collection: 'Project',
      via: 'creator'
    },
    
    createdBugs: {
      collection: 'Bug',
      via: 'creator'
    },
    
    assignedBugs: {
      collection: 'Bug',
      via: 'assignedTo'
    }
  }
};

module.exports = User;
