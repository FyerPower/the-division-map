(function() {
    'use strict';

    angular.module('theDivisionAgent.map', []);

    angular.module('theDivisionAgent.map')
        .config(function($stateProvider) {
            $stateProvider
                .state('map', {
                    url: '/map?path&center&zoom&debug',
                    templateUrl: 'modules/map/controllers/map/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                });
        });
}());
