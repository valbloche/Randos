angular.module("randoDetail", ['angular-input-stars']).component('randoDetail', {
    templateUrl: "rando-detail/rando-detail.template.html",
    controller: [
        "$routeParams", "$http", "$location", "$mdDialog",
        function RandoDetailController($routeParams, $http, $location, $mdDialog){
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
                        gps\
                    }\
                }"
            }
            
            $http.post(randosURL, JSON.stringify(randoAskedStructure)).then( (response) => {
                self.rando = response.data.data.Rando;

                self.getWeather(self.rando.gps).then( (weather) => {
                    self.rando.weather = {
                        main: weather.data.weather[0].main,
                        description: weather.data.weather[0].description,
                        temperature: (weather.data.main.temp - 273.15).toFixed(1),
                        humidity: weather.data.main.humidity,
                        wind: weather.data.wind,
                        city: weather.data.name
                    }

                    console.table(self.rando)
                } ).catch( (e) => {
                    console.log("paf")
                })

            }).catch( (e) => {
                console.error("La randonnée n'a pas pu être récupérée")
            } )

            self.returnToList = () => {
                $location.url('http://localhost:7400/')
            }

            self.getWeather = (gps) => {
                return new Promise( (resolve, reject) => {
                    $http.get("https://api.openweathermap.org/data/2.5/weather?lat="+gps[0]+"&lon="+gps[1]+"&lang=fr&APPID=24cba6b83f2370ceaa61603867cc9a3f").then((response) => {
                        resolve(response)
                    }).catch( (e) => {
                        console.error("Météo non récupérée")
                        console.error(e)
                        reject(e)
                    })
                })
            }

            self.showPrompt = function(ev) {
                $mdDialog.show({
                  controller: DialogController,
                  templateUrl: 'rando-detail/rando-detail-dialog.template.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  locals: {rando: self.rando},
                  clickOutsideToClose:true
                })
                .then(function(answer) {
                  self.status = 'You said the information was "' + answer + '".';
                  console.log(self.status)
                }, function() {
                    self.status = 'You cancelled the dialog.';
                    console.log(self.status)
                });
              };

            /*self.showPrompt = function(ev) {

                let date = new Date();
                let day = date.getDate();
                let monthIndex = date.getMonth() + 1;
                let year = date.getFullYear();
                let fullDay = day + '/' + monthIndex + '/' + year

                // Appending dialog to document.body to cover sidenav in docs app
                let confirm = $mdDialog.prompt()
                  .title(self.rando.name + " le " + fullDay)
                  .textContent('Bowser is a common name.')
                  .placeholder('Dog name')
                  .ariaLabel('Dog name')
                  .targetEvent(ev)
                  .ok('J\'ai fini !')
                  .cancel('Vestibule')
                  .clickOutsideToClose(true);
            
                $mdDialog.show(confirm).then(function(result) {
                    self.rando.passages.push()
                }, function() {
                    self.status = 'You didn\'t name your dog.';
                });
            }*/
        }
    ]
})

function DialogController($scope, $mdDialog, rando) {

    $scope.rando = rando
    $scope.date = new Date()

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }