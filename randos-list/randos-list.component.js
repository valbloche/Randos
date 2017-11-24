angular.module("randosList").component('randosList', {
    templateUrl: "randos-list/randos-list.template.html",
    controller: [ 
        "$location", "RandoRequest",
        function RandosListController($location, RandoRequest){

            var self = this;

            RandoRequest.getAllRandos().then( (randos) => {
                self.randos = randos;
            }).catch( (e) => {
                console.error("Les randonnées n'ont pas pu être récupérées")
            } )
            
            self.getFiltersScope = () => {
                var sel = 'md-toolbar[ng-controller="FilterController"]';
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
    ]
})