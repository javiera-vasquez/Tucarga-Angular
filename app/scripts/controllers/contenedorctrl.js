'use strict';

angular.module('tucargaApp')
  .controller('ContenedorController', function ($scope, $http, $location) {

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

    // Retiro de contenedor
    $scope.withdrawCommune = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.formData.freightlocation_withdraw_region + '/',
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
            url : 'http://127.0.0.1:8000/directory/commune/' + $scope.formData.freightlocation_return_region + '/',
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            $scope.returnCommuneB = data;
        }).error(function(data) {});
    };

    // Origen contenedor // Fecha
    $scope.freightlocation_withdraw_from_date_hour = 'T00:00';
    $scope.total_freightlocation_withdraw_from_date = function() {
        return $scope.freightlocation_withdraw_from_date_day + $scope.freightlocation_withdraw_from_date_hour;
    };
    // Destino contenedor cliente // Fecha
    $scope.freightlocation_return_to_date_hour = 'T00:00';
    $scope.total_freightlocation_return_to_date = function() {
        return $scope.freightlocation_return_to_date_day + $scope.freightlocation_return_to_date_hour;
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

    // $scope.businessPhone = function() {
    //     return $scope.businessPhonePrefix + $scope.businessPhoneNumber;
    // };

    // Condiciones de pago
    $scope.conditions = function() {
        return $scope.tiempoPago + ', ' + $scope.pagoDesde;
    };

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
           // Arreglo de datos de usuario
           $scope.infoUser = data;
           // Bloqueo input
            $scope.userDisable= function() {return true;}
            // Elimino validacion de usuario
            $scope.isUserValid = function() {return false;}
            // Manejo modal de status
           $('.status-mail.valid').removeClass('none');
           $('.status-mail.invalid').addClass('none');
           $('.status-mail.nothing').addClass('none');
        }).error(function(data) {
            // console.log("fail");
           // desbloque input
            $scope.userDisable= function() {return false;}
            // Agrego validacion de usuario
            $scope.isUserValid = function() {return true;}
           $('.status-mail.invalid').removeClass('none');
           $('.status-mail.valid').addClass('none');
           $('.status-mail.nothing').addClass('none');
        });
    };

    // Post to server
    $scope.freightPost = function() {
        // Tipo de cotizacion
        $scope.formData.obj_type = 'empt';
        // Funciones de fechas
        $scope.formData.freightlocation_withdraw_from_date= $scope.total_freightlocation_withdraw_from_date();
        $scope.formData.freightlocation_return_to_date =  $scope.total_freightlocation_return_to_date();
        // Parametros de una cotizacion
        $scope.formData.reason = $scope.otherInfo();
        $scope.formData.service_conditions = $scope.conditions();
        //Telefonos empresa y usuario
        // $scope.formData.company_phone =  $scope.businessPhone();
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
