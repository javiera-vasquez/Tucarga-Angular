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
      })
    .error(function(data) {
        console.log(data);
      });


  });
