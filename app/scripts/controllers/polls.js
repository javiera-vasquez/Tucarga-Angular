'use strict';

angular.module('tucargaApp')
  .controller('PollsController', function ($http) {
    var app = this;
    $http.get('http://tctaa-avaras.dotcloud.com/polls/')
      .success(function(data) {
        console.log('nice');
        app.question = data;
      });
  });

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
