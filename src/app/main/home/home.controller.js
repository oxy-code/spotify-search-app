(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController() {
        var vm = this;
        vm.title = 'Angular1 Starter Kit';
        vm.version = '0.1';
        //console.log('HomeController');

        ////////////////

    }
})();