/**
 * Created by leino on 06/04/2017.
 */
angular.module("app").controller("menuController", function ($scope, $http, $cookies, AuthService) {
    
    $scope.AuthService = AuthService;
    
    $http.get('/project/all').then(function (response) {
        console.log(response);
        $scope.allProjectsName = angular.fromJson(response.data);
    });


});