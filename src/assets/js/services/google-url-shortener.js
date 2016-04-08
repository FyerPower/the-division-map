(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .service('GoogleURLShortener', GoogleURLShortener);

    GoogleURLShortener.$inject = ['GApi', 'GClient', '$q'];
    function GoogleURLShortener(GApi, GClient, $q){
        var service = {};

        service.init = function(api_key){
            GApi.load('urlshortener','v1',function(){});
            GClient.setApiKey(api_key);
        };

        service.shorten = function(longUrl){
            return GApi.execute('urlshortener', 'url.insert', {'longUrl': longUrl}).then(function(response) {
                return response.id;
            });
        };

        return service;
    }


}());
