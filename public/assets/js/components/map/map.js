(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$rootScope', '$stateParams', '$timeout', '$document', '$window', 'GoogleURLShortener'];
    function MapController($scope, $rootScope, $stateParams, $timeout, $document, $window, GoogleURLShortener){
        var vm = this;

        vm.initialized = false;
        $timeout(function(){ vm.initialized = true; }, 100);
        vm.menuCollapsed = ($window.innerWidth < 768);
        vm.toggleMenu = function(){
            vm.menuCollapsed = !vm.menuCollapsed;
        };

        vm.filters = [
            { enabled: true, markerType: 'Checkpoints', icon: "/assets/img/icons/checkpoint.png",        name: "Checkpoints" },
            { enabled: true, markerType: 'DZEntrances', icon: "/assets/img/icons/dz-enterance.png",      name: "DZ Entrances" },
            { enabled: true, markerType: 'SafeHouses', icon: "/assets/img/icons/saferoom.png",           name: "Safe Houses" },
            { enabled: true, markerType: 'Extractions', icon: "/assets/img/icons/extraction.png",        name: "Extractions" },
            { enabled: true, markerType: 'Landmarks', icon: "/assets/img/icons/landmark-off.png",        name: "Landmarks" },
            { enabled: true, markerType: 'SubwayEntrances', icon: "/assets/img/icons/subway.png",        name: "Subway Entrances"},
            // { enabled: true, markerType: 'Containment', icon: "/assets/img/icons/containment-zone.png",  name: "Containment Zone" },
            { enabled: true, markerType: 'DivisionTech', icon: "/assets/img/icons/division-tech.png",    name: "Division Tech" },
            { enabled: true, markerType: "DarkzoneChests", icon: "/assets/img/icons/darkzone-chest.png", name: "Darkzone Chests"},
            { enabled: true, markerType: 'NamedBosses', icon: "/assets/img/icons/enemy-named.png",       name: "Named Bosses" },
        ];

        vm.toggleFilter = function(filter){
            filter.enabled = !filter.enabled;
            if( filter.markerType !== null)
                $rootScope.$broadcast('map-switch-filter', filter.markerType, filter.enabled);
        };

        vm.toggleAllFilters = function(){
            var status = !_.find(vm.filters, {enabled: true});
            _.each(vm.filters, function(filter){
                filter.enabled = status;
                if( filter.markerType !== null )
                    $rootScope.$broadcast('map-switch-filter', filter.markerType, filter.enabled);
            });
        };

        if($stateParams.path) {
            getShareableURL($stateParams.path);
            var points = $stateParams.path.split('_');
            points = _.map(points, function(pt){
                var latlng = pt.split(',');
                return [+latlng[0], +latlng[1]];
            });
            $timeout(function(){
                $rootScope.$broadcast('map-pathing-init', points);
            }, 100);
        }

        vm.pathing = false;
        vm.shareableUrl = null;
        var pathArray = [];
        vm.beginPathing = function(){
            vm.pathing = true;
            vm.shareableUrl = null;
            $rootScope.$broadcast('map-pathing', true);
        };
        vm.endPathing = function(){
            vm.pathing = false;
            $rootScope.$broadcast('map-pathing', false);

            var pathStr = "";
            _.each(pathArray, function(point){
                if(pathStr !== "")
                    pathStr = pathStr + "_";
                pathStr = pathStr + point[0] + "," + point[1];
            });
            getShareableURL(pathStr);
            pathArray = [];
        };

        function getShareableURL(pathStr){
            var longUrl = "http://thedivisionagent.com/map?path="+pathStr;
            GoogleURLShortener.shorten(longUrl).then(function(shortUrl){
                vm.shareableUrl = shortUrl;
            }, function(){
                vm.shareableUrl = "Error";
            });
        }

        $scope.$on('map-pathing-update', function(event, newPathArray){
            pathArray = newPathArray;
        });

        //
        // Zoom In / Out
        //

        vm.zoomAtMin = false;
        vm.zoomAtMax = false;
        vm.zoomDecrease = function(){
            $rootScope.$broadcast('map-decrease-zoom-level', updateZoomSettings);
        };
        vm.zoomIncrease = function(){
            $rootScope.$broadcast('map-increase-zoom-level', updateZoomSettings);
        };

        $rootScope.$on('map-zoom-changed', function(e, atMinimumZoom, atMaximumZoom){
            $scope.$apply(function(){
                updateZoomSettings(e, atMinimumZoom, atMaximumZoom);
            });
        });

        function updateZoomSettings(e, atMinimumZoom, atMaximumZoom){
            vm.zoomAtMin = atMinimumZoom;
            vm.zoomAtMax = atMaximumZoom;
        }

        //
        // Full Screen
        //

        vm.fullscreenEnabled = (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
        vm.fullscreenActive = false;
        vm.toggleFullscreen = function(){
            if( vm.fullscreenEnabled ){
                if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                    // exit full-screen
                    if (document.exitFullscreen) {
                    	document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                    	document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                    	document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                    	document.msExitFullscreen();
                    }
                } else {
                    var i = document.getElementById("the-division-agent-site");
                    // go full-screen
                    if (i.requestFullscreen) {
                        i.requestFullscreen();
                    } else if (i.webkitRequestFullscreen) {
                        i.webkitRequestFullscreen();
                    } else if (i.mozRequestFullScreen) {
                        i.mozRequestFullScreen();
                    } else if (i.msRequestFullscreen) {
                        i.msRequestFullscreen();
                    }
                }
            }
        };
        $document.on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange", function() {
            $scope.$apply(function(){
                vm.fullscreenActive = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
            });
        });

        return vm;
    }

}());
