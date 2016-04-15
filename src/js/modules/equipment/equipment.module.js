(function() {
    'use strict';

    angular.module('theDivisionAgent.equipment', []);

    angular.module('theDivisionAgent.equipment')
        .config(function($stateProvider) {
            $stateProvider
                .state('equipment', {
                    url: '/equipment?slot',
                    templateUrl: 'modules/equipment/equipment.html',
                    controller: 'EquipmentController',
                    controllerAs: 'vm',
                    params: {
                        slot: { value: '', squash: true },
                    }
                });
        });
}());
