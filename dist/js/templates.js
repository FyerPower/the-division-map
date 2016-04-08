angular.module("theDivisionAgent").run(["$templateCache", function($templateCache) {$templateCache.put("directives/footer/footer.html","<div id=\"footer\">\n    <p>Created By Michael Lynch (<a href=\"http://www.reddit.com/u/gamegenius86\" target=\"_blank\">/u/gamegenius86</a>)</p>\n    <p><a href=\"https://www.paypal.me/yourfriend\" target=\"\">Buy me a beer!</a></p>\n</div>\n");
$templateCache.put("directives/header/header.html","<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" rel=\"home\" ui-sref=\"home\" title=\"The Division Agent\">\n            <img src=\"/img/the-division-agent-logo.png\"/>\n        </a>\n    </div>\n    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n        <ul class=\"nav navbar-nav navbar-right\">\n            <li><a class=\"block-link\" ui-sref-active=\"active\" tda-close-menu ui-sref=\"home\">Home</a></li>\n            <li><a class=\"block-link\" ui-sref-active=\"active\" tda-close-menu ui-sref=\"map\">Map</a></li>\n            <li><a class=\"block-link\" ui-sref-active=\"active\" tda-close-menu ui-sref=\"news({slug: \'special-report-3-31-16\'})\">News</a></li>\n            <li><a class=\"block-link\" ui-sref-active=\"active\" tda-close-menu ui-sref=\"equipment\">Equipment</a></li>\n        </ul>\n    </div>\n</nav>\n");
$templateCache.put("components/home/home.html","<div id=\"page-home\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div class=\"divided-header\">\n                    <h2>Introduction</h2>\n                </div>\n                <!-- <h4>Welcome! This site was created for the sole purpose of providing the easiest to use tools for the game!</h4> -->\n                <p>Welcome to The Division Agent! I\'ve created this site for the sole purpose of providing the easiest to use tools for the game! New and exciting features are continuously added in order to stay ahead. I\'d love to know what you think, so if there\'s something you\'d like to see implemented on the site be sure to contact me!</p>\n\n                <div class=\"divided-header\">\n                    <h2>News & Information</h2>\n                </div>\n\n                <div class=\"media\">\n                    <div class=\"media-left\">\n                        <a ui-sref=\"news({slug: \'special-report-3-31-16\'})\"><img class=\"img-thumbnail media-object\" src=\"/img/BlogIcons-SpecialReport.jpg\" /></a>\n                    </div>\n                    <div class=\"media-body\">\n                        <div class=\"media-heading\">\n                            <a ui-sref=\"news({slug: \'special-report-3-31-16\'})\">The Division - Special Report - Incursions Update</a>\n                        </div>\n                        <div class=\"media-meta\">Posted: March 31st, 2016</div>\n                        <p>NEW FEATURES</p>\n                        <ul>\n                            <li>Gear Sets</li>\n                            <li>Trading</li>\n                            <li>Assignments</li>\n                            <li>Supply Drops added to darkzone (new mechanic)</li>\n                            <li>Spectator Camera</li>\n                            <li>Incursion</li>\n                        </ul>\n                    </div>\n                </div>\n\n                <div class=\"media\">\n                    <div class=\"media-left\">\n                        <a ui-sref=\"home\"><img class=\"img-thumbnail media-object\" src=\"/img/BlogIcons-Maintenance.jpg\" /></a>\n                    </div>\n                    <div class=\"media-body\">\n                        <div class=\"media-heading\">\n                            <a ui-sref=\"home\">The Division - April 1, 2016 Maintenance</a>\n                        </div>\n                        <div class=\"media-meta\">Posted: March 31st, 2016</div>\n                        <p>GAMEPLAY</p>\n                        <ul>\n                            <li>Madison Field Hospital: The Elite NPC that spawns when Hutch is killed before jumping down from the roof will no longer drop additional loot when killed repeatedly</li>\n                            <li>Missions: Named NPCs killed from outside the mission area will no longer drop additional loot when killed repeatedly</li>\n                            <li>Fixed issues which could allow groups to bypass the limit of four members</li>\n                        </ul>\n                    </div>\n                </div>\n\n                <div class=\"media\">\n                    <div class=\"media-left\">\n                        <a ui-sref=\"news({slug: \'patch-notes-1-0-2\'})\"><img class=\"img-thumbnail media-object\" src=\"/img/BlogIcons-PatchNotes.jpg\" /></a>\n                    </div>\n                    <div class=\"media-body\">\n                        <div class=\"media-heading\">\n                            <a ui-sref=\"news({slug: \'patch-notes-1-0-2\'})\">The Division - Patch Notes 1.0.2</a>\n                        </div>\n                        <div class=\"media-meta\">Posted: March 22nd, 2016</div>\n                        <p>GAMEPLAY</p>\n                        <ul>\n                            <li>Named enemies will now drop better loot in Challenge mode than in Hard mode.</li>\n                            <li>Added a cooldown period for the Static Turret stun attack in order to avoid a stunlock in PvP and PvE game modes.</li>\n                            <li>Named NPCs will no longer respawn after being killed in the Open World. This will prevent situations where players were able to kill a same named NPC over and over again.</li>\n                        </ul>\n                        <p>Lots More...</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"divided-header\">\n                    <h2>Popular Routes</h2>\n                </div>\n                <ul class=\"list-group\">\n                    <li class=\"list-group-item\" ng-repeat=\"route in vm.routes\">\n                        <div><a ui-sref=\"map({path: route.path, center: route.center, zoom: route.zoom})\">{{route.name}}</a></div>\n                        <span><i class=\"tda-icon tda-fire\"></i> {{route.popularity | number}}</span>\n                        <span class=\"label label-division\" ng-repeat=\"type in route.types\">{{type}}</span>\n                    </li>\n                </ul>\n                <p class=\"text-center text-footnote\">User created routes and voting will be coming soon</p>\n\n                <div class=\"divided-header\">\n                    <h2>Recent Updates</h2>\n                </div>\n                <div id=\"recent-changes\">\n                    <h5>April 8, 2016</h5>\n                    <ul>\n                        <li>Site Redesign</li>\n                        <li>Add more boss names to locations</li>\n                    </ul>\n                    <h5>March 31, 2016</h5>\n                    <ul>\n                        <li>Added hover tooltips to all division tech and darkzone chests</li>\n                    </ul>\n                    <h5>March 29, 2016</h5>\n                    <ul>\n                        <li>Map markers are now scalable</li>\n                        <li>Added instructions to path making</li>\n                        <li>Added undo functionality to path making</li>\n                        <li>Map location, zoom, marker filters, and marker scale are now remembered between sessions.</li>\n                    </ul>\n                    <h5>March 26, 2016</h5>\n                    <ul>\n                        <li>Added News & Information</li>\n                        <li>Added more enemies and lootables to the map</li>\n                        <li>Added new page to display available attributes for each gear slot</li>\n                    </ul>\n                    <h5>March 24, 2016</h5>\n                    <ul>\n                        <li>Performance optimizations</li>\n                        <li>Faster load times</li>\n                        <li>Map now has full screen button</li>\n                        <li>Update default color for pathing</li>\n                        <li>Added more enemies and lootables</li>\n                    </ul>\n                    <!-- <h5>March 23, 2016</h5>\n                    <ul>\n                        <li>Mobile Friendly Version</li>\n                        <li>Added more enemies, lootables, and subways</li>\n                    </ul> -->\n                    <!-- <h5>March 22, 2016</h5>\n                    <ul>\n                        <li>Initial Release</li>\n                        <li>Interactive Map w/ custom markers</li>\n                        <li>Ability to create and share custom paths</li>\n                    </ul> -->\n                </div>\n            </div>\n        </div>\n        <footer></footer>\n    </div>\n</div>\n");
$templateCache.put("components/map/map.html","<div id=\"map-container\" ng-class=\"{\'map-pathing\':vm.pathing}\" ng-cloak>\n    <div id=\"map-sidebar\" ng-class=\"{collapsed: vm.menuCollapsed}\">\n        <div id=\"map-sidebar-content\" ng-show=\"!vm.menuCollapsed || vm.initialized\">\n            <div class=\"sidebar-component\" ng-show=\"vm.tab == \'filters\'\">\n                <h4>Map Filters</h4>\n                <div class=\"filter-item\" ng-repeat=\"filter in vm.filters\" ng-click=\"vm.toggleFilter(filter)\" ng-class=\"{\'disabled\': !filter.enabled}\">\n                    <img ng-src=\"{{filter.icon}}\"/>\n                    <span ng-bind=\"filter.name\"></span>\n                </div>\n                <br><a class=\"block-link\" style=\"display:block;\" ng-click=\"vm.toggleAllFilters()\">Hide / Show All Filters</a>\n            </div>\n            <div class=\"sidebar-component\" ng-show=\"vm.tab == \'filters\'\">\n                <h4>Marker Size</h4>\n                <rzslider rz-slider-model=\"slider.value\" rz-slider-options=\"slider.options\"></rzslider>\n            </div>\n\n            <div class=\"sidebar-component\" ng-show=\"vm.tab == \'paths\'\">\n                <h4>Custom Map Paths</h4>\n                <div class=\"text-center\" ng-show=\"!vm.pathing && !vm.shareableUrl\">\n                    <p>Create the custom routes / paths that you like taking and share them with your friends and the community.</p>\n                    <p>Click the Start button below to begin making your own personal route now!</p>\n                </div>\n                <div class=\"text-center\" ng-show=\"vm.pathing\">\n                    <p>You can now start clicking anywhere on the map to make paths.  If you mess up and want to undo, simply click the undo button below.</p>\n                    <a class=\"block-link\" ng-click=\"vm.undoLastPath()\"><i class=\"fa fa-undo\"></i> Undo</a><br/><br/>\n                </div>\n                <div ng-show=\"!vm.pathing && vm.shareableUrl\">\n                    <p>You\'ve successfully created a custom path! Copy and share the link below.</p>\n                    <div class=\"input-group\">\n                        <input class=\"form-control\" type=\"text\" name=\"sharableUrl\" ng-model=\"vm.shareableUrl\">\n                        <span class=\"input-group-btn\">\n                            <button clipboard text=\"vm.shareableUrl\" class=\"btn btn-secondary\" type=\"button\">Copy</button>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"clearfix\">\n                    <a class=\"block-link\" style=\"display:block;\" ng-click=\"vm.endPathing()\" ng-show=\"vm.pathing\">Finish Making Path</a>\n                    <a class=\"block-link\" style=\"display:block;\" ng-click=\"vm.beginPathing()\" ng-show=\"!vm.pathing && !vm.shareableUrl\">Create & Share Path</a>\n                    <a class=\"block-link\" style=\"display:block;\" ng-click=\"vm.beginPathing()\" ng-show=\"!vm.pathing && vm.shareableUrl\">Create Another Path</a>\n                </div>\n            </div>\n\n            <div class=\"sidebar-component\">\n                <div id=\"map-sidebar-footer\">\n                    <div>\n                        Created By Michael Lynch (<a href=\"http://www.reddit.com/u/gamegenius86\" target=\"_blank\">/u/gamegenius86</a>)\n                        <br/><a href=\"https://www.paypal.me/yourfriend\" target=\"\">Buy me a beer!</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"map-sidebar-buttons\" ng-class=\"{\'map-sidebar-force-right\': (vm.menuCollapsed && !vm.initialized)}\">\n            <div class=\"btn-group-vertical\">\n                <a class=\"btn btn-default\" tda-popover=\"Collapse / Expand Menu\" popover-position=\"left\" ng-click=\"vm.toggleMenu();\"><i class=\"fa fa-bars\"></i></a>\n                <a class=\"btn\" ng-class=\"{\'btn-primary\': vm.tab == \'filters\', \'btn-default\': vm.tab != \'filters\'}\" tda-popover=\"Manage Map Markers\" popover-position=\"left\" ng-click=\"vm.showTab(\'filters\');\"><i class=\"fa fa-map\"></i></a>\n                <a class=\"btn\" ng-class=\"{\'btn-primary\': vm.tab == \'paths\', \'btn-default\': vm.tab != \'paths\'}\" tda-popover=\"Create & Share Custom Paths\" popover-position=\"left\" ng-click=\"vm.showTab(\'paths\');\"><i class=\"tda-icon tda-path\"></i></a>\n            </div>\n            <div class=\"btn-group-vertical\" ng-show=\"vm.fullscreenEnabled\">\n                <a class=\"btn btn-default\" tda-popover=\"Toggle Fullscreen\" popover-position=\"left\" ng-click=\"vm.toggleFullscreen();\">\n                    <i class=\"fa\" ng-class=\"{\'fa-arrows-alt\': !vm.fullscreenActive, \'fa-compress\': vm.fullscreenActive}\"></i>\n                </a>\n            </div>\n            <div class=\"btn-group-vertical\">\n                <a class=\"btn btn-default\" tda-popover=\"Zoom In\" popover-position=\"left\" ng-click=\"vm.zoomIncrease();\" ng-disabled=\"vm.zoomAtMax\"><i class=\"fa fa-plus\"></i></a>\n                <a class=\"btn btn-default\" tda-popover=\"Zoom Out\" popover-position=\"left\" ng-click=\"vm.zoomDecrease();\" ng-disabled=\"vm.zoomAtMin\"><i class=\"fa fa-minus\"></i></a>\n            </div>\n        </div>\n    </div>\n\n    <leaflet id=\"map-content\"></leaflet>\n</div>\n");
$templateCache.put("components/news/news-patch-notes-1-0-2.html","<div>\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n            <h1>The Division - Patch Notes 1.0.2</h1>\n            <div class=\"metatext\">Posted by Michael Lynch on March 22nd, 2016</div>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"divided-header\">\n                    <h2>GAMEPLAY</h2>\n                </div>\n                <ul>\n                    <li>Named enemies will now drop better loot in Challenge mode than in Hard mode.</li>\n                    <li>Added a cooldown period for the Static Turret stun attack in order to avoid a stunlock in PvP and PvE game modes.</li>\n                    <li>Named NPCs will no longer respawn after being killed in the Open World. This will prevent situations where players were able to kill a same named NPC over and over again.</li>\n                    <li>Modifications to the weapon talent: Trained.\n                        <ul>\n                            <li>It can now only be rolled on Shotgun, Marksman rifles and Pistols</li>\n                            <li>Its bonus has been reduced from 1%-5% to a constant 0.1%</li>\n                            <li>For the Midas SMGs, Trained Talent has been replaced with Responsive Talent which increases damage when getting closer to the target. This applies to existing weapons as well as newly acquired ones</li>\n                            <li>For all SMGs, LMGs, and Assault Rifles, it will be replaced with another randomly picked weapon talent. This applies to existing weapons as well as newly acquired ones</li>\n                        </ul>\n                    </li>\n                    <li>Fixed a speed run exploit for the Rooftop Comm Relay mission</li>\n                    <li>Fixed an issue where weapons dealt no damage if the reload animation was interrupted by an agent’s skill</li>\n                    <li>Fixed an issue where players became stuck in an emote animation if activated via chat while auto running</li>\n                    <li>Fixed a bug where skill power would be increased permanently while using the Death by Proxy talent</li>\n                    <li>Fixed a bug where experience was not being awarded for completing all side-missions in the Midtown East safe house</li>\n                    <li>Fixed instances where the Seeker Mine with Airburst / Multi-mine mod would detonate too soon, miss targets or cause no damage</li>\n                    <li>Fixed a bug where grenades would sometimes not display the blast radius warning before detonating</li>\n                    <li>Fixed an issue where some NPCs in low cover would not react to being shot by the player</li>\n                    <li>Fixed issues where emotes would cause the player model to behave oddly (missing guns, player stuck in emote animation, etc)</li>\n                    <li>Fixed a bug where weapon mods and weapon skins would not show up on other players in the game world</li>\n                    <li>Fixed an issue where DPS would not be calculated properly when purchasing a new weapon mod</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>DARK ZONE</h2>\n                </div>\n                <ul>\n                    <li>Players can now heal other neutral players in the Dark zone, by using First Aid and Support Station skills</li>\n                    <li>Players are now able to fast travel to Dark Zone checkpoints, but only when coming from outside the Dark Zone</li>\n                    <li>The Dark Zone disconnect timer has been increased to 30 seconds, meaning players will remain in the game world longer when logging out while in the Dark Zone (this applies while not in combat)</li>\n                    <li>Items extracted from the Dark Zone are now properly marked as \"new\" items when moved to the players inventory</li>\n                    <li>Players killed in the Dark Zone now drop ammo, medkits and grenades. This loot is generated and not taken from the dying players’ inventory</li>\n                    <li>Players killed in the Dark Zone will lose less Dark Zone Funds and Experience (Rogue and non-Rogue)</li>\n                    <li>Dark Zone Funds and Experience rewards for surviving Rogue status have been improved</li>\n                    <li>Dark Zone Funds and Experience rewards for killing Rogue agents have been improved</li>\n                    <li>Increased drop rate of High-End items from lvl 31 and 32 named NPCs in the Dark Zone.</li>\n                    <li>Increased drop rate of High-End Division Tech Material from lvl 32 named NPCs in the Dark Zone.</li>\n                    <li>Improved Dark Zone Chests items quality:</li>\n                    <li>Rank 30 chests will now drop Superior (Purple) items instead of Specialized (Blue)</li>\n                    <li>Keys chests now have a chance to drop High-End (Gold) items</li>\n                    <li>Dark Zone Funds drop rates and quantity on NPCs has been reduced.</li>\n                    <li>Fixed a bug where the Wildfire and Fear Tactics talents were affecting neutral players in the Dark Zone.</li>\n                    <li>Fixed instances where players would receive a DELTA error message when entering the Dark Zone</li>\n                    <li>Fixed a bug where sometimes players could not loot anything after returning to the game following a network disconnection</li>\n                    <li>Fixed Stage 1 Rogue timers not displaying correctly when Rogue players receive damage from another player</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>GRAPHICS</h2>\n                </div>\n                <ul>\n                    <li>Fixed a few lights that did not cast global illumination</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>UI</h2>\n                </div>\n                <ul>\n                    <li>Added more information for Daily missions on the Map</li>\n                    <li>Tutorials have received some UI polish</li>\n                    <li>The Matchmaking menu now displays the mission difficulty rating more prominently</li>\n                    <li>The mini-map mission tracker has been optimized to be less confusing to players</li>\n                    <li>Fixed a bug where some of the attributes for high-end equipment were cut-off in the recalibration menu</li>\n                    <li>Fixed a bug where the Matchmaking menu for a mission would not display correctly or kept disappearing</li>\n                    <li>Fixed missing item icons in the Reward Claim Vendor\'s inventory</li>\n                    <li>Fixed incorrect side-missions being displayed in the Map legend</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>AUDIO</h2>\n                </div>\n                <ul>\n                    <li>Fixed a bug where the helicopter crash SFX would be missing from the Brooklyn end cinematic</li>\n                    <li>Fixed a bug where the Zapper Turret mod had no sound</li>\n                    <li>Fixed a bug where the audio for entering a contaminated area would be cut-off</li>\n                    <li>Fixed a bug where audio would not play when scrolling through vanity items</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>LOCALIZATION</h2>\n                </div>\n                <ul>\n                    <li>Fixed Ubisoft CLUB reward descriptions in Korean and Traditional Chinese</li>\n                    <li>In-game localization bug fixes</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>PC</h2>\n                </div>\n                <ul>\n                    <li>Tobii Eye Tracking bug fixes and improvements</li>\n                    <li>On launch, the PC client now monitors PC graphic settings and applies the best settings for the user’s configuration. This is unless the user has custom settings.</li>\n                    <li>Fixed an issue where the Map was sometimes difficult to navigate with a mouse</li>\n                    <li>Fixed issues with Hungarian, Korean, and Russian localizations</li>\n                    <li>Fixed an issue that prevented matchmaking while on the Map</li>\n                    <li>Removed the Store button from the Character Selection screen on PC versions of the game. Players can find the store page in the Ubisoft CLUB app directly</li>\n                    <li>Fixed increment number on Day 1 Patch Notes (was 1.1, now correctly states 1.01)</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>XBOX ONE</h2>\n                </div>\n                <ul>\n                    <li>Fixed a bug where players could not reconnect to the servers after suspending the game on Xbox One</li>\n                    <li>Fixed a bug on Xbox One where unblocking a player would not be reflected in-game until title reboot</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>PLAYSTATION 4</h2>\n                </div>\n                <ul>\n                    <li>Added an option to disable the PlayStation 4 controller speaker</li>\n                    <li>Improved textures and models streaming speed</li>\n                    <li>Fixed an issue where ISAC volume could get too loud when playing with headsets</li>\n                </ul>\n                <footer></footer>\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("components/news/news-special-report-3-31-16.html","<div>\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n            <h1>The Special Report - March 31st, 2016</h1>\n            <div class=\"metatext\">Posted by Michael Lynch on March 31st, 2016</div>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <p>Update 1.1 Incursions: Free Update ( April 12th, 2016 )</p>\n\n                <div class=\"divided-header\">\n                    <h2>GEAR SCORE</h2>\n                </div>\n                <ul>\n                    <li>ITEM LEVEL REMOVED</li>\n                    <li>You will start to see this number next to the player in group, as level is quite pointless.</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>GEAR SETS</h2>\n                </div>\n                <ul>\n                    <li>4 different gear sets ( 4 pieces each? )\n                        <ul>\n                            <li>Sentries Call ( Marksman Style ) - Promotes precision</li>\n                            <li>Strikers Battle Gear ( Combat Assault Style ) - ??</li>\n                            <li>Tacticians Authority ( Support Style ) - Support & Healing</li>\n                            <li>Path of Nomad ( Link to Darkzone )</li>\n                        </ul>\n                    </li>\n                    <li>Each item does not have a talent, you must collect multiple pieces to earn more powerful talents</li>\n                    <li>Like \"High End Plus\", slightly more powerful than high end</li>\n                    <li>quite rare (tough)</li>\n                    <li>Found via Incusions, Challenge Mode, Blueprints, & Darkzone</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>TRADING</h2>\n                </div>\n                <ul>\n                    <li>Only tradable to the group (and others nearby) for up to 2hrs after item first dropped</li>\n                    <li>In darkzone you must be in a safearea (\"gates\") to trade</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>ASSIGNMENTS</h2>\n                </div>\n                <ul>\n                    <li>Daily & Weekly</li>\n                    <li>Found in map (don\'t need to talk to npc to obtain)</li>\n                    <li>Rewards? PC, DivTech, other good stuff</li>\n                    <li>Built more as a Achieve this Goal (not do task)</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>SUPPLY DROPS</h2>\n                </div>\n                <ul>\n                    <li>A new mechanic being added to the darkzone</li>\n                    <li>A drop from the sky that happens roughly every hour that contains very good rewards</li>\n                    <li>Protected by \"tough\" enemies</li>\n                    <li>The first group to get there get the rewards (DONT NEED TO EXTRACT)</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>SPECTATOR CAMERA</h2>\n                </div>\n                <ul>\n                    <li>When you\'re dead, you can now spectate teammates.</li>\n                    <li>Stuck to player, but can freely move the camera around</li>\n                    <li>Switch between other players in group</li>\n                </ul>\n\n                <div class=\"divided-header\">\n                    <h2>INCURSION</h2>\n                </div>\n                <ul>\n                    <li>Harder than challenge mode - designed for the best of the best</li>\n                    <li>No Checkpoints, if you fails, you start over</li>\n                    <li>Group Coordination is important, you need good tactics, loadouts need to synergize each other</li>\n                    <li>Has TWO difficulties:\n                        <ul>\n                            <li>Hard Mode (Should have item level 31 before entering)</li>\n                            <li>Challenging (Should have new gear sets before trying) (Took ubisoft QC guys a couple of days to first beat it)</li>\n                        </ul>\n                    </li>\n                    <li>Even Better Rewards\n                        <ul>\n                            <li>Nice Weapon (New HE) & Gear Sets</li>\n                            <li>Better than you can find anywhere else in-game right now</li>\n                            <li>First time you complete it that week you get even better rewards</li>\n                        </ul>\n                    </li>\n                    <li>You can matchmake, however challenge mode has a gear score requirement</li>\n                    <li>First One: Falcon Lost (located south of Power Plant)\n                        <ul>\n                            <li>Underground inside of a Water Treatment Facility</li>\n                            <li>Col Bliss is dead, but Cpt Perez is trying to rally the LMB together.  Your job is to go in and stop him</li>\n                            <li>Destroy an APC (Vehicle) - You shoot it, you must destroy it by other means (multiple ways)</li>\n                            <li>There are flying drones</li>\n                        </ul>\n                    </li>\n                    <li>More Incursions to come (with even new mechanics, different factions)</li>\n                </ul>\n                <footer></footer>\n            </div>\n        </div>\n    </div>\n\n</div>\n");
$templateCache.put("components/talents/talents.html","<div id=\"page-talents\">\n    <div class=\"jumbotron header-cover\">\n        <div class=\"container\">\n            <h2><b>Equipment Attributes</b></h2>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xs-12 text-center\">\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Weapon\'),   \'btn-div-secondary\': (vm.slot == \'Weapon\')}\" ng-click=\"vm.selectSlot(\'Weapon\')\">\n                    <i class=\"gear-icon gear-icon-weapon\"></i>\n                </a>\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Chest\'),    \'btn-div-secondary\': (vm.slot == \'Chest\')}\" ng-click=\"vm.selectSlot(\'Chest\')\">\n                    <i class=\"gear-icon gear-icon-chest\"></i>\n                </a>\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Mask\'),     \'btn-div-secondary\': (vm.slot == \'Mask\')}\" ng-click=\"vm.selectSlot(\'Mask\')\">\n                    <i class=\"gear-icon gear-icon-mask\"></i>\n                </a>\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Kneepads\'), \'btn-div-secondary\': (vm.slot == \'Kneepads\')}\" ng-click=\"vm.selectSlot(\'Kneepads\')\">\n                    <i class=\"gear-icon gear-icon-kneepads\"></i>\n                </a>\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Backpack\'), \'btn-div-secondary\': (vm.slot == \'Backpack\')}\" ng-click=\"vm.selectSlot(\'Backpack\')\">\n                    <i class=\"gear-icon gear-icon-backpack\"></i>\n                </a>\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Gloves\'),   \'btn-div-secondary\': (vm.slot == \'Gloves\')}\" ng-click=\"vm.selectSlot(\'Gloves\')\">\n                    <i class=\"gear-icon gear-icon-gloves\"></i>\n                </a>\n                <a class=\"btn btn-gear-icon\" ng-class=\"{\'btn-div-primary\': (vm.slot != \'Holster\'),  \'btn-div-secondary\': (vm.slot == \'Holster\')}\" ng-click=\"vm.selectSlot(\'Holster\')\">\n                    <i class=\"gear-icon gear-icon-holster\"></i>\n                </a>\n            </div>\n        </div>\n        <br>\n        <div class=\"row menu-box-height\" ng-show=\"vm.slot && vm.slot == \'Weapon\'\">\n            <div class=\"text-center\"><h4>Available Talents</h4></div>\n            <div class=\"col-md-6\" ng-repeat=\"talent in vm.equipment.Weapon.Talents | orderBy:\'name\'\">\n                <div class=\"menu-box\">\n                    <div class=\"\">\n                        <span class=\"menu-box--type\"><b>Talent</b></span>\n                        <span><b>{{talent.name}}</b></span>\n                    </div>\n                    <div class=\"\">\n                        <span>{{talent.description}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row empty-message\" ng-hide=\"vm.slot\">\n            <div class=\"col-md-12\">\n                Select an Equipment Slot above\n            </div>\n        </div>\n        <div class=\"row\" ng-show=\"vm.slot && vm.slot != \'Weapon\'\">\n            <div class=\"col-md-6 col-md-push-6\">\n                <div class=\"text-center\"><h4>Available Stats</h4></div>\n                <div class=\"menu-box\">\n                    <div ng-show=\"vm.equipment[vm.slot].Primary.List\">\n                        <div><span><b>Primary Attributes</b></span> <span class=\"menu-box--sidenote\">(Limit: {{vm.equipment[vm.slot].Primary.Limit}})</span></div>\n                        <div class=\"menu-box--stat\" ng-repeat=\"stat in vm.equipment[vm.slot].Primary.List\">\n                            <span ng-show=\"stat.low\">+({{stat.low}}-{{stat.high}})</span>\n                            <span>{{stat.name}}</span>\n                        </div>\n                    </div>\n                    <div ng-show=\"vm.equipment[vm.slot].Major.List\">\n                        <div><span><b>Major Attributes</b></span> <span class=\"menu-box--sidenote\">(Limit: {{vm.equipment[vm.slot].Major.Limit}})</span></div>\n                        <div class=\"menu-box--stat\" ng-repeat=\"stat in vm.equipment[vm.slot].Major.List\">\n                            <span ng-show=\"stat.low\">+({{stat.low}}-{{stat.high}})</span>\n                            <span>{{stat.name}}</span>\n                        </div>\n                    </div>\n                    <div ng-show=\"vm.equipment[vm.slot].Minor.List\">\n                        <div><span><b>Minor Attributes</b></span> <span class=\"menu-box--sidenote\">(Limit: {{vm.equipment[vm.slot].Minor.Limit}})</span></div>\n                        <div class=\"menu-box--stat\" ng-repeat=\"stat in vm.equipment[vm.slot].Minor.List\">\n                            <span ng-show=\"stat.low\">+({{stat.low}}-{{stat.high}})</span>\n                            <span>{{stat.name}}</span>\n                        </div>\n                    </div>\n                    <div ng-show=\"vm.equipment[vm.slot].Skill.List\">\n                        <div><span><b>Skill Attributes</b></span> <span class=\"menu-box--sidenote\">(Limit: {{vm.equipment[vm.slot].Skill.Limit}})</span></div>\n                        <div class=\"menu-box--stat\" ng-repeat=\"stat in vm.equipment[vm.slot].Skill.List\">\n                            <span ng-show=\"stat.low\">+({{stat.low}}-{{stat.high}})</span>\n                            <span>{{stat.name}}</span>\n                        </div>\n                    </div>\n                    <div class=\"menu-box--footnote\">\n                        * Values above represent the available range for an item level 31 High End.\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-6 col-md-pull-6\">\n                <div class=\"text-center\"><h4>Available Talents</h4></div>\n                <div class=\"menu-box\" ng-repeat=\"talent in vm.equipment[vm.slot].Talents | orderBy:\'name\'\">\n                    <div class=\"\">\n                        <span class=\"menu-box--type\"><b>Talent</b></span>\n                        <span><b>{{talent.name}}</b></span>\n                    </div>\n                    <div class=\"\">\n                        <span>{{talent.description}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <footer></footer>\n    </div>\n\n</div>\n");}]);