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