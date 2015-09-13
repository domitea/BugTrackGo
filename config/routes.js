/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /*'/': {
    view: 'homepage'
  },*/

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',
 
  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',
 
  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',
  
  
  
  'get /home':'UserController.home',

	// project  
  'get /project/new' : 'ProjectController.new',
  'get /project/:id' : 'ProjectController.detail',
  'get /project/' : 'ProjectController.list',
	'get /project/edit/:id' : 'ProjectController.editView',
  'post /project/' : 'ProjectController.newProject',
  'post /project/:id' : 'ProjectController.edit',
	'get /project/remove/:id' : 'ProjectController.remove',

	// bug stuff
	'get /bug/new/:id' : 'BugController.new',
	'post /bug/' : 'BugController.newBug',
	'get /bug/' : 'BugController.list',
	'get /bug/:id' : 'BugController.detail',
	'post /bug/:id' : 'BugController.edit',
	'get /bug/solved/:id' : 'BugController.solved',
	'get /bug/edit/:id' : 'BugController.editView',
	'get /bug/remove/:id' : 'BugController.remove',

	// task stuff
	'get /task/new/:id' : 'TaskController.new',
	'post /task/' : 'TaskController.newTask',
	'get /task/' : 'TaskController.list',
	'get /task/:id' : 'TaskController.detail',
	'post /task/:id' : 'TaskController.edit',
	'get /task/toBill/:id' : 'TaskController.toBill',
	'get /task/edit/:id' : 'TaskController.editView',
	'get /task/remove/:id' : 'TaskController.remove',

	// spendTime stuff
	'get /spendTime/new/:id' : 'SpendTimeController.new',
	'post /spendTime/' : 'SpendTimeController.newSpendTime',
	'get /spendTime/' : 'SpendTimeController.list',
	'get /spendTime/:id' : 'SpendTimeController.projectList',
	'get /spentTime/remove/:id' : 'SpendTimeController.remove',


	'post /comment' : 'CommentController.new',


	'/': '/login'
};
