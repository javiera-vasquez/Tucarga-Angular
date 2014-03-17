'use strict';

angular.module('tucargaApp')
  .controller('FreightController', function ($scope, $http) {

    $scope.originHour = "T00:00"

     $scope.dateTransform = function() {
        return $scope.originDate + $scope.originHour;
      }

    // Array of the content of the form
    $scope.formData = {
        freightwaypoint_origin_to_date: $scope.dateTransform,
    };

    // Post to server
    $scope.freightPost = function() {
        $http({
            method  : 'POST',
            url     : 'http://127.0.0.1:8000/directory/freightfirststep/',
            data    : $scope.formData, // pass in data as strings
            headers: {'Content-Type': 'application/json'}
          })
        .success(function(data) {
            console.log(data);
          })
        .error(function(data) {
            console.log('fail' + data);
          });
      };

  });
