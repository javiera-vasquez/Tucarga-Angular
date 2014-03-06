'use strict';

angular.module('tucargaApp')
  .controller('FreightController', function ($scope, $http) {

    // Array of the content of the form
    $scope.formData = {};

    // Post to server
    $scope.processForm = function() {
        $http.post('http://127.0.0.1:8000/directory/freightfirststep/')

        .success(function(data) {
            console.log(data);
        })

        .error(function(data) {
            console.log(data);
        });
    };

  });
