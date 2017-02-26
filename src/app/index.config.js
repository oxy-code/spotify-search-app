(function () {
	'use strict';
	/**
	 * Main configuration
	 */
	angular.module('ng1-init')
		.config(config);

	/** @ngInject */
	function config($stateProvider, $urlRouterProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		// State definitions
		$stateProvider
		    .state('app', {
		        abstract: true,
		        views   : {
		            'main@' : {
		                templateUrl: 'app/core/layout/main.html',
		                controller : 'MainController as vm'
		            },
		            'toolbar@app' : {
		                templateUrl: 'app/toolbar/toolbar.html',
		                controller : 'ToolbarController as vm'
		            },
		            'navigation@app' : {
		                templateUrl: 'app/navigation/navigation.html',
		                controller : 'NavigationController as vm'
		            }
		        }
		    });
	}
})();