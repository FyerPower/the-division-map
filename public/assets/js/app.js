
(function() {
    'use strict';

    angular.module('theDivisionAgent', ['ui.router', 'angular-google-gapi', 'ui.bootstrap', 'angular-clipboard']);

    angular.module('theDivisionAgent')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/home');
            $locationProvider.html5Mode(true).hashPrefix('*');
            $stateProvider
                .state('map', {
                    url: '/map?path',
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

                $(window).resize(function(){
                    $rootScope.$apply(function(){
                        $rootScope.$broadcast('window-resize', window.innerWidth, $rootScope.windowInnerWidth);
                    });
                    $rootScope.windowInnerWidth = window.innerWidth;
                });

            }
        ]);

}());
