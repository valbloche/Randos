angular
.module("randoApp")
.config(
    [
        "$locationProvider", "$routeProvider", "$mdThemingProvider",
        function config($locationProvider, $routeProvider, $mdThemingProvider){
            $locationProvider.hashPrefix('!');
            
            $routeProvider.
            when('/', {
                template: '<randos-list filters-enabled></randos-list>'
            }).
            when('/:randoID', {
                template: '<rando-detail></rando-detail>'
            }).
            otherwise('/');

            $mdThemingProvider.theme('default').primaryPalette("light-blue").accentPalette('blue');
        }
    ]
);