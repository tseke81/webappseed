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