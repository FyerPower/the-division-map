[TheDivisionAgent.com](http://thedivisionagent.com)
--------------------------------------
Welcome to The Division Agent.  I've created this site for the sole purpose of providing the easiest to use tools for the game! New and exciting features are continuously added in order to stay ahead.  Check the list of features below to see all that the tool has to offer


#### Features
* Mobile and tablet friendly
* Interactive map featuring all markers in game (with some extra ones)
* Easily create and share custom routes with your friends and others in the communtiy.
* Collapsible sidebar on map
* Fullscreen option on map
* Equipment Attribute Information
* Clean interface
* Undo functionality when adding custom paths
* Scale Markers on Map
* Remember user map preferences
* Improved Map Graphics
* Custom Timers

#### Upcoming Features
* Search feature to search all markers
* Add image preview of locations on hover
* Add boss profiles (Name, Faction, Archetype, Image, Known Drops)
* Underground / Subway Maps
* Other Pages


What can you do to help?
--------------------------------------
If you notice anything missing or have any improvements please create a pull request of your changes. Or if you're not experienced with Javascript and Github, send me a message on [reddit](http://www.reddit.com/message/compose/?to=gamegenius86).


How do I contribute code changes?
--------------------------------------

* Install NPM
* `npm install`: Install all dev dependencies (livereload, sass, minification, etc)
* `gulp`: run gulp build processes and then starts to watch for changes.

* Install Ruby and the Bundler Gem
* `bundle install`: downloads and installs `rack` for a simple webserver
* `rackup`: starts the server locally running on `localhost:9292/`

#### How to generate map tiles
* `brew install python`
* `brew install gdal`
* `[project]/gdal2leaflet.py -l -p raster -z 2-4 -w none [input_image] [project]/src/assets/img/map_v[x]/`

Credits & Licence
--------------------------------------
Created by [Michael Lynch](https://github.com/gamegenius86). Licensed under [CC BY-NC-SA](http://creativecommons.org/licenses/by-nc-sa/4.0/).

This software uses the following libraries developed by third parties, and are licenced seperately;
* [jQuery](http://jquery.com) (MIT)
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/) (MIT)
