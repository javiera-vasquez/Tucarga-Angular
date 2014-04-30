'use strict';

angular.module('tucargaApp')
  .controller('FormController', function ($scope, $http, $location) {

    // Arreglo para enviar el formulario de cotizacion
    $scope.formData = {};

    // Set validation to false
    $scope.submitted = false;
    // $scope.impo_form.submitted = true;

    // $scope.add_needs_storage = function() {
    //     if($scope.a === true) {
    //         console.log('win_a');
    //         return 'Si, ' + $scope.needs_storage_string;
    //     } else if ($scope.b === true) {
    //         console.log('win_b');
    //     }

    // };

    $scope.add_needs_storage = function() {
        return 'Si, ' + $scope.needs_storage_string;
    };

   // Funcion para parametros de cotizacion
    $scope.otherInfo = function() {
        return $scope.otherOne + ',' + $scope.otherTwo + ',' + $scope.otherThree;
    };

    $scope.email = function() {
        $http({
            method : 'GET',
            url : 'http://127.0.0.1:8000/directory/user/' + $scope.formData.contact_email,
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
           console.log("win");
           $('#add-person').addClass('none');
           $('.status_user').addClass('none');
            $scope.isUserValid = function() {return false;}
        }).error(function(data) {
            console.log("fail");
            $('#add-person').removeClass('none');
            $('.status_user').removeClass('none');
            $scope.isUserValid = function() {return true;}
        });
    };

    // Modelo de validacion
    // $scope.isUserValid = function() {
    //     if($scope.impo_form.email.$invalid) {
    //         return true;
    //     } else if($scope.impo_form.email.$valid) {
    //         return false;
    //     }
    // };

    // Post to server
    $scope.freightPost = function() {
        // Submit validation
        $scope.formData.needs_storage = $scope.add_needs_storage();
        $scope.formData.other = $scope.otherInfo();
        if($scope.impo_form.$valid) {
            // send the form
            $http({
                method : 'POST',
                url : 'http://127.0.0.1:8000/directory/freightfirststep/',
                data : $scope.formData, // pass in data as strings
                headers : {'Content-Type': 'application/json'}
              })
            .success(function(data) {
                //console.log('win' + data);
                $location.url('/cotizar/exito')

              })
            .error(function(data) {
                // console.log('fail' + data);
              });
        }else {
            $scope.impo_form.submitted = true;
            console.log("no valid");
        };

      };

  });
