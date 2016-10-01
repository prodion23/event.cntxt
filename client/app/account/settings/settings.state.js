'use strict';
angular.module('app.settings')
.config(function ($stateProvider) {
  $stateProvider
  .state('settings', {
    url: '/settings',
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsCtrl',
    controllerAs: 'settingsCtrl',
    authenticate: true
  });
 })
