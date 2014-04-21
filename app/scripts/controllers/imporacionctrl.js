'use strict';

angular.module('tucargaApp')
  .controller('ImpoController', function ($scope, $http, $location) {

    // Pregunto por las regiones = selectRegion
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/region/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.selectRegion = data;
    }).error(function(data) {});

    // Pregunto por el tipo de carga
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/freighttype/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnFreightType = data;
    }).error(function(data) {});

    // Pregunto por el tipo de contenedor
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/containertype/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returncContainerType = data;
    }).error(function(data) {});

    // Pregunto por el tipo de camion
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/trucktype/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnTruckType = data;
    }).error(function(data) {});

    // Pregunto por el tipo de equipamiento
    $http({
        method : 'GET',
        url : 'http://127.0.0.1:8000/directory/equipment/',
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        $scope.returnEquipment = data;
    }).error(function(data) {});

    // Planta de destino
    $scope.freightwaypoint_destination = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.freightwaypoint_destination_region + '/',
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.returnCommuneA = data;
        }).error(function(data) {});
    };

    // Devolucion contenedor
    $scope.freightlocation_region = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.freightlocationRegion + '/',
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.returnCommuneB = data;
        }).error(function(data) {});
    };

    // Funciones para calcular las fechas
    $scope.freightwaypoint_origin_date_hour = 'T00:00';
    $scope.total_freightwaypoint_origin_date = function() {
        return $scope.freightwaypoint_origin_date_day + $scope.freightwaypoint_origin_date_hour;
    };

    $scope.total_freightwaypoint_destination_from_date = function() {
        return $scope.freightwaypoint_destination_from_date_day + 'T' + $scope.freightwaypoint_destination_from_date_hour;
    };

    // Funcion para parametros de cotizacion
    $scope.otherInfo = function() {
        return $scope.otherOne + ',' + $scope.otherTwo + ',' + $scope.otherThree;
    };

    // Funciones para crear telefonos
    $scope.userPhone = function() {
        return $scope.userPhonePrefix + $scope.userPhoneNumber;
    };

    $scope.userMobile = function() {
        return $scope.userMobilePrefix + $scope.userMobileNumber;
    };

    $scope.businessPhone = function() {
        return $scope.businessPhonePrefix + $scope.businessPhoneNumber;
    };

    // Condiciones de pago
    $scope.conditions = function() {
        return $scope.tiempoPago + ', ' + $scope.pagoDesde;
    };

    // Necesito almacenamiento
    $scope.storageFuncton = function() {
        if($scope.addNeedStorage == "true" ) {
            $scope.storageState = "false"
            return 'Si, ' + 'Dias: ' + $scope.needs_storage_days + ', Descripcion: '+ $scope.needs_storage_string;
        }
        else if($scope.addNeedStorage == "false") {
            return 'No';
        }
    };

    // $scope.rut = function() {
    //     $scope.numero_rut + $scope.verificador_rut;
    // };

    // Array of the element to send
    $scope.formData = {};

    // Set validation to false
    $scope.submitted = false;

    // Validation of the mail
    $scope.email = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/user/' + $scope.formData.contact_email,
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
           // console.log("win");
           // $('#add-person').addClass('none');
           // $('.status_user').addClass('none');
            $scope.isUserValid = function() {return false;}
        }).error(function(data) {
            // console.log("fail");
            // $('#add-person').removeClass('none');
            // $('.status_user').removeClass('none');
            $scope.isUserValid = function() {return true;}
        });
    };

    // Post to server
    $scope.freightPost = function() {
        // Tipo de cotizacion
        $scope.formData.obj_type = 'impo';
        // Funciones de fechas
        $scope.formData.freightwaypoint_origin_from_date = $scope.total_freightwaypoint_origin_date();
        $scope.formData.freightwaypoint_destination_from_date =  $scope.total_freightwaypoint_destination_from_date();
        // Parametros de una cotizacion
        $scope.formData.needs_storage = $scope.storageFuncton();
        $scope.formData.reason = $scope.otherInfo();
        $scope.formData.service_conditions = $scope.conditions();
        //Telefonos empresa y usuario
        $scope.formData.company_phone =  $scope.businessPhone();
        $scope.formData.userdirectory_mobile = $scope.userMobile();
        $scope.formData.userdirectory_phone = $scope.userPhone();
        // Rut usuario
        // $scope.formData.company_business_number = $scope.rut();
        // Submit validation
        if($scope.cargaForm.$valid) {
            // send the form
            $http({
                method : 'POST',
                url : 'http://127.0.0.1:8000/directory/freightfirststep/',
                data : $scope.formData, // pass in data as strings
                headers : {'Content-Type': 'application/json'}
              })
            .success(function(data) {
                $location.url('/cotizar/exito')
                //console.log('win' + data);
              })
            .error(function(data) {
                // console.log('fail' + data);
              });
        }else {
            $scope.cargaForm.submitted = true;
            $('.form-status').removeClass('none');
            // console.log("no valid");
        };

      };

  });
