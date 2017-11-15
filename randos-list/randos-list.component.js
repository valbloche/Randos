angular.module("randosList").component('randosList', {
    templateUrl: "randos-list/randos-list.template.html",
    controller: function RandosListController($http){
        var self = this;
        var parent = self.$parent;
        var randosURL = "http://localhost:4000/graphql"
        var randosAskedStructure = { query:"{ Randos{\
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

        $http.post(randosURL, JSON.stringify(randosAskedStructure)).then( (response) => {
            self.randos = response.data.data.Randos;
        }).catch( (e) => {
            console.error("Les randonnées n'ont pas pu être récupérées")
        } )

        self.clickOnList = function(rando){
            alert(rando.nom)
        }
        
        self.getFiltersScope = () => {
            var sel = 'div[ng-controller="FilterController"]';
            var scope = angular.element(document.querySelector(sel)).scope();
            return scope;
        }

        self.applyFilters = (item) => {

            let filtersScope = this.getFiltersScope();

            let filter_name = filtersScope.filter_name || item.name; 
            let filter_massif = (filtersScope.filter_massif && typeof filtersScope.filter_massif != "undefined" ? filtersScope.filter_massif.name : null) || item.massif.name;
            let filter_cotation = (filtersScope.filter_cotation && typeof filtersScope.filter_cotation != "undefined" ? filtersScope.filter_cotation.label : null) || item.cotation.label;;

            if(item){
                return (item.name.indexOf(filter_name) >= 0) && (item.massif.name == filter_massif) && (item.cotation.label == filter_cotation)
            }
        }

    }
})