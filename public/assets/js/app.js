
(function() {
    'use strict';

    angular.module('theDivisionAgent', [
        'ui.router',
        'ui.bootstrap',
        'angular-clipboard',
        'angular-google-gapi',
        'angulartics',
        'angulartics.google.analytics'
    ]);

    angular.module('theDivisionAgent')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/home');
            $locationProvider.html5Mode(true).hashPrefix('*');
            $stateProvider
                .state('map', {
                    url: '/map?path&debug',
                    templateUrl: '/assets/js/components/map/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: '/assets/js/components/home/home.html'
                });
        });


    angular.module('theDivisionAgent')
        .run(['$rootScope', '$state', '$stateParams', 'GoogleURLShortener',
            function ($rootScope, $state, $stateParams, GoogleURLShortener) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.windowInnerWidth = window.innerWidth;
                GoogleURLShortener.init('AIzaSyDdlHtYINPk3rVMKAlrQHj_IFgKdQcvU-M');
            }
        ]);

}());
