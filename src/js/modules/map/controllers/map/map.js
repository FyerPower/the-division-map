(function() {
    'use strict';

    angular.module('theDivisionAgent.map')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$rootScope', '$stateParams', '$timeout', '$document', '$window', '$interval', 'GoogleURLShortener', 'localStorageService'];
    function MapController($scope, $rootScope, $stateParams, $timeout, $document, $window, $interval, GoogleURLShortener, localStorageService){
        var vm = this;

        vm.initialized = false;
        vm.menuCollapsed = ($window.innerWidth < 768);
        vm.tab = 'filters';

        $timeout(function(){ vm.initialized = true; }, 100);
        vm.toggleMenu = function(){
            vm.menuCollapsed = !vm.menuCollapsed;
        };
        vm.showTab = function(tabName){
            if(vm.menuCollapsed || vm.tab === tabName)
                vm.toggleMenu();
            vm.tab = tabName;
        };


        //
        // Zoom In / Out
        //


        vm.zoomAtMin = false;
        vm.zoomAtMax = false;
        vm.zoomDecrease = function(){
            $scope.$broadcast('map-decrease-zoom-level', updateZoomSettings);
        };
        vm.zoomIncrease = function(){
            $scope.$broadcast('map-increase-zoom-level', updateZoomSettings);
        };

        $scope.$on('map-zoom-changed', function(e, atMinimumZoom, atMaximumZoom){
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


        //
        // Map Filter Tab
        //


        $scope.slider = {
            value: localStorageService.get('map-icon-scale') || 1,
            options: {
                floor: 0.5,
                ceil: 1,
                step: 0.1,
                precision: 1,
                showTicksValues: true,
                onChange: function(sliderId, modelValue, highValue){
                    $scope.$broadcast('map-marker-size', modelValue);
                }
            }
        };

        vm.filters = [
            { enabled: filterEnabled('Checkpoints'),     markerType: 'Checkpoints',     icon: "/img/icons/checkpoint.svg",       name: "Checkpoints" },
            { enabled: filterEnabled('DZEntrances'),     markerType: 'DZEntrances',     icon: "/img/icons/dz-enterance.svg",     name: "DZ Entrances" },
            { enabled: filterEnabled('SafeHouses'),      markerType: 'SafeHouses',      icon: "/img/icons/saferoom.svg",         name: "Safe Houses" },
            { enabled: filterEnabled('Extractions'),     markerType: 'Extractions',     icon: "/img/icons/extraction.svg",       name: "Extractions" },
            { enabled: filterEnabled('Landmarks'),       markerType: 'Landmarks',       icon: "/img/icons/landmark-off.svg",     name: "Landmarks" },
            { enabled: filterEnabled('ContaminatedZone'), markerType: 'ContaminatedZone', icon: "/img/icons/containment-zone.svg", name: "Contaminated Zones" },
            { enabled: filterEnabled('SubwayEntrances'), markerType: 'SubwayEntrances', icon: "/img/icons/subway.svg",           name: "Subway Entrances"},
            { enabled: filterEnabled('DivisionTech'),    markerType: 'DivisionTech',    icon: "/img/icons/division-tech.svg",    name: "Division Tech" },
            { enabled: filterEnabled('DarkZoneChests'),  markerType: "DarkZoneChests",  icon: "/img/icons/darkzone-chest.svg",   name: "Dark Zone Chests"},
            // { enabled: filterEnabled('DDZRank30Chests'), markerType: "DZRank30Chests",  icon: "/img/icons/dz-rank30-chest.png",  name: "Dark Zone Rank 30 Chests"},
            { enabled: filterEnabled('NamedBosses'),     markerType: 'NamedBosses',     icon: "/img/icons/enemy-named.svg",      name: "Named Bosses" },
            { enabled: filterEnabled('SupplyDrops'),     markerType: 'SupplyDrops',     icon: "/img/icons/supply-drop.svg",      name: "Supply Drops" },
        ];

        function filterEnabled(key){
            return localStorageService.get('map-filter-'+key.toLowerCase()) !== false;
        }

        vm.toggleFilter = function(filter){
            filter.enabled = !filter.enabled;
            localStorageService.set('map-filter-'+filter.markerType.toLowerCase(), filter.enabled);
            if( filter.markerType !== null)
                $scope.$broadcast('map-switch-filter', filter.markerType, filter.enabled);
        };

        vm.toggleAllFilters = function(){
            var status = !_.find(vm.filters, {enabled: true});
            _.each(vm.filters, function(filter){
                filter.enabled = status;
                localStorageService.set('map-filter-'+filter.markerType.toLowerCase(), filter.enabled);
                if( filter.markerType !== null )
                    $scope.$broadcast('map-switch-filter', filter.markerType, filter.enabled);
            });
        };


        //
        // Custom Path Tab
        //


        if($stateParams.path) {
            getShareableURL($stateParams.path);
            var points = $stateParams.path.split('_');
            points = _.map(points, function(pt){
                var latlng = pt.split(',');
                return [+latlng[0], +latlng[1]];
            });
            $timeout(function(){
                $scope.$broadcast('map-pathing-init', points);
            }, 100);
        }

        vm.pathing = false;
        vm.shareableUrl = null;
        var pathArray = [];
        vm.beginPathing = function(){
            vm.pathing = true;
            vm.shareableUrl = null;
            $scope.$broadcast('map-pathing', true);
        };
        vm.endPathing = function(){
            vm.pathing = false;
            $scope.$broadcast('map-pathing', false);

            var pathStr = "";
            _.each(pathArray, function(point){
                if(pathStr !== "")
                    pathStr = pathStr + "_";
                pathStr = pathStr + point[0] + "," + point[1];
            });
            getShareableURL(pathStr);
            pathArray = [];
        };
        vm.undoLastPath = function(){
            $scope.$broadcast('map-pathing-undo');
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
        // Timer Tab
        //

        vm.timersEnabled = false;
        vm.activeTimers = [];

        vm.toggleTimerMode = function(state){
            vm.timersEnabled = state;
            $scope.$broadcast('map-timer-toggle', state);
            if(!state){
                vm.activeTimers = [];
            }
        };

        vm.locateMarker = function(marker){
            $scope.$broadcast('map-marker-center', marker);
            $scope.$broadcast('map-marker-pulse', marker);
        };

        function setupTimerLocation(location) {
            location.respawnTime = moment().add(location.respawn, 'seconds');
            location.respawnTimeTotal = location.respawn * 1000;
            location.respawnMilli = location.respawn * 1000;
            location.respawned = false;
        }

        vm.resetTimer = function(location) {
            setupTimerLocation(location);
        };

        $scope.$on('map-timer-start', function(event, marker, location){
            console.log("$on", Date.now());
            if( !_.find(vm.activeTimers, {id: location.id}) ){
                setupTimerLocation(location);
                location.type = marker.typeFriendly;
                vm.activeTimers.push(location);
                $scope.$apply();
            }
        });

        $interval(function(){
            var current = moment();
            var grace_period = moment().add(2, 'minutes');
            _.each(vm.activeTimers, function(location){
                if(location){
                    location.respawnMilli = location.respawnTime.diff(current);
                    if( location.respawnMilli <= -120000 ){
                        _.remove(vm.activeTimers, location);
                    } else if( location.respawnMilli <= 0 && !location.respawned ){
                        location.respawned = true;
                        vm.locateMarker(location);
                        // play sound
                    }
                }
            });
        }, 1000);

        return vm;
    }

}());
