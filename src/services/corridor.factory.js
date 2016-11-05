(function (Factory, undefined){
     ITP.Modules.ITP.factory("corridorFactory", ['$http', function ($http){
         var factory = {};
         var url = 'http://localhost:8080/corridor';
        
        factory.getCorridors = function(){
            return $http.get('corridor.json')
        };
      return factory;
    }]);
}(ITP.Factory = ITP.Factory || {}));