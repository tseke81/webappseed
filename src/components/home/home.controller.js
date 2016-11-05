(function (Controllers, undefined){
    ITP.Modules.ITP.controller("HomePageCtrl", ['$scope', 'corridorFactory', 'dailyplanFactory',  function ($scope, corridorFactory, dailyplanFactory){
      var vm = this;
      $scope.corridors = {};
      $scope.services = {};
      $scope.selectedService ={};
      $scope.dailyPlan = {};
      $scope.serviceName = '';
      $scope.planDate = '';
      $scope.planId = '';
      $scope.planStatus = 'created';
      $scope.planSubmitted = 'submitted';

        initController();

        function initController() {
        }

        function init(){
        corridorFactory.getCorridors()
         .success(function(corridors){
           $scope.corridors = corridors;
         })
         .error(function(data, status, headers, config){
            console.log(headers);
         });
      }

      function getPan(){
         dailyplanFactory.getDailyPlan()
         .success(function(plan){
           console.log(plan);
           $scope.dailyPlan = plan;
           $scope.planDate = plan.plan.plan_CREATE_DATE;
           $scope.planId = plan.plan.plan_ID;
           
         })
         .error(function(data, status, headers, config){
            console.log(headers);
         });
      }

      $scope.populateServices = function (services){
        $scope.services = services;
      }

      $scope.populateSelectedService = function (service){
        $scope.selectedService = service;
        $scope.serviceName = String(service[0].serviceName);          
  
        console.log( $scope.serviceName);
      }

      $scope.populatePlanStatus = function(){
       
         getPan();
      }     
      init(); 


    }]);
}(ITP.Controllers = ITP.Controllers || {}));