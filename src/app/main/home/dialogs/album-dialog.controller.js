(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('AlbumDialogController', AlbumDialogController);

    /* @ngInject */
    function AlbumDialogController(msApi,$mdDialog, $scope, $mdToast) {
        var vm = this;
        vm.album = {};

        ////////////////
        vm.close = close;

        msApi.request('spotify.albums@get', {id: vm.id}, successFn, failureFn);

        function successFn(data){
        	$scope.$evalAsync(function(){
        		vm.album = data;
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