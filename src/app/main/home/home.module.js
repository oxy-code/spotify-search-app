(function() {
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider){
    	$stateProvider.state('app.home', {
    		url: '/',
    		views: {
    			'content@app': {
    				templateUrl: 'app/main/home/home.html',
    				controller: 'HomeController as vm'
    			}
    		}
    	});

        // msApi
        msApiProvider.register('spotify', ['https://api.spotify.com/v1/search?q=:q&type=:type']);
    }
})();