'use strict';

angular.module('tucargaApp')

.directive('emailAvailable', function($http, $timeout) { // available
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            // push the validator on so it runs last.
            ctrl.$parsers.push(function(viewValue) {
                // set it to true here, otherwise it will not
                // clear out when previous validators fail.
                ctrl.$setValidity('emailAvailable', true);
                if(ctrl.$valid) {
                  // set it to false here, because if we need to check
                  // the validity of the email, it's invalid until the
                  // AJAX responds.
                  ctrl.$setValidity('checkingEmail', false);

                  // now do your thing, chicken wing.
                  if(viewValue !== "" && typeof viewValue !== "undefined") {
                      $http.get('http://127.0.0.1:8000/directory/user/' + viewValue)
                          .success(function(data, status, headers, config) {
                              console.log('win');
                              $('#add-person').addClass('none');
                              $('#add-person input, #add-person select').prop('disabled', true);
                              ctrl.$setValidity('emailAvailable', true);
                              ctrl.$setValidity('checkingEmail', true);
                          })
                          .error(function(data, status, headers, config) {
                              console.log('fail');
                              $('#add-person').removeClass('none');
                              $('#add-person input, #add-person select').prop('disabled', false);
                              ctrl.$setValidity('emailAvailable', false);
                              ctrl.$setValidity('checkingEmail', true);
                          });
                  } else {
                      ctrl.$setValidity('emailAvailable', false);
                      ctrl.$setValidity('checkingEmail', true);
                  }
                }
                return viewValue;
            });

        }
    };
});

// .directive('uniqueEmail', function($http) {
//   var toId;
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function(scope, elem, attr, ctrl) {
//       //when the scope changes, check the email.
//       scope.$watch(attr.ngModel, function(value) {
//         // if there was a previous attempt, stop it.
//         if(toId) clearTimeout(toId);

//         // start a new attempt with a delay to keep it from
//         // getting too "chatty".
//         toId = setTimeout(function(){
//           // call to some API that returns { isValid: true } or { isValid: false }
//           $http.get('http://127.0.0.1:8000/directory/user/' + value)
//             .success(function(data) {
//               console.log('win');
//               //set the validity of the field
//               ctrl.$setValidity(data.isValid);
//             })
//             .error(function(data) {
//                 console.log('fail');
//                 ctrl.$setValidity('uniqueEmail', data.isValid);
//             });
//         }, 400);
//       })
//     }
//   }
// });

// .directive('emailAvailable', function($http, $timeout) { // available
//     return {
//         require: 'ngModel',
//         link: function(scope, elem, attr, ctrl) {
//             // push the validator on so it runs last.
//             ctrl.$parsers.push(function(viewValue) {
//                 // set it to true here, otherwise it will not
//                 // clear out when previous validators fail.
//                 ctrl.$setValidity('emailAvailable', true);
//                 if(ctrl.$valid) {
//                   // set it to false here, because if we need to check
//                   // the validity of the email, it's invalid until the
//                   // AJAX responds.
//                   ctrl.$setValidity('checkingEmail', false);
//                   // now do your thing, chicken wing.
//                   if(viewValue !== "" && typeof viewValue !== "undefined") {
//                       $http.get('http://127.0.0.1:8000/directory/user/' + viewValue)
//                           .success(function(data, status, headers, config) {
//                               console.log('win');
//                               // $('#add-person').addClass('none');
//                               ctrl.$setValidity('emailAvailable', true);
//                               ctrl.$setValidity('checkingEmail', true);
//                           });
//                           .error(function(data, status, headers, config) {
//                               console.log('fail');
//                               // $('#add-person').removeClass('none');
//                               ctrl.$setValidity('emailAvailable', false);
//                               ctrl.$setValidity('checkingEmail', true);
//                           });
//                   } else {
//                       ctrl.$setValidity('emailAvailable', false);
//                       ctrl.$setValidity('checkingEmail', true);
//                   }
//                 }
//                 return viewValue;
//             });

//         }
//     };
// });


