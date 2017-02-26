(function() {
    'use strict';

    angular
        .module('app.home')
        .service('SpotifyAPI', SpotifyAPI);

    /* @ngInject */
    function SpotifyAPI(msApi) {
        this.fetch = fetch;

        ////////////////

        function fetch(query) {
        	var params = {q: query || '', type: 'album,artist'};
        	return msApi.request('spotify@get', params);
        }
    }
})();