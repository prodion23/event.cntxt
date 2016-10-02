'use strict';
angular.module('app.dashboard')
.config(function($stateProvider){
    $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dashboardCtrl'
    })
    .state('dashboard.events',{
          url: '/dashboard/events',
          templateUrl: '/app/dashboard/myEvents.html',
          controller: 'DashboardCtrl',
          controllerAs: 'dashboardCtrl'
    })
    .state('dashboard.beacons',{
          url: '/dashboard/beacons',
          templateUrl: '/app/dashboard/myBeacons.html',
          controller: 'DashboardCtrl',
          controllerAs: 'dashboardCtrl'
    })
    .state('event', {
      url: "/event/:eventId",
      templateUrl: '/app/dashboard/event.html',
      controller: 'EventCtrl',
      controllerAs: 'eventCtrl'
    })
})
