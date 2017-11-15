angular.module("randoApp" , ['randosList', 'ngMaterial'])
.config( ($mdThemingProvider) => {
    $mdThemingProvider.theme('default').primaryPalette("light-blue").accentPalette('blue');;
} )
.controller('NavController', ($scope, $timeout, $mdSidenav) => {
    $scope.toggleLeft = () => {
        $mdSidenav("left").toggle();
      };
})
.controller('FilterController', ($scope, $http) => {
    
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