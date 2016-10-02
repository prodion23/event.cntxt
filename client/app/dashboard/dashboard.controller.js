'use strict'
angular.module('app.dashboard')
.controller('DashboardCtrl', ['$http', '$uibModal', DashboardCtrl]);

function DashboardCtrl($http, $uibModal){
    var vm = this;
    vm.openAddEventModal = openAddEventModal;
    vm.openAddBeaconModal = openAddBeaconModal;

    function openAddEventModal() {
      var modalInstance = $uibModal.open({
                  templateUrl: '/app/dashboard/addEventModal.html',
                  controller: 'AddEventController',
                  backdrop: 'false',
                  controllerAs: 'addEventModalCtrl'
       });
    }

    function openAddBeaconModal() {
      var modalInstance = $uibModal.open({
                  templateUrl: '/app/dashboard/addBeaconModal.html',
                  controller: 'AddBeaconController',
                  backdrop: 'false',
                  controllerAs: 'addBeaconModalCtrl'
       });
    }
}
