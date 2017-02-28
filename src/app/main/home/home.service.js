(function() {
    'use strict';

    angular
        .module('app.home')
        .service('SpotifyAPI', SpotifyAPI);

    /* @ngInject */
    function SpotifyAPI(msApi) {
        this.fetch = fetch;
        this.customRequest = customRequest;

        ////////////////

        function fetch(query, qtype) {
        	var params = {
                q: query || '',
                type: qtype || 'album,artist'
            };
        	return msApi.request('spotify@get', params);
        }

        function customRequest(queryParams) {
            queryParams.type = queryParams.type.substring(0, queryParams.type.length - 1);
            return msApi.request('spotify@get', queryParams);
        }
    }
})();