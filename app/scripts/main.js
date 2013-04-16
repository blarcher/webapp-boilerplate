define([
	'backbone',
	'app'
], function (Backbone, App) {
	Backbone.history.start();
	// Initialize the application view
	new App();
});