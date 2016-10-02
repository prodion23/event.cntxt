'use strict'
angular.module('app.dashboard')
.controller('AddSiteController', ['$http', '$uibModal', '$uibModalInstance', 'firebaseService', '$stateParams', AddSiteController]);

function AddSiteController($http, $uibModal, $uibModalInstance, firebaseService, $stateParams){
    var vm = this;
    vm.site = {};
    vm.addSite = addSite;
    vm.beacons = [];

    getUserBeacons();
    function addSite() {

      firebaseService.database().ref('sites/').push({
          name: vm.site.name,
          location: vm.site.location,
          eventKey: $stateParams.eventId,
          beacon: vm.site.beacon
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
