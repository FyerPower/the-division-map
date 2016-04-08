(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .directive('footer', footer);

    function footer(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/footer/footer.html'
        };
    }
}());
