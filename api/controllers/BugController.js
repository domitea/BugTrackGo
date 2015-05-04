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
		if (req.param('id') === 'undefined') // pokud neni zname id projectu (kliknuti na odkaz z hlavicky)
		{
			Q.all([
			// Find all projects where creator is logged user
			Project.find({creator: userId}).then(),
			// Find all public projects where creator is NOT logged user
			Project.find({privacy: "public", creator: { '!': userId }}).then()
			]).spread(function (my, public) {
				res.view({my: my, public: public, project: null});
			}).fail(function (why) {
				res.serverError(why);
			});
		} else { // pokud znamo id projektu, vyhledame developery projektu
			Project.findOne({id: req.params.id}).populate('developers').exec(function (err, found) {
				res.view({my: null, public: null, project: found});
			});
		}
	}
};

