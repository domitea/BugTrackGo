var User = {
  // Enforce model schema in the case of schemaless databases
  //schema: true,

  attributes: { 
    
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
    
    isDeveloperIn: {
      collection: 'Project',
      via: 'developers'
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
