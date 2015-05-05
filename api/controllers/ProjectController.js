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
		Project.findOne({id: req.param('id')}).exec(function (err,found) {
			if (err) {
				next(err);
			}
			project = found;

			Q.all([
				User.findOne({id: project.creator}).then(),
				Bug.find({belongsTo: project.id}).then(),
			]).spread(function (user, bugs) {

				project.creator = user;
				project.bugs = bugs;

				res.view({project: project});
			}).fail(function (why) {
				res.serverError(why)
			});
		});

	},
	
	list: function (req, res) {	
		var userId = res.locals.user.id;

		Q.all([
		// Find all projects where creator is logged user
		Project.find({creator: userId}).then(),
		// Find all public projects where creator is NOT logged user
		Project.find({privacy: "public"}).then(),
		// Find other projects (= private) where creator is NOT logged user
		Project.find({privacy: "private"}).then()
		]).spread(function (my, public, other) {
			res.view({my: my, public: public , other: other});
		}).fail(function (why) {
			res.serverError(why);
		});

	},
	
	edit: function (req, res) {
		var name = req.param('name');
		var description = req.param('description');
		var privacy = req.param('privacy');
		var status = req.param('status');
		var id = req.param('id');

		Project.merge(id, {name: name, description: description, privacy: privacy, status: status}, function (err, changed) {
		res.redirect('/project/' + changed.id);
		});
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
	},

	remove: function(req, res) {
		Project.destroy({id: req.param('id')}).populate('bugs').exec(function (err) {
			if (err)
			{
				res.serverError(err);
			}

			res.redirect('/home');
		});
	},

	editview: function (req, res) {
		Project.findOne({id: req.param('id')}).exec(function (err, found) {
			if (err)
			{
				res.serverError(err);
			}

			res.view({project: found});
		});
	},
};

