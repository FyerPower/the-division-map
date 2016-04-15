(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .directive('header', header);

    function header(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'common/directives/header/header.html',
            controller: HeaderController,
            controllerAs: 'vm'
        };
    }

    HeaderController.$inject = ['$uibModal'];
    function HeaderController($uibModal){
        var vm = this;

        return vm;
    }
}());
