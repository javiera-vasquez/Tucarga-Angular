'use strict';

angular.module('tucargaApp')
  .controller('DirectorioController', function ($scope, $http) {

    // http://tucarga-directory-pagination.herokuapp.com/directory/transportcompany/

    // Loading de la pagina
    $scope.loading = true;

    // Filtros del request
    $scope.baseFilters = {
      page: 1,
      pageSize: 10,
      storage: 0,
      coverage: 0
    };

    $scope.loadPage = function() {
      $http({
          method: 'GET',
          url: 'http://tucarga-directory-pagination.herokuapp.com/directory/transportcompany/?page='
            + $scope.baseFilters.page,
          headers: {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            // Loading de la pagina
            $scope.loading = false;
            // Model of the request
            $scope.directory = data.results;
            $scope.pagesCount = data.count;
            // Numero las paginas
            $scope.numberOfPages=function(){
                return Math.ceil($scope.pagesCount / $scope.baseFilters.pageSize)
            };
            // Inicio funcion
            $scope.stringOfPages = $scope.numberOfPages();
          })
        .error(function(data) {
            console.log(data);
          });
    };

    // Get del directorio
    $scope.loadPage();

    $scope.nextPage = function() {
      if($scope.baseFilters.page < $scope.stringOfPages) {
        $scope.loading = true;
        $scope.baseFilters.page++;
        $scope.loadPage();
      }
    };

    $scope.previousPage = function() {
      if($scope.baseFilters.page > 1) {
        $scope.loading = true;
        $scope.baseFilters.page--;
        $scope.loadPage();
      }
    };

});

