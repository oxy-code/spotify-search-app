(function ()
{
    'use strict';

    angular
        .module('ng1-init')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, $cookies)
    {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            //Auth.isLoggedIn();
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });

    }
})();