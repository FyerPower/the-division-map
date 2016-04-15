(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .directive('footer', footer);

    function footer(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'common/directives/footer/footer.html'
        };
    }
}());
