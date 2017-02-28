(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($rootScope, $scope, $timeout) {
        var vm = this;
        vm.title = 'Music Search App';
        vm.version = '0.1';
        vm.results = {};

        ////////////////
        vm.resultsCountAsString = resultsCountAsString;
        vm.prev = prev;
        vm.next = next;

        /** Event Listner to catch the event RESULTS.FOUND from the ToolbarController */
        $rootScope.$on("RESULTS.FOUND", resultsFound);

        /**
         * resultsFound() will be called once 
         * when the event RESULTS.FOUND successfully triggered 
         * from $rootScope
         */
        function resultsFound(event, data){
            angular.merge(vm.results, data);
            console.log(vm.results)
            $timeout(function(){
                $rootScope.loadingProgress = false;
            });
        }

        /** It will prints the results count as 'Showing of a-b of n' records */
        function resultsCountAsString(type){
            var offset = vm.results[type].offset;
            var limit = vm.results[type].limit;
            var total = vm.results[type].total;
            return (total) ? 'Showing ' + (offset + 1) + ' - ' + (offset < total ? (offset || 1)* limit : total) + ' of ' + total : 'No '+type+' found';
        }

        function prev(type){
            $rootScope.loadingProgress = true;
            var requestObj = {
                offset: (vm.results[type].offset - vm.results[type].limit) || 0,
                limit: vm.results[type].limit,
                type: type
            };
            $rootScope.$emit("QUERY.PREV.RESULTS", requestObj);
        }

        function next(type){
            $rootScope.loadingProgress = true;
            var requestObj = {
                offset: (vm.results[type].offset + vm.results[type].limit) || 0,
                limit: vm.results[type].limit,
                type: type
            };
            $rootScope.$emit("QUERY.NEXT.RESULTS", requestObj);
        }
    }
})();