angular.module('tucargaApp')
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
.filter('noHTML', function () {
    return function(text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;');
    }
});

