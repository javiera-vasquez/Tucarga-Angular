'use strict';

angular.module('tucargaApp')
  .controller('DirectorioController', function ($scope, $http) {
    $http({
        method  : 'GET',
        url     : 'http://127.0.0.1:8000/directory/transportcompany/',
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data) {
          console.log('nice');
          $scope.directory = data;
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.numberOfPages=function(){
              return Math.ceil($scope.directory.length/$scope.pageSize);
          }
        })
      .error(function(data) {
          console.log(data);
        });
  });

