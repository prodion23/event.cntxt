'use strict'
angular.module('app.dashboard')
.controller('AddEventController', ['$http', '$uibModal', '$uibModalInstance', 'firebaseService', AddEventController]);

function AddEventController($http, $uibModal, $uibModalInstance, firebaseService){
    var vm = this;
    vm.event = {};
    vm.addEvent = addEvent;
    vm.beacons = [];

    getUserBeacons();
    function addEvent() {

      firebaseService.database().ref('events/').push({
          name: vm.event.name,
          address: vm.event.address,
          datetime: vm.event.datetime.toString(),
          beacon: vm.event.beacon,
          creator : firebaseService.auth().currentUser.uid
        });

      $uibModalInstance.dismiss();

    }

    function getUserBeacons(){
        var userId = firebaseService.auth().currentUser.uid;
        firebaseService.database().ref('beacons').orderByChild('creator').startAt(userId).endAt(userId).on('child_added', function(data){
            var beacon = data.val();
            beacon.key = data.key;
            vm.beacons.push(beacon);
        });
    }

}
