var Q = require('q');
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	home: function (req, res) {

		Q.all([
			Bug.find({creator: res.locals.user.id, solved: false}).then(),
			Bug.find({assignedTo: res.locals.user.id, solved: false}).then(),
		]).spread(function (myBugs, assignedBugs) {

			var bugs = [];

			for (var i = 0; i < assignedBugs.length; i++)
			{
				if (assignedBugs[i].creator != res.locals.user.id)
				{
					bugs.push(assignedBugs[i]);
				}
			}

			res.view({bugs: myBugs, assignedBugs: bugs});
		}).fail(function (why) { res.serverError(why)});
	}
};
