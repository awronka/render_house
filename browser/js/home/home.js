/* global app */
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

'use strict';

app.controller('HomeController', function ($scope, RenderService, RecEngine) {

    $scope.changeModelUrl = function(newUrl){
    	RenderService.changeModelUrl(newUrl);
    }




});