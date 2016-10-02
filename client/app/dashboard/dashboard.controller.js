'use strict'
angular.module('app.dashboard')
.controller('DashboardCtrl', ['$http', '$uibModal','firebaseService', '$scope', DashboardCtrl]);

function DashboardCtrl($http, $uibModal, firebaseService, $scope){
    var vm = this;
    vm.openAddEventModal = openAddEventModal;
    vm.events = [];
    vm.beacons = [];
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
                  backdrop: 'false',
                  controllerAs: 'addBeaconModalCtrl'
       });
    }

    function getUserEvents(){
        var userId = firebaseService.auth().currentUser.uid;
        firebaseService.database().ref('events').orderByChild('creator').startAt(userId).endAt(userId).on('child_added', function(data){
            var event = data.val();
            event.key = data.key;
            vm.events.push(event);
        });
    }

    function getUserBeacons(){
        var userId = firebaseService.auth().currentUser.uid;
        firebaseService.database().ref('beacons').orderByChild('creator').startAt(userId).endAt(userId).on('child_added', function(data){
            vm.beacons.push(data.val());
            $scope.$apply();
        });
    }

    firebaseService.auth().onAuthStateChanged(function(user) {
        if (user) {
            getUserEvents();
            getUserBeacons();
            $scope.$apply();
        } else {

        }
      });

}
