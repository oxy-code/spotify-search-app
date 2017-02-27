(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($rootScope, $scope) {
        var vm = this;
        vm.title = 'Music Search App';
        vm.version = '0.1';
        vm.results = {};

        ////////////////

        $rootScope.$on('RESULTS.FOUND', resultsFound);

        function resultsFound(event, data){
            //$scope.$evalAsync(function(){
                vm.results = data;
                console.log(data)
            //});
        }
    }
})();