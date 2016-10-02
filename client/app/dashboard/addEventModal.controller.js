'use strict'
angular.module('app.dashboard')
.controller('AddEventController', ['$http', '$uibModal', '$uibModalInstance', 'firebaseService', AddEventController]);

function AddEventController($http, $uibModal, $uibModalInstance, firebaseService){
    var vm = this;
    vm.event = {};
    vm.addEvent = addEvent;
    vm.beacons = ['beacon1', 'beacon2', 'beacon3'];
    console.log("USER ", firebaseService.auth().currentUser);

    function addEvent() {

      console.log("EVENT: ", vm.event);
      firebaseService.database().ref('events/').push({
          name: vm.event.name,
          address: vm.event.address,
          datetime: vm.event.datetime.toString(),
          beacon: vm.event.beacon,
          creator : firebaseService.auth().currentUser.uid
        });

      $uibModalInstance.dismiss();

    }

}
