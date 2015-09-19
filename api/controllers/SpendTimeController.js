/**
 * SpendTimeController
 *
 * @description :: Server-side logic for managing spendtimes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function (req, res) {
		res.view();
	},

	newSpendTime: function (req, res) {
		var hours = req.param("hours");
		var minutes = req.param("minutes");
		var description = req.param("description");
		var creator = res.locals.user;

		Task.findOne({id: req.param("belongsTo")}).exec(function (err, task) {
			if (err) {
				sails.log(err);
				next(err);
			}

			task.timeSpend.add({hours: hours,
									 minutes: minutes,
									 description: description
									 creator: creator});
			task.save(function (err, created) {
				sails.log(err);
				res.redirect("/task/");
			});
		});
		
	},

	projectList: function (req, res) {
		// TODO List of SpendTimes in project...
	},

	remove: function(req, res) {
		SpendTime.destroy({id: req.param('id')}).exec(function (err) {
			if (err)
			{
				res.serverError(err);
			}

			res.redirect('/home');
		});
	},
	
	list: function(req, res) {
		Q.all([
			SpenTime.find({creator: res.locals.user.id}).populate("belongsTo").then()
		]).spread(function (mySpendTime) {
			res.view({spendTime: mySpendTime})
		}).fail(function (why) {
			res.serverError(why);
		});
	},
};

