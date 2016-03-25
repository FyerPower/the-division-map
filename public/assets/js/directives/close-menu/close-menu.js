(function() {
    angular
        .module('theDivisionAgent')
        .directive('tdaCloseMenu', tdaCloseMenu);

    tdaCloseMenu.$inject = ['$window'];
    function tdaCloseMenu($window) {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                $(elem).on('click', function(){
                    if( $window.innerWidth < 768 ) {
                        $(elem).closest('nav').find('button.navbar-toggle').click();
                    }
                });
            }
        };
    }
})();
