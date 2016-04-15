(function() {
    'use strict';

    angular.module('theDivisionAgent.home', []);

    angular.module('theDivisionAgent.home')
        .config(function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'modules/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                });
        });
}());
