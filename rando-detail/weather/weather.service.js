angular.module('weather')
.factory("Weather", ["$http", 
    ($http) => {
        this.getWeatherByGPS = getWeatherByGPS

        function getWeatherByGPS(gps) {
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

        return this
    }
    
])