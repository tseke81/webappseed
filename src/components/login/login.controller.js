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