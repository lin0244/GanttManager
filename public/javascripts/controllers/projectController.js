/**
 * Created by leino on 06/04/2017.
 */
angular.module("app").controller("projectController", function ($scope, $http) {
    console.log($scope.project)
    $http.get('/project/info/' + $scope.project.id).then(function (response) {
        console.log("project/info/" + $scope.project.id)
        console.log(response);
        $scope.project = angular.fromJson(response.data);
    });
});