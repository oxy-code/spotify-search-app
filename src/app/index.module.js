(function() {
    'use strict';
    /**
	 * Main module
	 */
    angular
        .module('ng1-init', [
            'app.core',
            'app.toolbar',
            'app.navigation',
            // include your modules
            'app.home'
        ]);
})();