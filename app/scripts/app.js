'use strict';

angular.module('tucargaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      //controller: 'MainController'
    })
    .when('/como_funciona', {templateUrl: 'views/como.html'})
    .when('/ayuda', {templateUrl: 'views/ayuda.html'})
    .when('/contacto', {templateUrl: 'views/contacto.html'})
    // Registro + directorio
    .when('/directorio', {
      templateUrl: 'views/directorio.html',
      controller: 'DirectorioController'
    })
    // Registro transportista
    // .when('/registro', {
    //   templateUrl: 'views/registro.html',
    //   controller: 'RegistroController'
    // })
    .when('/exito', {templateUrl: 'views/exito.html'})
    .when('/cotizar/exito', {templateUrl: 'views/exito.html'})
    // Registro cargador
    .when('/cotizar/usuario', {
      templateUrl: 'views/cotizar/usuario.html'
    })
    // Cotizar
    .when('/cotizar', {
      templateUrl: 'views/cotizar.html'
    })
    .when('/cotizar/importacion', {
      templateUrl: 'views/cotizar/importacion.html',
      controller: 'ImpoController'
    })
    .when('/cotizar/exportacion', {
      templateUrl: 'views/cotizar/exportacion.html',
      controller: 'ExpoController'
    })
    .when('/cotizar/domestica', {
      templateUrl: 'views/cotizar/domestica.html',
      controller: 'DomesticaController'
    })
    .when('/cotizar/contenedor', {
      templateUrl: 'views/cotizar/contenedor.html',
      controller: 'ContenedorController'
    })
    // Test de API
    // .when('/polls', {
    //   templateUrl: 'views/polls.html',
    //   controller: 'PollsController'
    // })
    // .when('/choices', {
    //   templateUrl: 'views/choices.html',
    //   controller: 'ChoicesController'
    // })
    .otherwise({
      redirectTo: '/'
    });
});
