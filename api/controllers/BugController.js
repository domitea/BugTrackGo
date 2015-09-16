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
		var creator = res.locals.user;

		Project.findOne({id: belongsTo}).exec(function (err, project) {
			if (err) {
				sails.log(err);
				next(err);
			}

			project.bugs.add({name: name,
						description: description,
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
			Bug.findOne({id: id}).populate('creator').populate('belongsTo').populate('assignedTo').then(),
			Comment.find({belongsTo: id}).then(),
		]).spread(function (bug, comments) {
			res.view({bug: bug, comments: comments});
		}).fail(function (why) {
			res.serverError(why);
		})
	},

	remove: function(req, res) {
		Bug.destroy({id: req.param('id')}).exec(function (err) {

			if (err)
			{
				res.serverError(err);
			}

			res.redirect('/home');
		});
	},

	solved: function(req, res) {
		Bug.merge(req.param('id'), {solved: true}, function (err, changed) {
			res.redirect('/bug/' + changed.id);
		});
	},

	editView: function(req, res) {
		Q.all([
			Bug.findOne({id: req.param('id')}).populate('belongsTo').then(),
			User.find().then(),
		]).spread(function (bug, users) {
			if (bug.belongsTo.privacy === 'private') {
				res.view({bug: bug, users: [res.locals.user]});
			} else {
				res.view({bug: bug, users: users});
			}
		}).fail(function (err) {
			res.serverError(err);
		});
	},

	edit: function(req, res) {

		var name = req.param('name');
		var description = req.param('description');
		var priority = req.param('priority');
		var assignedTo = req.param('assignedTo');

		sails.log(assignedTo);

		Bug.merge(req.param('id'), {name: name, description: description, priority: priority, assignedTo: assignedTo}, function (err, changed) {
			res.redirect('/bug/' + changed.id);
		});
	},

	list: function(req, res) {
		Q.all([
			Bug.find({creator: res.locals.user.id}).then()
		]).spread(function (myBugs) {
			res.view({bugs: myBugs})
		}).fail(function (why) {
			res.serverError(why);
		});
	},
};

