(function() {
    angular
        .module('theDivisionAgent')
        .directive('tdaPopover', tdaPopover);

    function tdaPopover() {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                function buildPopover() {
                    $(elem).popover({
                        title: attr.popoverTitle,
                        content: attr.tdaPopover,
                        html: true,
                        animation: false,
                        trigger: 'hover',
                        placement: attr.popoverPosition,
                        delay: {show: parseInt(attr.popoverDelay || 400), hide: (parseInt(attr.popoverDelay || 400) / 5)},
                        container: 'body'
                    });
                }
                buildPopover();

                // ui-grid doesn't destroy / recreate elements, it reuses them.  This methodology of reusing elements causes the
                //   popovers to not get updated.  This function will monitor the data and then re-create based on new data.
                attr.$observe('tdaPopover', function(newContent) {
                    $(elem).popover('destroy');
                    buildPopover();
                });

                scope.$on('$destroy', function() {
                    $(elem).popover('hide');
                    $(elem).popover('destroy');
                    $('body > .popover').remove(); // Because `.popover('destroy')` doesn't appear to remove it from the DOM
                });
            }
        };
    }
})();
