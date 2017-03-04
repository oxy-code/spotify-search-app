(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($rootScope, $timeout, msApi, $mdDialog) {
        var vm = this;
        vm.title = 'Music Search App';
        vm.version = '0.1';
        vm.results = {};

        ////////////////
        vm.resultsCountAsString = resultsCountAsString;
        vm.prev = prev;
        vm.next = next;
        vm.showAlbumDetail = showAlbumDetail;
        vm.showArtistDetail = showArtistDetail;

        /** Event Listner to catch the event RESULTS.FOUND from the ToolbarController */
        $rootScope.$on("RESULTS.FOUND", resultsFound);

        /**
         * resultsFound() will be called once 
         * when the event RESULTS.FOUND successfully triggered 
         * from $rootScope
         */
        function resultsFound(event, data){
            angular.extend(vm.results, data);
            //console.log(vm.results)
            $timeout(function(){
                $rootScope.loadingProgress = false;
            });
        }

        /** It will prints the results count as 'Showing of a-b of n' records */
        function resultsCountAsString(type){
            var offset = vm.results[type].offset;
            var limit = vm.results[type].limit;
            var total = vm.results[type].total;
            return (total) ? 'Showing ' + (offset + 1) + ' - ' + ((offset + limit) < total ? (offset + limit || 1 * limit) : total) + ' of ' + total : 'No '+type+' found';
        }

        /**
         * It will emit an event and which is listened 
         * from ToolbarController and then the ToolbarController will make
         * a request to our service finally it will render the results
         */
        function prev(type){
            $rootScope.loadingProgress = true;
            var offset = vm.results[type].offset - vm.results[type].limit;
            var requestObj = {
                offset: offset > 0 ? offset : 0,
                limit: vm.results[type].limit,
                type: type
            };
            $rootScope.$emit("QUERY.PREV.RESULTS", requestObj);
        }

        /**
         * It will emit an event and which is listened 
         * from ToolbarController and then the ToolbarController will make
         * a request to our service finally it will render the results
         */
        function next(type){
            $rootScope.loadingProgress = true;
            var offset = vm.results[type].offset + vm.results[type].limit;
            var requestObj = {
                offset: offset > 0 ? offset : 0,
                limit: vm.results[type].limit,
                type: type
            };
            $rootScope.$emit("QUERY.NEXT.RESULTS", requestObj);
        }

        function showAlbumDetail(ev, albumID){
            $mdDialog.show({
                controller: 'AlbumDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/home/dialogs/album.detail.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    id: albumID
                },
                bindToController: true
            })
            .then(angular.noop, angular.noop);
        }

        function showArtistDetail(ev, artistID){
            $mdDialog.show({
                controller: 'ArtistDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/home/dialogs/artist.detail.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    id: artistID
                },
                bindToController: true
            })
            .then(angular.noop, angular.noop);
        }

    }
})();