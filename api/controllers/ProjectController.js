var Q = require('q');

/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	new: function (req, res) {
		res.view();
	},
	
	detail: function (req, res) {		
		res.view();
	},
	
	list: function (req, res) {	
		var userId = res.locals.user.id;
		
		var creatorsProjects = [];
		var publicProjects = [];
		var otherProjects = [];
		
		Q.all([
		// Find all projects where creator is logged user
		Project.find({creator: userId}).then(),
		// Find all public projects where creator is NOT logged user
		Project.find({privacy: "public", creator: { '!': userId }}).then(),
		// Find other projects (= private) where creator is NOT logged user
		Project.find({privacy: "private", creator: { '!': userId }}).then()
		]).spread(function (my, public, other) {
			res.view({my: my, public: public , other: other});
		}).fail(function (why) {
			res.serverError(why);
		});

	},
	
	edit: function (req, res) {		
		res.view();
	},
	
	newProject: function(req, res) {
		
		var name = req.param('name');
		var description = req.param('description');
		var privacy = req.param('privacy');
		var status = req.param('status');
		var creator = res.locals.user;
		
		Project.create({name: name, 
						description: description, 
						privacy: privacy,
						status: status,
						creator: creator},
		function (err,created){
			sails.log("Created project" + created.name);
		});
		
		res.redirect('/project/');
	}
};

