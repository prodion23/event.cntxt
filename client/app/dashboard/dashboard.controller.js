'use strict'
angular.module('app.dashboard')
.controller('DashboardCtrl', ['$http', '$uibModal', DashboardCtrl]);

function DashboardCtrl($http, $uibModal){
    var vm = this;
    vm.openAddEventModal = openAddEventModal;


    function openAddEventModal() {
      var modalInstance = $uibModal.open({
                  templateUrl: '/app/dashboard/addEventModal.html',
                  controller: 'AddEventController',
                  backdrop: 'true',
                  controllerAs: 'addEventModalCtrl'
       });
    }
}
