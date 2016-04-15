
(function() {
    'use strict';

    angular.module('theDivisionAgent', [
        // External Libraries
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'angular-clipboard',
        'angular-google-gapi',
        'angulartics',
        'angulartics.google.analytics',
        'angular-svg-round-progressbar',
        'rzModule',
        'LocalStorageModule',

        // Internal Modules
        'theDivisionAgent.home',
        'theDivisionAgent.news',
        'theDivisionAgent.map',
        'theDivisionAgent.builds',
        'theDivisionAgent.equipment'
    ]);

    angular.module('theDivisionAgent')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/home');
            $locationProvider.html5Mode(true).hashPrefix('*');
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
