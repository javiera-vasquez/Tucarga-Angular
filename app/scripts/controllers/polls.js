'use strict';

angular.module('tucargaApp')
  .controller('PollsController', function ($scope, $http) {

    // Array of the content of the form
    $scope.formData = {};

    // Post to server
    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : 'http://127.0.0.1:8000/directory/freightfirststep/',
            data    : $scope.formData,  // pass in data as strings
            headers: {'Content-Type': 'application/json'}
          })

        .success(function(data) {
            console.log(data);
          })
        .error(function(data) {
            console.log(data);
          });
      };

  });

  // .controller('PollsController', function ($http) {
  //   var app = this;
  //   $http.get('http://tctaa-avaras.dotcloud.com/polls/')
  //     .success(function(data) {
  //       console.log('nice');
  //       app.question = data;
  //     });

  // http://tctaa-avaras.dotcloud.com/polls/

// app.controller("AppCtrl", function($http) {
//     var app = this;
//     $http.get("http://localhost:3000/users")
//       .success(function(data) {
//         app.people = data;
//       })

//     app.addPerson = function(person) {
//         $http.post("http://localhost:3000/users", person)
//           .success(function(data) {
//             app.people = data;
//           })
//     }
// })
