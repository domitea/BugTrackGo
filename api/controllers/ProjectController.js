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
		sails.log("No way");
		res.view();
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
		
		res.redirect('/home');
	}
};

