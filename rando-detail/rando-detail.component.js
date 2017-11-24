var detail = angular.module("randoDetail")

detail.component('randoDetail', {
    templateUrl: "rando-detail/rando-detail.template.html",
    controller: [
        "$scope", "$routeParams", "$location", "$mdDialog", "NgMap", "Weather", "RandoRequest",
        function RandoDetailController($scope, $routeParams, $location, $mdDialog, NgMap, Weather, RandoRequest){
            var self = this;
            this.randoID = $routeParams.randoID;
            this.mapsAPIKey = "AIzaSyBhML5ZukHThTv2twygJvY_BWoIlOuhbGM"
            
            /**
             * 
             */
            RandoRequest.getRandoByID(this.randoID).then( (rando) => {

                if(rando){
                    self.rando = rando;

                    Weather.getWeatherByGPS(self.rando.gps).then( (weather) => {

                        // Force la màj des bindings au retour de OpenWeatherMap pour afficher les données météo
                        $scope.$apply( () => 
                            self.rando.weather = {
                                main: weather.data.weather[0].main,
                                description: weather.data.weather[0].description,
                                temperature: (weather.data.main.temp - 273.15).toFixed(1),
                                humidity: weather.data.main.humidity,
                                wind: weather.data.wind,
                                city: weather.data.name
                            }
                        )
                        
                    } ).catch( (e) => {
                        
                    })
                }else{
                    reject()
                }

            }).catch( (e) => {
                console.error("La randonnée n'a pas pu être récupérée")
            } )

            self.returnToList = () => {
                $location.url('http://localhost:7400/')
            }

            self.showPrompt = function(ev, passage = null) {
                $mdDialog.show({
                  controller: DialogController,
                  templateUrl: 'rando-detail/rando-detail-dialog.template.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  locals: {rando: self.rando, passage: passage},
                  clickOutsideToClose:true
                }).then(function(answer) {
                }, function() {
                });
            };

            /**
             * 
             * @param {*} IDRando 
             * @param {*} passage 
             */
            self.removePassageFromRando = (IDRando, passage) => {
                
                RandoRequest.removePassageFromRando(IDRando, passage.id).then( (response) => {
                    let indexOfPassage = self.rando.passages.indexOf(passage);
                    if(indexOfPassage > -1){
                        self.rando.passages.splice(indexOfPassage, 1)
                        $scope.$apply()
                    }else{
                        console.log("passage n° " + passage.id)
                    }
                } ).catch( (e) => {
                    console.log(e)
                } )

            }

            NgMap.getMap().then(function(map) {
                map.setMapTypeId('terrain');
                var marker = new google.maps.Marker({
                    position:map.center,
                    map: map
                });
            }).catch(function(e){
                console.log(e)
            })
        }
    ]
})


function DialogController($scope, $http, $mdDialog, rando, passage, RandoRequest) {

    $scope.rando = rando
    $scope.date = new Date()
    $scope.passage = passage || { date: $scope.date }

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        console.table($scope.passage)

        RandoRequest.postPassageIntoRando($scope.rando.id, $scope.passage).then( () => {
            $scope.rando.passages.push($scope.passage)
            $mdDialog.hide(answer);
        }).catch( (e) => {
            console.error(e)
        })
    };
}