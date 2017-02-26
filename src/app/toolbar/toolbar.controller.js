(function() {
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /* @ngInject */
    function ToolbarController(SpotifyAPI, $mdToast, $rootScope) {
        var vm = this;

        ////////////////
        vm.search = search;

        function search(event, searchString){

            if((event instanceof KeyboardEvent && event.keyCode == 13) || event instanceof MouseEvent){
            
                SpotifyAPI.fetch(searchString).then(onSuccessFn, onErrorFn);

                function onSuccessFn(data){
                    $rootScope.$emit('RESULTS.FOUND', data);
                }

                function onErrorFn(err){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(err.data.error.message)
                            .position('bottom left')
                            .toastClass("error-toast")
                    );
                }
            }

        }

    }
})();