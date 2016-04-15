(function() {
    'use strict';

    angular.module('theDivisionAgent.map')
        .directive('leaflet', MapDirective);

    MapDirective.$inject = ['$rootScope', '$stateParams', '$timeout', 'localStorageService'];
    function MapDirective($rootScope, $stateParams, $timeout, localStorageService){
        return {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function(scope, elem, attrs){
                fixUserLastCenter(); // if the users last location was far out of bounds, reset to edge of map

                var DEBUG_MODE = false || $stateParams.debug;
                var MAX_ZOOM = 4;
                var MIN_ZOOM = 2;
                var ICON_SIZE = 32;
                var STARTING_LAT = ($stateParams.center && +$stateParams.center[0]) || localStorageService.get('map-last-lat') || -60;
                var STARTING_LNG = ($stateParams.center && +$stateParams.center[1]) || localStorageService.get('map-last-lng') || 40;
                var current_zoom = $stateParams.zoom || localStorageService.get('map-zoom') || 3;
                var icon_scale = localStorageService.get('map-icon-scale') || 1;
                var Icons = {};
                var Markers = {};

                // Create Map
                var theDivisionMap = L.map(attrs.id, {
                    center: [STARTING_LAT, STARTING_LNG],
                    zoom: current_zoom,
                    zoomControl: false,
                    maxZoom: MAX_ZOOM,
                    minZoom: MIN_ZOOM,
                }); // Default

                // Add Mouse Position to bottom left of map
                L.control.mousePosition().addTo(theDivisionMap);

                // Define custom map
                // L.tileLayer('/img/map/{z}/{x}/{y}.jpg', {
                L.tileLayer('/img/map_v2/{z}/{x}/{y}.png', {
                    attribution: '',
                    noWrap: true,
                    reuseTiles: true
                }).addTo(theDivisionMap);

                // Build Icons
                buildIcons();

                // Build Markers
                buildMarkers();

                // Loop over all our markers and place them on the map
                _.each(Markers, function(marker){
                    var icon = _.get(Icons, marker.type);
                    _.each(marker.locations, function(loc){
                        loc.marker = L.marker([loc.lat, loc.long], {icon: icon});
                        buildMarkerLabel(marker, loc);
                        if(DEBUG_MODE) {
                            loc.label = "("+loc.id+"): "+loc.label;
                        }
                        if(loc.label !== "") {
                            loc.marker.bindPopup(loc.label);
                            loc.marker.on('mouseover', function (e) {
                                this.openPopup();
                            });
                            loc.marker.on('mouseout', function (e) {
                                this.closePopup();
                            });
                        }
                        loc.marker.on('click', function(e){
                            mapPointClicked(e);
                            markerClicked(e, marker, loc);
                        });
                        if( localStorageService.get('map-filter-'+marker.type.toLowerCase()) !== false ) {
                            loc.marker.addTo(theDivisionMap);
                        }
                    });
                });

                function buildMarkerLabel(marker, location){
                    if( !location.label ) {
                        if( marker.type == "NamedBosses" ) {
                            location.label = "<b>"+(location.subway ? "(Subway) " : "")+"Named Bosses:</b><br/>" + location.bosses.join("<br/>");
                        }
                    }
                }

                //
                // Filter Markers
                //

                scope.$on('map-switch-filter', function(e, markerType, enabled){
                    _.each(_.find(Markers, {type: markerType}).locations, function(loc){
                        if(enabled)
                            loc.marker.addTo(theDivisionMap);
                        else
                            theDivisionMap.removeLayer(loc.marker);
                    });
                });

                //
                // Map Pathing
                //

                var enabledPathing = false;
                var pathArray = [];
                var pathPolygons = [];

                scope.$on('map-pathing', function(e, enabled){
                    enabledPathing = enabled;
                    if(enabled){
                        _.each(pathPolygons, function(poly){
                            theDivisionMap.removeLayer(poly);
                        });
                        pathArray = [];
                        pathPolygons = [];
                    }
                });

                scope.$on('map-pathing-undo', function(){
                    pathArray.pop();
                    scope.$emit('map-pathing-update', pathArray);

                    var lastPolygon = pathPolygons[pathPolygons.length - 1];
                    theDivisionMap.removeLayer(lastPolygon);
                    pathPolygons.pop();
                });

                // attaching function on map click
                theDivisionMap.on('click', mapPointClicked);

                function mapPointClicked(e){
                    if(enabledPathing){
                        var lat = e.latlng.lat.toFixed(1);
                        var lng = e.latlng.lng.toFixed(1);
                        plotPolyLine(lat, lng);
                    }
                }

                function plotPolyLine(lat, lng){
                    var lastPoint = pathArray.length > 0 ? pathArray[pathArray.length-1] : null;
                    if( lastPoint === null || !(lastPoint[0] === lat && lastPoint[1] === lng) ){
                        pathArray.push([lat,lng]);
                        scope.$emit('map-pathing-update', pathArray);

                        if(lastPoint === null){
                            lastPoint = [lat,lng];
                        }

                        var pointA = new L.LatLng(lastPoint[0], lastPoint[1]); // Last Point
                        var pointB = new L.LatLng(lat, lng); // New Point
                        var polyline = new L.Polyline([pointA, pointB], {
                            color: '#39FF14',
                            weight: 5,
                            opacity: 0.7,
                            smoothFactor: 1
                        });
                        polyline.addTo(theDivisionMap);
                        pathPolygons.push(polyline);
                    }
                }

                scope.$on('map-pathing-init', function(e, pointArray){
                    _.each(pointArray, function(point){
                        plotPolyLine(point[0], point[1]);
                    });
                });

                //
                // Custom Map Zoom
                //

                scope.$on('map-increase-zoom-level', function(e, callback){
                    if( current_zoom < MAX_ZOOM ) {
                        current_zoom = current_zoom + 1;
                        theDivisionMap.setZoom(current_zoom);
                        callback(e, current_zoom === MIN_ZOOM, current_zoom === MAX_ZOOM);
                    }
                });

                scope.$on('map-decrease-zoom-level', function(e, callback){
                    if( current_zoom > MIN_ZOOM ) {
                        current_zoom = current_zoom - 1;
                        theDivisionMap.setZoom(current_zoom);
                        callback(e, current_zoom === MIN_ZOOM, current_zoom === MAX_ZOOM);
                    }
                });

                theDivisionMap.on('zoomend', function(e){
                    current_zoom = e.target._zoom;
                    localStorageService.set('map-zoom', current_zoom);
                    scope.$emit('map-zoom-changed', current_zoom === MIN_ZOOM, current_zoom === MAX_ZOOM);
                });

                theDivisionMap.on('moveend', function(e){
                    var center = theDivisionMap.getCenter();
                    localStorageService.set('map-last-lat', center.lat);
                    localStorageService.set('map-last-lng', center.lng);
                });

                //
                // Icon Size Change
                //

                scope.$on('map-marker-size', function(e, scale){
                    icon_scale = scale;
                    localStorageService.set('map-icon-scale', icon_scale);
                    buildIcons();
                    _.each(Markers, function(marker){
                        var icon = _.get(Icons, marker.type);
                        _.each(marker.locations, function(loc){
                            if(loc.marker) {
                                loc.marker.setIcon(icon);
                            }
                        });
                    });
                });

                function fixUserLastCenter(){
                    var lat = localStorageService.get('map-last-lat') || -60;
                    var lng = localStorageService.get('map-last-lng') || 40;
                    if(lat < -90)
                        localStorageService.set('map-last-lat', -70);
                    if(lat > 90)
                        localStorageService.set('map-last-lat', 70);
                    if(lng < -180)
                        localStorageService.set('map-last-lng', -140);
                    if(lng > 180)
                        localStorageService.set('map-last-lng', 140);
                }

                //
                // Timers
                //

                var timerEnabled = false;

                scope.$on('map-timer-toggle', function(e, state){
                    timerEnabled = state;
                });

                function markerClicked(e, marker, loc){
                    if(timerEnabled && (loc.respawn || loc.link)){
                        if(loc.link){
                            var found = false;
                            _.each(Markers, function(m){
                                _.each(m.locations, function(l){
                                    if(!found && loc.link == l.id){
                                        loc = l;
                                        marker = m;
                                        found = true;
                                    }
                                });
                            });
                        }
                        scope.$emit('map-timer-start', marker, loc);
                    }
                }

                scope.$on('map-marker-center', function(e, marker){
                    theDivisionMap.setView(new L.LatLng(marker.lat, marker.long));
                });

                scope.$on('map-marker-pulse', function(e, marker){
                    var pulse = L.marker([marker.lat, marker.long], {icon: Icons.Pulse});
                    pulse.addTo(theDivisionMap);
                    $timeout(function(){
                        theDivisionMap.removeLayer(pulse);
                    }, 10000);
                });


                //
                // Special Icons
                //

                function buildIcons() {
                    var scaled_icon_size = ICON_SIZE * icon_scale;
                    var DivisionIcon = L.Icon.extend({
                        options: {
                            iconSize:     [scaled_icon_size, scaled_icon_size],
                            iconAnchor:   [(scaled_icon_size/2), (scaled_icon_size/2)],
                            popupAnchor:  [0, (0-scaled_icon_size)]
                        }
                    });

                    Icons = {
                        'Extractions':       new DivisionIcon({iconUrl: '/img/icons/extraction.svg'}),
                        'SubwayEntrances':   new DivisionIcon({iconUrl: '/img/icons/subway.svg'}),
                        'Landmarks':         new DivisionIcon({iconUrl: '/img/icons/landmark-off.svg'}),
                        'SafeHouses':        new DivisionIcon({iconUrl: '/img/icons/saferoom.svg'}),
                        'Checkpoints':       new DivisionIcon({iconUrl: '/img/icons/checkpoint.svg'}),
                        'DZEntrances':       new DivisionIcon({iconUrl: '/img/icons/dz-enterance.svg'}),
                        'ContaminatedZone':  new DivisionIcon({iconUrl: '/img/icons/containment-zone.svg'}),
                        'DivisionTech':      new DivisionIcon({iconUrl: '/img/icons/division-tech.svg'}),
                        'DarkZoneChests':    new DivisionIcon({iconUrl: '/img/icons/darkzone-chest.svg'}),
                        'NamedBosses':       new DivisionIcon({iconUrl: '/img/icons/enemy-named.svg'}),
                        'DZRank30Chests':    new DivisionIcon({iconUrl: '/img/icons/dz-rank30-chest.svg'}),
                    };

                    Icons.Pulse = L.divIcon({
                        className: 'css-icon',
                        html: '<div class="leaflet-marker-pulse"></div>',
                        iconSize: [64,64],
                        iconAnchor:   [32, 32],
                        popupAnchor:  [0, -32]
                    });
                }

                //
                // Markers
                //

                function buildMarkers() {
                    Markers = [
                        { type: "Checkpoints", typeFriendly: "Checkpoint", locations: [
                            { id: 1,    lat: -78.32,  long: 32.20,   label: "DZ01 South Checkpoint"},
                            { id: 2,    lat: -75.95,  long: 82.70,   label: "DZ01 East Checkpoint"},
                            { id: 3,    lat: -75.75,  long: -17.50,  label: "DZ01 West Checkpoint"},
                            { id: 4,    lat: -62.10,  long: 82.10,   label: "DZ02 East Checkpoint"},
                            { id: 5,    lat: -61.90,  long: -15.20,  label: "DZ02 West Checkpoint"},
                            { id: 6,    lat: 1.9,     long: -53,     label: "DZ03 Northwest Entrance"},
                            { id: 7,    lat: 1.9,     long: 67.5,    label: "DZ03 Northeast Entrance"},
                            { id: 8,    lat: -25.7,   long: 81.5,    label: "DZ03 Southeast Entrance"},
                            { id: 9,    lat: -36.80,  long: -40.00,  label: "DZ03 Southwest Checkpoint"},
                            { id: 10,   lat: 67.7,    long: -80,     label: "DZ06 West Checkpoint"},
                            { id: 11,   lat: 67.6,    long: 28.6,    label: "DZ06 East Checkpoint"},
                            { id: 12,   lat: 38,      long: 28.2,    label: "DZ05 East Checkpoint"},
                            { id: 13,   lat: 38.8,    long: -65.3,   label: "DZ05 West Checkpoint"},
                        ]},
                        { type: "DZEntrances", typeFriendly: "Entrance", locations: [
                            { id: 14,   lat: -47.00,  long: 82.10,   label: "DZ02 East Entrance"},
                            { id: 15,   lat: -54.60,  long: -19.00,  label: "DZ02 West Entrance"},
                            { id: 16,   lat: -25.6,   long: -47,     label: "DZ03 West Entrance"},
                            { id: 17,   lat: 28,      long: -60.8,   label: "DZ03 West Entrance"},
                            { id: 18,   lat: -13.3,   long: 81.5,    label: "DZ03 East Entrance"},
                            { id: 19,   lat: 28,      long: -60.8,   label: "DZ04 West Entrance"},
                            { id: 20,   lat: 59,      long: 28.4,    label: "DZ05 East Entrance"},
                        ]},
                        { type: "Landmarks", typeFriendly: "Landmark", locations: [
                            { id: 21,   lat: -72.30,  long: 28.00,                 label: "Koreatown"},
                            { id: 22,   lat: -65.10,  long: 32.20,   link: 158,    label: "Blockade"},
                            { id: 23,   lat: -66.25,  long: 54.00,                 label: "Abandoned Gas Station"},
                            { id: 24,   lat: -58.70,  long: 48.00,   link: 159,    label: "Construction Site"},
                            { id: 25,   lat: -41.80,  long: 25.30,   link: 161,    label: "Kalkesse Sporting Store"},
                            { id: 26,   lat: -41.80,  long: 67.00,   link: 162,    label: "The Library"},
                            { id: 27,   lat: -13.40,  long: 32.10,   link: 151,    label: "Refueling Station"},
/**/                        { id: 28,   lat: 8.80,    long: -6.0,    respawn: 300, label: "Arch Plaza"},
                            { id: 29,   lat: 38.5,    long: -41,                   label: "News Chopper Crash"},
                            { id: 30,   lat: 42,      long: -23,                   label: "Scaffolding Collapse"},
                            { id: 31,   lat: 59,      long: 15.0,    link: 166,    label: "The Pit"},
                            { id: 32,   lat: 64.1,    long: -16,     link: 167,    label: "Mid Town Music"},
                            { id: 33,   lat: 70,      long: 6.5,     link: 169,    label: "Q Building"},
                        ]},
                        { type: "Extractions", typeFriendly: "Extraction", locations: [
                            { id: 34,   lat: -70.00,  long: 65.00,  label: "Gas Station Extraction"},
                            { id: 35,   lat: -72.30,  long: -9.50,  label: "Subway Extraction"},
                            { id: 36,   lat: -51.60,  long: 12.10,  label: "Garage Rooftop Extraction"},
                            { id: 37,   lat: -12.80,  long: -6.6,   label: "Bryant Park Extraction"},
                            { id: 38,   lat: 33,      long: 52.4,   label: "Garage Rooftop Extraction"},
                            { id: 39,   lat: 43.3,    long: -5.4,   label: "Street Extraction"},
                            { id: 40,   lat: 52.4,    long: -52,    label: "Rooftop Extraction"},
                            { id: 41,   lat: 69.2,    long: -27.5,  label: "Hotel Rooftop Extraction"},
                        ]},
                        { type: "SafeHouses", typeFriendly: "Safe House", locations: [
                            { id: 42,   lat: -45.50,  long: 50.00,  label: "DZ02 Safe Room"},
                            { id: 43,   lat: -35.20,  long: -4.20,  label: "DZ03 Safe Room"},
                            { id: 44,   lat: 25.9,    long: -1.70,  label: "DZ04 Safe Room"},
                            { id: 45,   lat: 54.6,    long: -5.4,   label: "DZ05 Safe Room"},
                            { id: 46,   lat: 72.7,    long: -8,     label: "DZ06 Safe Room"},
                        ]},
                        { type: "DivisionTech", locations: [
                            { id: 47,   lat: -63,     long: 34,     respawn: 7200, name: "Div Tech: Blockade",            label: "In the corner on top of the scaffolding"},
                            { id: 48,   lat: -60.3,   long: 49.6,   respawn: 7200, name: "Div Tech: S. Construction (1)", label: "Second Floor: Southeast corner of building"},
                            { id: 49,   lat: -57.0,   long: 49.6,   respawn: 7200, name: "Div Tech: S. Construction (2)", label: "Second Floor: Northeast corner of building"},
                            { id: 50,   lat: -58.7,   long: 49.6,   respawn: 7200, name: "Div Tech: S. Construction (3)", label: "Third Floor: Middle of the building"},
                            { id: 51,   lat: -53.5,   long: 77.0,   respawn: 7200, name: "Div Tech: Laundromat (1)",      label: "Right of south entrance"},
                            { id: 52,   lat: -51.5,   long: 77.0,   respawn: 7200, name: "Div Tech: Laundromat (3)",      label: "Left room from the south entrance"},
                            { id: 53,   lat: -53.5,   long: 74.0,   respawn: 7200, name: "Div Tech: Laundromat (2)",      label: "Back right room from south entrance"},
                            { id: 54,   lat: -41.0,   long: 63.0,   respawn: 7200, name: "Div Tech: Library",             label: "Back left corner of boss area"},
                            { id: 55,   lat: -39.0,   long: 28,     respawn: 7200, name: "Div Tech: Sports Store (3)",    label: "Third Floor: Behind the christmas tree"},
                            { id: 56,   lat: -44.3,   long: 28,     respawn: 7200, name: "Div Tech: Sports Store (2)",    label: "Second Floor: Corner of building by the pool tables"},
                            { id: 57,   lat: -44.7,   long: 20,     respawn: 7200, name: "Div Tech: Sports Store (4)",    label: "Third Floor: Outside on scaffolding"},
                            { id: 58,   lat: -43.3,   long: 23,     respawn: 7200, name: "Div Tech: Sports Store (1)",    label: "First Floor"},
                            { id: 59,   lat: -30,     long: 12.5,   respawn: 7200, name: "Div Tech: Christmas Alley",     label: "South east corner of alley"},
                            { id: 60,   lat: -30,     long: 2,      respawn: 7200, name: "Div Tech: Roof DZ03 S.House",   label: "On top of the building behind a fence"},
                            { id: 61,   lat: -24,     long: 50,     respawn: 7200, name: "Div Tech: DZ03 Containment ",   label: "In containment zone north side of street"},
                            { id: 62,   lat: -13.4,   long: 30.5,   respawn: 7200, name: "Div Tech: Refueling Station",   label: "Middle of the area as you walk up the steps"},
                            { id: 63,   lat: -6,      long: 6.5,    respawn: 7200, name: "Div Tech: Bryant Park",         label: "Second Floor: Northeast corner of buildings"},
                            { id: 64,   lat: 8.80,    long: -3.6,   respawn: 7200, name: "Div Tech: Arch Plaza",          label: "Middle of building down one of the main hallways"},
                            { id: 65,   lat: 8.80,    long: -50,    respawn: 7200, name: "Div Tech: W 43rd Alley",        label: "End of Alley"},
                            { id: 66,   lat: 15.3,    long: -57,    respawn: 7200, name: "Div Tech: W 43rd Road End",     label: "End of street behind the truck"},
                            { id: 67,   lat: 9.5,     long: 53.6,   respawn: 7200, name: "Div Tech: DZ03 DT Bldg (2)",    label: "In the backroom behind the desks"},
                            { id: 68,   lat: 6.5,     long: 53.6,   respawn: 7200, name: "Div Tech: DZ03 DT Bldg (1)",    label: "Directly as you walk in from the south entrance"},
                            { id: 69,   lat: 13.5,    long: 68.6,   respawn: 7200, name: "Div Tech: E 43rd Road End",     label: "End of street on the south side"},
                            { id: 70,   lat: 19.6,    long: 16,     respawn: 7200, name: "Div Tech: Sniper Poach",        label: "Left side of the truck in the middle"},
                            { id: 71,   lat: 29.5,    long: 28,     respawn: 7200, name: "Div Tech: DZ04 DT Bldg (3)",    label: "Second Floor: By a desk in southeast corner"},
                            { id: 72,   lat: 31,      long: 29,     respawn: 7200, name: "Div Tech: DZ04 DT Bldg (4)",    label: "Second Floor: In the server room"},
                            { id: 73,   lat: 32.5,    long: 28,     respawn: 7200, name: "Div Tech: DZ04 DT Bldg (2)",    label: "Frist Floor: Back hallway near the northwest side"},
                            { id: 74,   lat: 32.5,    long: 25,     respawn: 7200, name: "Div Tech: DZ04 DT Bldg (1)",    label: "First Floor: Northwest corner room"},
                            { id: 75,   lat: 34.5,    long: 34,     respawn: 7200, name: "Div Tech: 5th Ave Shipping",    label: "Northeast corner of the street by shipping containers"},
                            { id: 76,   lat: 44.9,    long: 15.8,   respawn: 7200, name: "Div Tech: DZ05 DT Bldg",        label: "Middle of building slightly left of entrance"},
                            { id: 77,   lat: 50,      long: 9.9,    respawn: 7200, name: "Div Tech: S. Rockefeller Pl",   label: "Near subway entrance on west side of street"},
                            { id: 78,   lat: 44.5,    long: 0.5,    respawn: 7200, name: "Div Tech: DZ05 Extract N Bldg", label: "Second Floor: West side of north building"},
                            { id: 79,   lat: 42,      long: -2,     respawn: 7200, name: "Div Tech: DZ05 Extract S Bldg", label: "Second Floor: West side of south building"},
                            { id: 80,   lat: 37.5,    long: -41,    respawn: 7200, name: "Div Tech: News Chopper Crash",  label: "Next to crashed helicopter"},
                            { id: 81,   lat: 43.5,    long: -35,    respawn: 7200, name: "Div Tech: News Chopper Alley",  label: "In alleyway on the east side near the building"},
                            { id: 82,   lat: 48,      long: -62,    respawn: 7200, name: "Div Tech: W 47th Road End",     label: "End of the street on the southwest corner"},
                            { id: 83,   lat: 53,      long: -42,    respawn: 7200, name: "Div Tech: W 49th Alley",        label: "In alleyway on the east side near the building"},
                            { id: 84,   lat: 57,      long: -42,    respawn: 7200, name: "Div Tech: W 49th Road",         label: "Northwest corner of the sidewalk near building"},
                            { id: 85,   lat: 65.5,    long: -66.5,  respawn: 7200, name: "Div Tech: North Cleaners",      label: "In the tent on the south side"},
                            { id: 86,   lat: 71,      long: -66.5,  respawn: 7200, name: "Div Tech: 7th Ave (S)",         label: "In a small side alley east of the street"},
                            { id: 87,   lat: 73,      long: -66.5,  respawn: 7200, name: "Div Tech: 7th Ave (N)",         label: "In a small side alley east of the street"},
                            { id: 88,   lat: -74.8,   long: 54,     respawn: 7200, name: "Div Tech: South Parking Lot",   label: "Southeast corner of parking lot behind cars"},
                            { id: 89,   lat: -70.3,   long: -15.2,  respawn: 7200, name: "Div Tech: Greeley Park",        label: "Northeast edge of park, along the benchs"},
                            { id: 90,   lat: 50.5,    long: -31.1,  respawn: 7200, name: "Div Tech: DZ05 Central Bldg",   label: "South side of building"},
                            { id: 91,   lat: 55,      long: 3.8,    respawn: 7200, name: "Div Tech: DZ05 Safe House",     label: "South side of the street on the sidewalk"},
                            { id: 92,   lat: 59.2,    long: 20.3,   respawn: 7200, name: "Div Tech: The Pit",             label: "Top of the stairs behind the planter"},
                            { id: 93,   lat: -13.6,   long: 79.4,   respawn: 7200, name: "Div Tech: E 41st Road End",     label: "Middle of street inside the fencing"},
                            { id: 94,   lat: 70,      long: -7,     respawn: 7200, name: "Div Tech: DZ06 Safe House",     label: "In the alleyway just south of saferoom"},
                            { id: 95,   lat: 70,      long: -25.3,  respawn: 7200, name: "Div Tech: DZ06 Extract (1)",    label: "Outside building on the northeast corner"},
                            { id: 96,   lat: 69.6,    long: -27.6,  respawn: 7200, name: "Div Tech: DZ06 Extract (4)",    label: "Rooftop: Just north of the elevator shaft"},
                            { id: 97,   lat: 70,      long: -29.4,  respawn: 7200, name: "Div Tech: DZ06 Extract (3)",    label: "First Floor: Northwest corner of building behind elevator"},
                            { id: 98,   lat: 68.3,    long: -27.6,  respawn: 7200, name: "Div Tech: DZ06 Extract (2)",    label: "First Floor: Southeast corner of building just left of entrance"},
                            { id: 99,   lat: 74.4,    long: -39.1,  respawn: 7200, name: "Div Tech: W 55th Fencing",      label: "Back of alley behind fencing"},
                            { id: 100,  lat: 73.4,    long: -48.5,  respawn: 7200, name: "Div Tech: W 55th Tent",         label: "Back of tent"},
                            { id: 101,  lat: 70.3,    long: -53.2,  respawn: 7200, name: "Div Tech: W 55th - S. Alley",   label: "Middle of alleyway on the west side"},
                            { id: 102,  lat: 65.0,    long: 10.1,   respawn: 7200, name: "Div Tech: N. Rockefeller Pl",   label: "West side of the street on the sidewalk"},
                            { id: 103,  lat: 57.4,    long: -12.1,  respawn: 7200, name: "Div Tech: Underground Mall",    label: "In Subway"},
                        ]},
                        { type: "DarkZoneChests", locations: [
                            { id: 104,  lat: -78.2,   long: 52.7,   respawn: 3600, name: "DZ Chest: South Spawn",        label: "End of Alley"},
                            { id: 105,  lat: -65.15,  long: 29.6,   respawn: 3600, name: "DZ Chest: Blockade",           label: "Middle of blockade against building"},
                            { id: 106,  lat: -59.75,  long: 47.9,   respawn: 3600, name: "DZ Chest: South Construction", label: "Middle of Building on 1st Floor"},
                            { id: 107,  lat: -43,     long: 25.2,   respawn: 3600, name: "DZ Chest: Sports Store",       label: "Middle of Building on 2nd Floor"},
                            { id: 108,  lat: -42,     long: 63,     respawn: 3600, name: "DZ Chest: Library",            label: "Middle of area against building"},
                            { id: 109,  lat: -69.2,   long: -10.8,  respawn: 3600, name: "DZ Chest: South Subway (1)",   label: "Against Wall in Subway"},
                            { id: 110,  lat: -63.1,   long: -6.7,   respawn: 3600, name: "DZ Chest: South Subway (2)",   label: "Back of Subway"},
                            { id: 111,  lat: -46.6,   long: -29.5,  respawn: 3600, name: "DZ Chest: South Cleaners",     label: "End of Road"},
                            { id: 112,  lat: 18.9,    long: 18,     respawn: 3600, name: "DZ Chest: Sniper Poach",       label: "Back of truck"},
                            { id: 113,  lat: -12.8,   long: -1.8,   respawn: 3600, name: "DZ Chest: Bryant Park",        label: "Middle of extraction near the helipad"},
                            { id: 114,  lat: 27.9,    long: 68.6,   respawn: 3600, name: "DZ Chest: East Cleaners",      label: "End of Road"},
                            { id: 115,  lat: -6,      long: 12.5,   respawn: 3600, name: "DZ Chest: East Park Subway",   label: "In Subway"},
                            { id: 116,  lat: -13.25,  long: -22.4,  respawn: 3600, name: "DZ Chest: West Park Subway",   label: "In Subway"},
                            { id: 117,  lat: 58.95,   long: 13.2,   respawn: 3600, name: "DZ Chest: The Pit",            label: "Middle of the pit against the west wall"},
                            { id: 118,  lat: 68.5,    long: 2.5,    respawn: 3600, name: "DZ Chest: Q Building",         label: "Second floor just south of escalator"},
                            { id: 119,  lat: 59,      long: -70,    respawn: 3600, name: "DZ Chest: North Cleaners",     label: "In a tent, back of truck"},
                            { id: 120,  lat: 64,      long: -20.3,  respawn: 3600, name: "DZ Chest: Mid Town Music",     label: "On west sidewalk near the wall of Mid Town Music"},
                            { id: 121,  lat: 72.4,    long: -49.6,  respawn: 3600, name: "DZ Chest: DZ06 Subway (1)",    label: "Subway behind stairs"},
                            { id: 122,  lat: 33.6,    long: -52.0,  respawn: 3600, name: "DZ Chest: North Construction", label: "Rooftop"},
                            { id: 171,  lat: -9.2,    long: -2.0,   respawn: 3600, name: "DZ Chest: Mid Park Subway",    label: "Small Room in Subway"},
                            { id: 172,  lat: 49.6,    long: -28,    respawn: 3600, name: "DZ Chest: DZ05 Subway",        label: "Back of Subway"},
                            { id: 173,  lat: 72.7,    long: -44.4,  respawn: 3600, name: "DZ Chest: DZ06 Subway (2)",    label: "Back of Subway"},
                            { id: 174,  lat: 73.6,    long: -55.2,  respawn: 3600, name: "DZ Chest: DZ06 Subway (3)",    label: "Machine Room in Subway"},
                        ]},
                        { type: "SubwayEntrances", typeFriendly: "Subway", locations: [
                            { id: 123,  lat: 68.5,    long: -68.5,  label: "<b>7th Ave station</b>"},
                            { id: 124,  lat: 72.6,    long: -65,    label: "<b>7th Ave station</b>"},
                            { id: 125,  lat: 71.7,    long: -65.8,  label: "<b>7th Ave station</b>"},
                            { id: 126,  lat: 71.66,   long: -42.5,  label: "<b>7th Ave station</b>"},
                            { id: 127,  lat: 61,      long: -26,    label: "<b>Concourse West entrance</b><br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 128,  lat: 56.5,    long: -27,    label: "<b>Concourse West entrance</b><br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 129,  lat: 55.2,    long:-17.1,   label: "<b>Concourse South entrance</b><br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 130,  lat: 60,      long: 8.8,    label: "<b>Concourse East entrance</b><br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 131,  lat: 58,      long: 8.8,    label: "<b>Concourse East entrance</b><br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 132,  lat: 52,      long: 8.8,    label: "<b>Concourse East entrance</b><br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 133,  lat: 60,      long: 12.5,   label: "<b>Concourse East entrance</b><br/>In the Pit<br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 134,  lat: 58,      long: 12.5,   label: "<b>Concourse East entrance</b><br/>In the Pit<br/>Access to 47-50th St Rockefeller Center station"},
                            { id: 135,  lat: 54.25,   long: -26.7,  label: "<b>47-50th St Rockefeller Center station</b><br/>Access to Concourse"},
                            { id: 136,  lat: 47,      long: -28.2,  label: "<b>47-50th St Rockefeller Center station</b><br/>Access to Concourse"},
                            { id: 137,  lat: 45,      long: -21.2,  label: "<b>47-50th St Rockefeller Center station</b><br/>Access to Concourse"},
                            { id: 138,  lat: -2.5,    long: 23,     label: "<b>Public Library station</b><br/>Access to Bryant Park station"},
                            { id: 139,  lat: -1.8,    long: -1.8,   label: "<b>Public Library station</b><br/>Access to Bryant Park station"},
                            { id: 140,  lat: -1.8,    long: -17.5,  label: "<b>Bryant Park station</b><br/>Access to Public Library station"},
                            { id: 141,  lat: -1.8,    long: -32.5,  label: "<b>Bryant Park station</b><br/>Access to Public Library station"},
                            { id: 142,  lat: -11.5,   long: -38.5,  label: "<b>Bryant Park station</b><br/>Access to Public Library station"},
                            { id: 143,  lat: -23.6,   long: -28.2,  label: "<b>Bryant Park station</b><br/>Access to Public Library station"},
                            { id: 144,  lat: -23.6,   long: -17.2,  label: "<b>Bryant Park station</b><br/>Access to Public Library station"},
                            { id: 145,  lat: -60.9,   long: 3.3,    label: "<b>33rd St station"},
                            { id: 146,  lat: -63.0,   long: 2.1,    label: "<b>33rd St station"},
                            { id: 147,  lat: -71.5,   long: -20.2,  label: "<b>33rd St station"},
                            { id: 148,  lat: -71.8,   long: -14.9,  label: "<b>33rd St station"},
                            { id: 149,  lat: -75.0,   long: -6.6,   label: "<b>33rd St station"},
                        ]},
                        { type: "NamedBosses", typeFriendly: "Boss", locations: [
/* CONFIRMED */             { id: 150,  lat: 17.5,    long: 19,     respawn: 600, subway: false, name: "Sniper Poach",                     bosses: ["Boomerang", "Hawkeye"] },                     // W 43rd St parking
/* CONFIRMED */             { id: 151,  lat: -11.5,   long: 30.5,   respawn: 300, subway: false, name: "Refueling Station",                bosses: ["Animal", "Short Fuse"] },                     // Refueling Station
/* CONFIRMED */             { id: 152,  lat: -12.8,   long: -4,     respawn: 600, subway: false, name: "Bryant Park",                      bosses: ["Animal", "Torch"] },                          // Bryant Park
/* CONFIRMED */             { id: 153,  lat: -6,      long: 11,     respawn: 600, subway: true,  name: "Bryant Park Subway (East)",        bosses: ["Hundley", "McGrady", "O'Rourke"] },           // Public Library Station (Subway)
/* CONFIRMED */             { id: 154,  lat: 62.3,    long: -70.3,  respawn: 600, subway: false, name: "Northwest Cleaner Boss",           bosses: ["Barkley", "Claxton", "Draxler", "Hardaway", "Hundley", "McGrady", "O'Rourke"] }, // Containment zone next to DZ06 West Entrance
/* CONFIRMED */             { id: 155,  lat: 27.3,    long: 62,     respawn: 600, subway: false, name: "East Cleaner Boss",                bosses: ["Barkley", "Claxton", "Coveleski", "Draxler", "Greenberg", "Hardaway", "McGrady"] }, // Containment zone East 45th St
/* CONFIRMED */             { id: 156,  lat: -77,     long: 52.7,   respawn: 600, subway: false, name: "South Spawn",                      bosses: ["Bonnie", "Cowboy", "Dropkick"] },             // South Spawn (no landmark)
/* CONFIRMED */             { id: 157,  lat: -66.9,   long: -6.7,   respawn: 600, subway: true,  name: "Greeley Sq. Subway (DZ01)",        bosses: ["Claxton", "Hardaway"] },                      // 33rd St station
/* CONFIRMED */             { id: 158,  lat: -66.9,   long: 31.8,   respawn: 600, subway: false, name: "Blockade",                         bosses: ["Buckshot", "Dropkick", "Scrapper"] },         // Blockade
/* CONFIRMED */             { id: 159,  lat: -57.2,   long: 46.5,   respawn: 600, subway: false, name: "South Construction Site",          bosses: ["Animal", "Baz", "Hot Rod"] },                 // 34th St Construction Site
/* CONFIRMED */             { id: 160,  lat: -46.86,  long: -23,    respawn: 900, subway: false, name: "South Cleaner Boss",               bosses: ["Claxton", "Coveleski", "Greenberg", "Hundley", "Mazeroski", "O'Rourke"] },
/* CONFIRMED */             { id: 161,  lat: -41.7,   long: 27.9,   respawn: 600, subway: false, name: "Kalkesse Sporting Store",          bosses: ["Animal", "Zeke"] },                           // Kalkesse Sporting Store
/* CONFIRMED */             { id: 162,  lat: -42,     long: 60.8,   respawn: 600, subway: false, name: "The Library",                      bosses: ["Animal", "Boomerang", "Cannibal"] },          // The Library
/* CONFIRMED */             { id: 163,  lat: -13,     long: -25.3,  respawn: 600, subway: true,  name: "Bryant Park Subway (West)",        bosses: ["Draxler", "Mazeroski", "O'Rourke"] },         // Bryant Park Station (Subway) W
/*  */                      { id: 164,  lat: 30,      long: -50,    respawn: 600, subway: false, name: "West Construction Site",           bosses: ["Animal", "Greyhound", "Hot Rod"] },           // West 54th (West Construction Site)
/* CONFIRMED */             { id: 166,  lat: 59,      long: 17.5,   respawn: 600, subway: false, name: "The Pit",                          bosses: ["Cpl. Newhouser", "Cpt. Carter", "Cpt. Wilson", "Gambit", "Sgt. Morgan", "Sgt. Thompson"] }, // The Pit
/*  */                      { id: 167,  lat: 62.3,    long: -23,    respawn: 600, subway: false, name: "Mid Town Music",                   bosses: ["Cpt. Bryant", "Cpt. Rollins", "Gambit", "Shadow"] }, // Mid Town Music
/* CONFIRMED */             { id: 168,  lat: 72.15,   long: -59.3,  respawn: 600, subway: true,  name: "North Subway (DZ06)",              bosses: ["Coveleski", "Greenberg", "O'Rourke"] },       // 7th Ave Station (Subway)
/*  */                      { id: 169,  lat: 70.0,    long: 0,      respawn: 600, subway: false, name: "Q Building",                       bosses: ["Coveleski", "Mazeroski"] },                   // Q Building
/* CONFIRMED */             { id: 170,  lat: 45,      long: -28.2,  respawn: 600, subway: true,  name: "Rockefeller Subway (DZ05)",        bosses: ["Barkley", "O'Rourke"] },                      // 47-50th St Rockefeller Center station (Subway)
                        ]},
                        { type: "DZRank30Chests", locations: [
                            // { id: 175,  lat: 62.7,    long: -76.6,  label: "Behind the tent"},
                            // { id: 176,  lat: -74.4,   long: 20.7,   label: "Against left wall at end of contaminated zone"},
                            // { id: 177,  lat: -70.1,   long: 39.3,   label: "Against wall near truck"},
                            // { id: 178,  lat: -70,     long: 20.4,   label: "End of contaminated zone"},
                            // { id: 179,  lat: 34.5,    long: 59.5,   label: "End of the street in the tent"},
                            // { id: 180,  lat: 50.4,    long: -63.4,  label: "End of the street in the tent"},
                            // { id: 181,  lat: -59.1,   long: 72.4,   label: "Downstairs right side"},
                            // { id: 182,  lat: -65.2,   long: 43.4,   label: "Near ambulance"},
                            // { id: 183,  lat: -52.3,   long: -23,    label: "In tent"},
                            // { id: 184,  lat: -42.5,   long: 0.7,    label: "Against wall"},
                            // { id: 185,  lat: -31.4,   long: -14.4,  label: "End of alley"},
                            // { id: 186,  lat: -33,     long: 42.9,   label: "Against wall"},
                            // { id: 187,  lat: -27.1,   long: 48.6,   label: "Near forklift"},
                            // { id: 188,  lat: 26.6,    long: 69,     label: "End of Road"},
                            // { id: 189,  lat: 34.3,    long: 13.9,   label: "Against wall"},
                            // { id: 190,  lat: 20.9,    long: 3.9,    label: "Behind big forklift"},
                            // { id: 191,  lat: 44.5,    long: 9.9,    label: "Against wall"},
                            // { id: 192,  lat: 55.4,    long: 27.2,   label: "Right corner behind truck"},
                            // { id: 193,  lat: 62.5,    long: 25.5,   label: "Against tent"},
                            // { id: 194,  lat: 69.5,    long: 13,     label: "First Floor: Southeast corner room"},
                            // { id: 195,  lat: 72.2,    long: 26.2,   label: "On left truck"},
                            // { id: 196,  lat: 74.9,    long: 10.5,   label: "Left corner in shop"},
                            // { id: 197,  lat: 75,      long: -51.8,  label: "End of Alley"},
                            // { id: 198,  lat: 72.2,    long: -84.6,  label: "On truck"},
                            // { id: 199,  lat: 65.6,    long: -51.4,  label: "Against wall"},
                            // { id: 200,  lat: 59.4,    long: -52.8,  label: "Corner near WarrenGate building"},
                            // { id: 201,  lat: -64.5,   long: -2.8,   label: "On Rooftop"},
                            // { id: 202,  lat: -57.5,   long: -1.4,   label: "Against wall"},
                            // { id: 203,  lat: -50.2,   long: 21.6,   label: "Against wall"},
                        ]},
                        { type: "ContaminatedZone", locations: [
                            { id: 204,  lat: -74.7,   long: 21.45,  label: "Contamination level: 2"},
                            { id: 205,  lat: -70.9,   long: 20.5,   label: "Contamination level: 2"},
                            { id: 206,  lat: -70.3,   long: 40.7,   label: "Contamination level: 2"},
                            { id: 207,  lat: -66.9,   long: -5,     label: "<b>Subway:</b><br/>Contamination level: 4"},
                            { id: 208,  lat: -64.15,  long: -4.7,   label: "Contamination level: 3"},
                            { id: 209,  lat: -65.4,   long: 43.7,   label: "Contamination level: 2"},
                            { id: 210,  lat: -58.2,   long: -1.5,   label: "Contamination level: 2"},
                            { id: 211,  lat: -58.75,  long: 71.3,   label: "Contamination level: 2"},
                            { id: 212,  lat: -47.1,   long: -17.7,  label: "Contamination level: 3"},
                            { id: 213,  lat: -50.55,  long: 24.4,   label: "Contamination level: 2"},
                            { id: 214,  lat: -41.9,   long: 3.7,    label: "Contamination level: 2"},
                            { id: 215,  lat: -34,     long: 42.3,   label: "Contamination level: 3"},
                            { id: 216,  lat: -31.5,   long: -12.6,  label: "Contamination level: 3"},
                            { id: 217,  lat: -25.2,   long: 46.8,   label: "Contamination level: 3"},
                            { id: 218,  lat: -9.4,    long: -14,    label: "<b>Subway:</b><br/>Contamination level: 4"},
                            { id: 219,  lat: 19.5,    long: 4,      label: "Contamination level: 3"},
                            { id: 220,  lat: 27.3,    long: 59.5,   label: "Contamination level: 4"},
                            { id: 221,  lat: 33,      long: 13.45,  label: "Contamination level: 3"},
                            { id: 222,  lat: 43.2,    long: 13,     label: "Contamination level: 4"},
                            { id: 223,  lat: 43.2,    long: -28.2,  label: "<b>Subway:</b><br/>Contamination level: 4"},
                            { id: 224,  lat: 52.2,    long: -61.2,  label: "Contamination level: 4"},
                            { id: 225,  lat: 60.6,    long: -69.8,  label: "Contamination level: 4"},
                            { id: 226,  lat: 59.2,    long: -53.7,  label: "Contamination level: 4"},
                            { id: 227,  lat: 59,      long: -8,     label: "<b>Subway:</b><br/>Contamination level: 4"},
                            { id: 228,  lat: 55.8,    long: 23.7,   label: "Contamination level: 4"},
                            { id: 229,  lat: 62.15,   long: 23.7,   label: "Contamination level: 4"},
                            { id: 230,  lat: 65.2,    long: -50.9,  label: "Contamination level: 4"},
                            { id: 231,  lat: 72.3,    long: -79.7,  label: "Contamination level: 4"},
                            { id: 232,  lat: 72.5,    long: -54.6,  label: "<b>Subway:</b><br/>Contamination level: 4"},
                            { id: 233,  lat: 74.2,    long: -51.65, label: "Contamination level: 4"},
                            { id: 234,  lat: 70.5,    long: 11,     label: "Contamination level: 4"},
                        ]},
                        { type: "SupplyDrops", typeFriendly: "Supply Drop", locations: [
                            // { id: 235, lat: 0, long: 0, label: ""},
                        ]}
                    ];
                }
            }
        };
    }
}());


// ||===========================================================================||
// ||  [Boss Name]    || [Archtype]      || [Faction]  || [Confirmed HE Drops]  ||
// ||===========================================================================||
// ||  Animal         ||  Tank           ||  Riker     || Midas/ Gloves/ Strike pack/ Advanced Stamina Mod
// ||  Barkley        ||  Controller     ||  Cleaner   || Tactical pack
// ||  Baz            ||  Leader         ||  Riker     || Socom M1A
// ||  Bonnie         ||  Special        ||  Rioter    ||
// ||  Boomerang      ||  Sniper         ||  Riker     || Angled Grip
// ||  Buckshot       ||  Sniper         ||  Rioter    || Magazine
// ||  Cannibal       ||  Tank           ||  Riker     ||
// ||  Claxton        ||  Controller     ||  Cleaner   ||
// ||  Coveleski      ||  Sniper         ||  Cleaner   ||
// ||  Cowboy         ||                 ||  Rioter    ||
// ||  Cpl. Newhouser ||  Controller     ||  LMB       ||
// ||  Cpt. Bryant    ||  Tank           ||  LMB       ||
// ||  Cpt. Carter    ||  Leader         ||  LMB       ||
// ||  Cpt. Morgan    ||                 ||  LMB       ||
// ||  Cpt. Rollins   ||                 ||  LMB       ||
// ||  Cpt. Wilson    ||  Sniper         ||  LMB       ||
// ||  Draxler        ||  Controller     ||  Cleaner   ||
// ||  Dropkick       ||  Heavy Weapons  ||  Rioter    ||
// ||  Gambit         ||  Specialist     ||  LMB       || Spec-ops pads
// ||  Greenberg      ||  Thrower        ||  Cleaner   || Holster
// ||  Greyhound      ||                 ||  Riker     ||
// ||  Hardaway       ||  Tank           ||  Cleaner   ||
// ||  Hawkeye        ||  Sniper         ||  Riker     || Midas
// ||  Hot Rod        ||  Thrower        ||  Riker     || Magazine
// ||  Hundley        ||  Sniper         ||  Cleaner   || M1911/ Spec-ops pads/ Operator pads/ Prototype Performance Mod
// ||  Mazeroski      ||  Tank           ||  Cleaner   ||
// ||  McGrady        ||  Thrower        ||  Cleaner   ||
// ||  O'Rourke       ||  Tank           ||  Cleaner   ||
// ||  Scrapper       ||  Heavy Weapons  ||  Rioter    ||
// ||  Sgt. Thompson  ||  Heavy Weapons  ||  LMB       ||
// ||  Sgt. Morgan    ||                 ||  LMB       ||
// ||  Shadow         ||  Special        ||  LMB       ||
// ||  Short Fuse     ||  Leader         ||  Riker     || Prototype Performance Mod
// ||  Stojacovich    ||                 ||            ||
// ||  Torch          ||  Thrower        ||  Riker     || Spec-ops gloves/ Prototype Performance Mod
// ||  Zeke           ||  Tank           ||  Riker     ||
// ||===========================================================================||
