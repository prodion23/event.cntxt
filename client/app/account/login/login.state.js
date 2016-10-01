'use strict';
angular.module('app.login')
.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/account/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
  })
 })
