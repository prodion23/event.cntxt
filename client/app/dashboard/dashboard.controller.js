'use strict'
angular.module('app.dashboard')
.controller('DashboardCtrl', ['$http', '$uibModal','firebaseService', '$scope', DashboardCtrl]);

function DashboardCtrl($http, $uibModal, firebaseService, $scope){
    var vm = this;
    vm.openAddEventModal = openAddEventModal;
    vm.events = [];
    vm.openAddBeaconModal = openAddBeaconModal;

    function openAddEventModal() {
      var modalInstance = $uibModal.open({
                  templateUrl: '/app/dashboard/addEventModal.html',
                  controller: 'AddEventController',
                  backdrop: 'false',
                  controllerAs: 'addEventModalCtrl'
       });
    }

    function getUserEvents(){
        var userId = firebaseService.auth().currentUser.uid;
        firebaseService.database().ref('events').orderByChild('creator').startAt(userId).endAt(userId).on('child_added', function(data){
            vm.events.push(data.val());
            console.log(data.val());
            $scope.$apply();
        });
    }

    firebaseService.auth().onAuthStateChanged(function(user) {
        if (user) {
            getUserEvents();
        } else {
          // No user is signed in.
        }
      });
    function openAddBeaconModal() {
      var modalInstance = $uibModal.open({
                  templateUrl: '/app/dashboard/addBeaconModal.html',
                  controller: 'AddBeaconController',
                  backdrop: 'false',
                  controllerAs: 'addBeaconModalCtrl'
       });
    }
}
