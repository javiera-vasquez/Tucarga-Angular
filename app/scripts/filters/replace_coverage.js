angular.module('tucargaApp')
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
.filter('replace', function() {
    // s = "Sur,Centro - Sur,Norte,Centro - Norte,RM-Metropolitana de Santiago,Sur Extremo,Centro,Centro - Sur Extremo";
    return function(text) {
      return '<span>'+String(text).replace(/,/g, '</span><span>')+'</span>'
    }
});


