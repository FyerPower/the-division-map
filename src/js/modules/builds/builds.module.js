(function() {
    'use strict';

    angular.module('theDivisionAgent.builds', []);

    angular.module('theDivisionAgent.builds')
        .config(function($stateProvider) {
            $stateProvider
                .state('builds', {
                    url: '/builds',
                    templateUrl: 'modules/builds/test.html',
                    controller: 'TestController',
                    controllerAs: 'vm'
                });
        });
}());
