angular.module('tucargaApp')
    .filter('replace', function() {
        // s = "Sur,Centro - Sur,Norte,Centro - Norte,RM-Metropolitana de Santiago,Sur Extremo,Centro,Centro - Sur Extremo";
        return function(text) {
          return '<span class="tag">'+String(text).replace(/,/g, '</span><span class="tag">')+'</span>'
        }
    }
);


