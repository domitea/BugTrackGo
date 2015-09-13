var Q = require("q");
/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function (req, res) {
		var userId = res.locals.user.id;
		if (req.param('id') === 'undefined') // pokud neni zname id projektu (kliknuti na odkaz z hlavicky)
		{
			Q.all([
			// Find all projects where creator is logged user
			Project.find({creator: userId}).then(),
			// Find all public projects where creator is NOT logged user
			Project.find({privacy: "public"}).then()
			]).spread(function (my, public) {
				res.view({my: my, public: public, project: null});
			}).fail(function (why) {
				res.serverError(why);
			});
		} else { // pokud znamo id projektu, vyhledame developery projektu
			Project.findOne({id: req.params.id}).exec(function (err, found) {
				res.view({my: null, public: null, project: found});
			});
		}
	},

	newTask: function (req, res) {
		var name = req.param('name');
		var description = req.param('description');
		var belongsToProject = req.param('belongsToProject');
		var creator = res.locals.user;
		
		Project.findOne({id: belongsToProject}).exec(function (err, project) {
			if (err) {
				sails.log(err);
				next(err);
			}

			project.tasks.add({name: name,
						description: description,
					  	creator: creator });
			project.save(function (err, created) {
				sails.log(err);
				res.redirect("/project/");
			});
		});
	},

	detail: function (req, res) {
		Task.findOne({id: req.param('id')}).exec(function (err,found) {
			if (err) {
				next(err);
			}
			task = found;

			Q.all([
				User.findOne({id: task.creator}).then(),
				Project.findOne({id: found.belongsToProject}).then(),
				SpendTime.find({belongsTo: found.id}).then(),
			]).spread(function (user, project, spendTime) {

				task.creator = user;
				task.project = project;
				task.spendTime = spendTime;

				res.view({task: task});
			}).fail(function (why) {
				res.serverError(why)
			});
		});
	},

	remove: function(req, res) {
		
	},

	toBill: function(req, res) {
		Task.merge(req.param('id'), {onBill: true}, function (err, changed) {
			res.redirect('/project/' + changed.belongsToProject);
		});
	},

	editView: function(req, res) {
		
	},

	edit: function(req, res) {

	},

	list: function(req, res) {
		
	},
};

