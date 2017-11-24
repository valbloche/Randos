angular
.module("randoApp")
.config(
    [
        "$locationProvider", "$routeProvider", "$mdThemingProvider",
        function config($locationProvider, $routeProvider, $mdThemingProvider, $cookies){
            
            var MapsAPIKey = "AIzaSyBhML5ZukHThTv2twygJvY_BWoIlOuhbGM"
            
            var $cookies;
            angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
                $cookies = _$cookies_;
              }]);

            $locationProvider.hashPrefix('!');
            
            $routeProvider.
            when('/', {
                template: '<randos-list filters-enabled></randos-list>'
            }).
            when('/:randoID', {
                template: '<rando-detail></rando-detail>'
            }).
            otherwise('/');

            let theme = $cookies.get('themeCookie')
            switch (theme){
                case 'winter':
                    $mdThemingProvider.theme('default').primaryPalette("light-blue").accentPalette('blue');
                break;
                case 'spring':
                    $mdThemingProvider.theme('default').primaryPalette("light-green").accentPalette('lime');
                break;
                case 'summer':
                    $mdThemingProvider.theme('default').primaryPalette("amber").accentPalette('orange');
                break;
                case 'autumn':
                    $mdThemingProvider.theme('default').primaryPalette("orange").accentPalette('amber');
                break;
            }
            
        }
    ]
);