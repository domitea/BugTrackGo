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
		sails.log(JSON.stringify(req.param("name")));
		res.redirect('/home');
	}
};

