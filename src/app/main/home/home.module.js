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
        msApiProvider.setBaseUrl('https://api.spotify.com');
        msApiProvider.register('spotify.search', ['/v1/search']);
        msApiProvider.register('spotify.artists', ['/v1/artists/:id']);
        msApiProvider.register('spotify.albums', ['/v1/albums/:id']);
    }
})();