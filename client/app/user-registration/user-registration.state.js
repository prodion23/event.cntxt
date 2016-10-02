'use strict';
angular.module('app.user-registration')
.config(function($stateProvider){
    $stateProvider
        .state('user-registration', {
            url: '/user-registration/:eventKey',
            templateUrl: 'app/user-registration/user-registration.html',
            controller: 'UserRegistrationCtrl',
            controllerAs: 'userRegistrationCtrl'
        })
        .state('user-registration-success', {
            url: '/user-registration-success',
            templateUrl: 'app/user-registration/user-registration-success.html'
        })
})
