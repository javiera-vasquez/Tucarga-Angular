'use strict';

angular.module('tucargaApp')
  .controller('PollsController', function ($scope, $http) {

    // Array of the content of the form
    $scope.formData = {};

    // $http.get('http://api.tucarga.info/direcotry/polls/')
    //   .success(function(data) {
    //     console.log('nice');
    //   });

    // Post to server
    $scope.processForm = function() {
        $http.post('http://127.0.0.1:8000/directory/freightfirststep/')

        .success(function(data) {
            console.log(data);

            if (!data.success) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
                $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
            }
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
