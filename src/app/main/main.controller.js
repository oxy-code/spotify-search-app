(function() {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    /* @ngInject */
    function MainController() {
        var vm = this;
        vm.title = 'Controller';
        console.log('page loaded')

        ////////////////
        
    }
})();