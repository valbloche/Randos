angular.module('rando-list.service', [])
.factory('RandoRequest', [ "$http",
    ($http) => {

        this.randosURL = "http://localhost:4000/graphql"
        this.getAllRandos = getAllRandos
        this.getRandoByID = getRandoByID
        this.postPassageIntoRando = postPassageIntoRando
        this.removePassageFromRando = removePassageFromRando

        /**
         * 
         */
        function getAllRandos(){
            let randosAskedStructure = { query:"{ Randos{\
                id,\
                name,\
                denivele,\
                climb_duration,\
                descent_duration,\
                total_duration,\
                massif{\
                    name\
                },\
                cotation{\
                    label\
                    short_description\
                }\
                }\
            }"
            }

            return new Promise( (resolve, reject) => {
                $http.post(this.randosURL, JSON.stringify(randosAskedStructure)).then( (response) => {
                    resolve(response.data.data.Randos);
                }).catch( (e) => {
                    reject("Les randonnées n'ont pas pu être récupérées")
                } )
            } ) 

        }

        function getRandosByMassif(IDMassif){
            
        }

        function getRandosByCotation(IDCotation){

        }

        /**
         * 
         * @param {*} IDRando 
         */
        function getRandoByID(IDRando){
            let randoAskedStructure = { query:"\
                { \
                    Rando(id:"+ IDRando +"){\
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
                        passages{\
                            id\
                            date\
                            landscape_beauty\
                            animal_density\
                            difficulty\
                            comments\
                            duration\
                        }\
                    }\
                }"
            }

            return new Promise( (resolve, reject) => {
                $http.post(this.randosURL, JSON.stringify(randoAskedStructure)).then( (response) => {
                    resolve(response.data.data.Rando);
                }).catch( (e) => {
                    reject("La randonnée "+ IDRando +" n'a pas pu être récupérée")
                } )
            } ) 
        }

        /**
         * 
         * @param {*} IDRando 
         * @param {*} passage 
         */
        function postPassageIntoRando(IDRando, passage){
                
            let inputPassage = { 
                date: new Date(),
                departure_hour: 720, 
                arrival_hour: 850, 
                difficulty: passage.difficulty, 
                animal_density: passage.animal_density, 
                landscape_beauty: passage.landscape_beauty, 
                comments: passage.comments 
            }

            let structure = `mutation AddPassageToRando($idRando: Int, $passage: InputPassage){
                addPassageToRando(IDRando: $idRando, passage: $passage){
                    name
                }
            } `;

            return new Promise( (resolve, reject) => {
                $http.post(
                    this.randosURL, 
                    JSON.stringify({
                        query: structure,
                        variables:{
                            idRando: IDRando,
                            passage: inputPassage
                        }
                    })
                ).then( (response) => {
                    resolve(response)
                }).catch( (error) => {
                    reject()
                });
            } )
            
        }

        /**
         * 
         * @param {*} IDRando 
         * @param {*} IDPassage 
         */
        function removePassageFromRando(IDRando, IDPassage){
            
            let structure = `mutation RemovePassageFromRando($idRando: Int, $idPassage: Int){
                removePassageFromRando(IDRando: $idRando, IDPassage: $idPassage){
                    name
                }
            } `;

            return new Promise( (resolve, reject) => {
                $http.post(
                    this.randosURL, 
                    JSON.stringify({
                        query: structure,
                        variables:{
                            idRando: IDRando,
                            idPassage: IDPassage
                        }
                    })
                ).then( (response) => {
                    resolve(response)
                }).catch( (error) => {
                    reject()
                });
            })
        }

        return this
    }
])