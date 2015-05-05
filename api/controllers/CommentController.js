/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res) {
		var text = req.param('text');
		var creator = JSON.parse(req.param('creator'));
		var belongsTo = JSON.parse(req.param('belongsTo'));

		var name = creator.username;

		sails.log(text);
		sails.log(creator);
		sails.log(belongsTo);

		Bug.findOne({id: belongsTo.id}).exec(function (err, bug) {
			if (err) {
				next(err);
			}

			bug.comments.add({
				text: text,
				creator: creator,
				creatorName: name});
			bug.save(function (err, created) {
				res.redirect("/bug/" + bug.id);
			});
		});
	}
};
