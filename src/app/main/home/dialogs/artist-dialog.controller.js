(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('ArtistDialogController', ArtistDialogController);

    /* @ngInject */
    function ArtistDialogController(msApi,$mdDialog, $scope, $mdToast) {
        var vm = this;
        vm.artist = {};

        ////////////////
        vm.close = close;

        msApi.request('spotify.artists@get', {id: vm.id}, successFn, failureFn);

        function successFn(data){
        	$scope.$evalAsync(function(){
        		vm.artist = data;
        	});
        }

        function failureFn(err){
        	$scope.$evalAsync(function(){
	        	$mdToast.show(
	                $mdToast.simple()
	                    .textContent(err.data.error.message)
	                    .position('bottom left')
	                    .toastClass("error-toast")
	            );
	        });
        }

        function close(){
        	$mdDialog.cancel();
        }

    }
})();