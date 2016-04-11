(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .filter('msToMinSec', msToMinSec);

    function msToMinSec() {
		return function(value) {
            // value = value / 1000;
            // var minutes = Math.floor(value / 60);
            // var seconds = ((value % 60)).toFixed(0);
            // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

            function addZ(n) {
                return (n<10? '0':'') + n;
            }

            value = Math.floor(value / 1000);
            var secs = Math.floor(value % 60);
            value = (value - secs) / 60;
            var mins = Math.floor(value % 60);
            var hrs  = Math.floor((value - mins) / 60);

            return (hrs ? (hrs + ':' + addZ(mins)) : mins) + ':' + addZ(secs);
		};
	}
}());
