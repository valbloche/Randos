var app = angular.module("randoApp" , ['randosList', 'randoDetail', 'ngMaterial', 'ngRoute', 'ngCookies']);

app.controller('NavController', ($scope, $timeout, $mdSidenav, $cookies, $window) => {
    $scope.toggleLeft = () => {
        $mdSidenav("left").toggle();
      };

    $scope.themeCookie = $cookies.get('themeCookie');
    if(!$scope.themeCookie){
        $scope.themeCookie = "winter"
        $cookies.put("themeCookie", "winter");
    }

    $scope.changeTheme = (theme) => {
        $scope.themeCookie = theme
        $cookies.put("themeCookie", theme);

        $window.location.reload();
    }
})

app.controller('FilterController', ($scope, $http) => {
    
    var randosURL = "http://localhost:4000/graphql"
    var cotationsAskedStructure = { query:"{ Cotations{\
                id,\
                label,\
                short_description\
            }\
        }"
    }

    var massifsAskedStructure = { query:"{ Massifs{\
                id,\
                name\
            }\
        }"
    }

    $http.post(randosURL, JSON.stringify(cotationsAskedStructure)).then( (response) => {
        $scope.cotations = response.data.data.Cotations;
    }).catch( (e) => {
        console.error("Les cotations n'ont pas pu être récupérées")
    } )

    $http.post(randosURL, JSON.stringify(massifsAskedStructure)).then( (response) => {
        $scope.massifs = response.data.data.Massifs;
    }).catch( (e) => {
        console.error("Les massifs n'ont pas pu être récupérées")
    } )

    
});
