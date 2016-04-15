(function() {
    'use strict';

    angular.module('theDivisionAgent.news', []);

    angular.module('theDivisionAgent.news')
        .config(function($stateProvider) {
            $stateProvider
                .state('news', {
                    url: '/news/{slug}',
                    templateUrl: function (stateParams){
                        return 'modules/news/news-' + stateParams.slug + '.html';
                    }
                });
        });
}());
