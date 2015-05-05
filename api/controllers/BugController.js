var Q = require('q');
/**
 * BugController
 *
 * @description :: Server-side logic for managing bugs
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

	newBug: function (req, res) {
		var name = req.param('name');
		var description = req.param('description');
		var belongsTo = req.param('belongsTo');
		var priority = req.param('priority');
		var assignedTo = req.param('assignedTo');
		var creator = res.locals.user;

		Project.findOne({id: belongsTo}).exec(function (err, project) {
			if (err) {
				sails.log(err);
				next(err);
			}

			project.bugs.add({name: name,
						description: description,
						assignedTo: assignedTo,
					  	priority: priority,
					  	creator: creator });
			project.save(function (err, created) {
				sails.log(err);
				res.redirect("/project/");
			});
		});

	},

	detail: function (req, res) {
		var id = req.param('id');

		Q.all([
			Bug.findOne({id: id}).populate('creator').populate('belongsTo').then(),
			Comment.find({belongsTo: id}).then(),
		]).spread(function (bug, comments) {
			sails.log(bug);
			sails.log(comments);
			res.view({bug: bug, comments: comments});
		}).fail(function (why) {
			res.serverError(why);
		})
	}
};

