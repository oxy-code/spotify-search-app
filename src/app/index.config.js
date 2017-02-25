(function () {
	'use strict';
	/**
	 * Main configuration
	 */
	angular.module('ng1-init')
		.config(config);

	/** @ngInject */
	function config($stateProvider, $urlRouterProvider, $locationProvider){
		//$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');

		// State definitions
		$stateProvider
		    .state('app', {
		        abstract: true,
		        views   : {
		            'main@' : {
		                templateUrl: 'app/main/main.html',
		                //controller : 'MainController as vm'
		                controller : function(){
		                	console.log('hello')
		                }
		            }/*,
		            'toolbar@app'   : {
		                templateUrl: layouts[layoutStyle].toolbar,
		                controller : 'ToolbarController as vm'
		            }*/
		        }
		    });
	}
})();