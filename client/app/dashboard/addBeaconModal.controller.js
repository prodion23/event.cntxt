'use strict'
angular.module('app.dashboard')
.controller('AddBeaconController', ['$http', '$uibModal', '$uibModalInstance', 'firebaseService', AddBeaconController]);

function AddBeaconController($http, $uibModal, $uibModalInstance, firebaseService){
    var vm = this;
    vm.beacon = {};
    vm.addBeacon = addBeacon;

    function addBeacon() {

      firebaseService.database().ref('beacons/').push({
          name: vm.beacon.name,
          uuid: vm.beacon.uuid,
          major: vm.beacon.major,
          minor: vm.beacon.minor,
          creator : firebaseService.auth().currentUser.uid
        });

      $uibModalInstance.dismiss();

    }

}
