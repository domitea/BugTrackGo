/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	home: function (req, res) {
		res.view({userProfile: req.session.passport.user});
	}
};
