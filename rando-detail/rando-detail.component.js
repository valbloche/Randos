angular.module("randoDetail").component('randoDetail', {
    templateUrl: "rando-detail/rando-detail.template.html",
    controller: [
        "$routeParams", "$http", "$location",
        function RandoDetailController($routeParams, $http, $location){
            var self = this;
            this.randoID = $routeParams.randoID;

            var randosURL = "http://localhost:4000/graphql"
            var randoAskedStructure = { query:"{ Rando(id:"+ this.randoID +"){\
                        id,\
                        name,\
                        denivele,\
                        climb_duration,\
                        descent_duration,\
                        total_duration,\
                        massif{\
                            name\
                            description\
                        },\
                        cotation{\
                            label\
                            short_description\
                            long_description\
                        }\
                    }\
                }"
            }
    
            $http.post(randosURL, JSON.stringify(randoAskedStructure)).then( (response) => {
                self.rando = response.data.data.Rando;
            }).catch( (e) => {
                console.error("La randonnée n'a pas pu être récupérée")
            } )
    
            self.returnToList = () => {
                $location.url('http://localhost:7400/')
            }
        }
    ]
})