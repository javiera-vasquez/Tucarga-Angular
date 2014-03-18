'use strict';

angular.module('tucargaApp')
  .controller('FreightController', function ($scope, $http) {

    $scope.destinationCommune = function() {
        console.log($scope.originRegion);
        // Pregunto por regiones y comunas
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.destinationRegion,
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.destinationSelectCommune = data;
        }).error(function(data) {
            console.log(data + "fail");
        });
    };

    $scope.returnCommune = function() {
        // Pregunto por regiones y comunas
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.returnRegion,
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.returnSelectCommune = data;
        }).error(function(data) {
            console.log(data + "fail");
        });
    };

    // Tipo de cotizacion
    $scope.obj_type = "impo";

    // Funcion para calcular una fecha
    $scope.originHour = "T00:00";
    $scope.originDate = ""

    $scope.originTotalDate = function() {
        return $scope.originDate + $scope.originHour;
    }

    $scope.destinationTotalDate = function() {
        return $scope.destinationDate + $scope.destinationHour;
    }

    // Post to server
    $scope.freightPost = function() {
        // Array of the content of the form
        $scope.formData = {
            obj_type: $scope.obj_type,
            freightwaypoint_origin_from_date: $scope.originTotalDate(),
            freightwaypoint_destination_from_date: $scope.destinationTotalDate(),
        };
        $http({
            method : 'POST',
            url : 'http://127.0.0.1:8000/directory/freightfirststep/',
            data : $scope.formData, // pass in data as strings
            headers : {'Content-Type': 'application/json'}
          })
        .success(function(data) {
            console.log('win' + data);
          })
        .error(function(data) {
            console.log('fail' + data);
          });
      };

  });
