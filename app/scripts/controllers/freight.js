'use strict';

angular.module('tucargaApp')
  .controller('FreightController', function ($scope, $http) {

    // Pregunto por las regiones
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/region/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnRegion = data;
    }).error(function(data) {
        console.log(data + "fail");
    });

    // Pregunto por la comuna segun region de destino
    $scope.destinationCommune = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.destinationCommuneRegion + '/',
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.destinationSelectCommune = data;
        }).error(function(data) {
            console.log(data + "fail");
        });
    };

    // Pregunto por la comuna segun region de retorno
    $scope.returnCommune = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.returnCommuneRegion + '/',
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.returnSelectCommune = data;
        }).error(function(data) {
            console.log(data + "fail");
        });
    };

    // Pregunto por el tipo de carga
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/freighttype/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnFreightType = data;
    }).error(function(data) {
        console.log(data + "fail");
    });

    // Pregunto por el tipo de contenedor
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/containertype/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returncContainerType = data;
    }).error(function(data) {
        console.log(data + "fail");
    });

    // Pregunto por el tipo de camion
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/trucktype/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnTruckType = data;
    }).error(function(data) {
        console.log(data + "fail");
    });

    // Pregunto por el tipo de equipamiento
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/equipment/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnEquipment = data;
    }).error(function(data) {
        console.log(data + "fail");
    });

    // Funciones para calcular las fechas
    $scope.originHour = "T00:00";
    $scope.originDate = "";

    $scope.originTotalDate = function() {
        return $scope.originDate + $scope.originHour;
    };

    $scope.destinationTotalDate = function() {
        return $scope.destinationDate + 'T' + $scope.destinationHour;
    };

    // Funcion para parametros de cotizacion
    $scope.otherInfo = function() {
        return $scope.otherOne + ',' + $scope.otherTwo + ',' + $scope.otherThree;
    };

    $scope.formData = {};

    // Post to server
    $scope.freightPost = function() {
        // Tipo de cotizacion
        $scope.formData.obj_type = "impo";
        // Funciones de fechas
        $scope.formData.freightwaypoint_origin_from_date = $scope.originTotalDate();
        $scope.formData.freightwaypoint_destination_from_date =  $scope.destinationTotalDate();
        // Parametros de una cotizacion
        $scope.formData.other = $scope.otherInfo();
        // send the form
        $http({
            method : 'POST',
            url : 'http://127.0.0.1:8000/directory/freightfirststep/',
            data : $scope.formData, // pass in data as strings
            headers : {'Content-Type': 'application/json'}
          })
        .success(function(data) {
            console.log('win' + data);
            $location.url('/cotizar/exito')

          })
        .error(function(data) {
            console.log('fail' + data);
          });
      };

  });
