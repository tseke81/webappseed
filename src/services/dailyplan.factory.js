(function (Factory, undefined){
     ITP.Modules.ITP.factory("dailyplanFactory", ['$http', function ($http){
         var factory = {};
     
        
        factory.getDailyPlan = function(){
            return $http.get('DailyServicePlanSearchResponse2.json')
        };
      return factory;
    }]);
}(ITP.Factory = ITP.Factory || {}));