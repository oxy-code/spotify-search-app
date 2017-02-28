(function() {
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /* @ngInject */
    function ToolbarController(SpotifyAPI, $mdToast, $rootScope, $timeout) {
        var vm = this;

        ////////////////
        vm.search = search;

        $rootScope.$on("QUERY.PREV.RESULTS", searchPrevPage);
        $rootScope.$on("QUERY.NEXT.RESULTS", searchNextPage);

        /** 
         * The search action will begin to fetch results from the external API
         * only when the user hits enter key or clicks the search icon
         * @param  event
         */
        function search(event){
            if((event instanceof KeyboardEvent && event.keyCode == 13) || event instanceof MouseEvent){
                $rootScope.loadingProgress = true;            
                SpotifyAPI.fetch(vm.query).then(onSuccessFn, onErrorFn);
            }
        }

        function searchPrevPage(event, requestObject){
            var customQuery = requestObject;
            customQuery['q'] = vm.query;
            SpotifyAPI.customRequest(customQuery).then(onSuccessFn, onErrorFn);
        }

        function searchNextPage(event, requestObject){
            var customQuery = requestObject;
            customQuery['q'] = vm.query;
            SpotifyAPI.customRequest(customQuery).then(onSuccessFn, onErrorFn);
        }

        /**
         * onSuccessFn() will be called once 
         * When the SpotifyAPI finishes the request and 
         * returns the promise with success callback
         * @param data
         */
        function onSuccessFn(data){

            /**
             * HomeController has the listener for 'RESULTS.FOUND' 
             * and there the data presentation has been handled
             */
            $rootScope.$emit('RESULTS.FOUND', data);
        }

        /** 
         * onErrorFn() will be called once 
         * when the SpotifyAPI would finishes the request and 
         * returns the promise with error callback
         * @param err
         */
        function onErrorFn(err){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(err.data.error.message)
                    .position('bottom left')
                    .toastClass("error-toast")
            );
            $timeout(function(){
                $rootScope.loadingProgress = false;
            });
        }

    }
})();