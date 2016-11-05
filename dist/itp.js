(function(ITP, undefined){

    /** 
     * @ngdoc function
     * @name ITP
     * @id ITP
     * @description
     * 
     * Setup ITP application parameters for AngularJs
    */
    ITP.version         = "1.0.0";
    ITP.PartialsPath    = "partials/";
    ITP.Factory         = {};
    ITP.Modules         = {};
    ITP.Configs         = {};
    ITP.Services        = {};
    ITP.Run             = {};
    ITP.Controllers     = {};
    ITP.Directives      = {};

}(window.ITP = window.ITP || {}));
(function (Modules, undefined){

    /**
     * @ngdoc object
     * @id ITP
     * @name ITP
     * @description
     * 
     * This module initializes  the ITP Angular module
     */
    Modules.ITP = angular.module("itp", ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E' , 'ui.bootstrap']);

}(ITP.Modules = ITP.Modules || {}));
(function (Configs, undefined){

    /**
     * @ngdoc object
     * @id ITP
     * @name ITP
     * @description
     * 
     * This module initializes  the ITP Angular module
     */
    ITP.Modules.ITP.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
       // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'HomePageCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'LoginPageCtrl',
                controllerAs: 'vm'
            });
   
    }]);

}(ITP.Configs = ITP.Configs || {}));
(function (Run, undefined){

    /**
     * @ngdoc object
     * @id ITP
     * @name ITP
     * @description
     * 
     * This module initializes  the ITP Angular module
     */
    ITP.Modules.ITP.run(['$rootScope', '$http', '$location', '$localStorage', function($rootScope, $http, $location, $localStorage){
         // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }]);

}(ITP.Run = ITP.Run || {}));
(function (Services, undefined){
     ITP.Modules.ITP.service("AuthenticationService", ['$http', '$localStorage', function ($http, $localStorage){
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, callback) {
            $http.post('/api/authenticate', { username: username})
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }]);
}(ITP.Services = ITP.Services || {}));
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
(function (Factory, undefined){
     ITP.Modules.ITP.factory("dailyplanFactory", ['$http', function ($http){
         var factory = {};
     
        
        factory.getDailyPlan = function(){
            return $http.get('DailyServicePlanSearchResponse2.json')
        };
      return factory;
    }]);
}(ITP.Factory = ITP.Factory || {}));
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
(function (Controllers, undefined){
    ITP.Modules.ITP.controller("LoginPageCtrl", ['$location', 'AuthenticationService',  function ($location, AuthenticationService){
          var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username is incorrect';
                    vm.loading = false;
                }
            });
        };
    }]);
}(ITP.Controllers = ITP.Controllers || {}));