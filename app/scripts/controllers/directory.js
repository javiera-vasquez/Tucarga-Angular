'use strict';

angular.module('tucargaApp')
  .controller('DirectorioController', function ($scope, $http) {


    $http.get('http://127.0.0.1:8000/directory/transportcompany/')
      .success(function(data) {
        console.log('nice');
      });

  });
