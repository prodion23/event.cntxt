'use strict'
angular.module('app.dashboard')
.controller('EventCtrl', ['$stateParams', 'firebaseService', '$scope', '$uibModal', EventCtrl]);

function EventCtrl($stateParams, firebaseService, $scope, $uibModal){
    var vm = this;
    vm.sites = [];
    vm.eventKey = $stateParams.eventId;
    vm.openAddSiteModal = openAddSiteModal;
    vm.getEventSites = getEventSites;

    firebaseService.database().ref('events/' + vm.eventKey).on('value', function(data){
         var event = data.val();
         vm.eventName = event.name;
         vm.eventBeacon = event.beacon;
         vm.eventLocation = event.address;
         vm.eventDateTime = event.datetime;
    });

    function openAddSiteModal() {
       var modalInstance = $uibModal.open({
          templateUrl: '/app/dashboard/addSiteModal.html',
          controller: 'AddSiteController',
          backdrop: 'false',
          controllerAs: 'addSiteModalCtrl'
       });
    }

    function getEventSites(){
        firebaseService.database().ref('sites').orderByChild("eventKey").startAt(vm.eventKey).endAt(vm.eventKey).on('child_added', function(data){
            var site = data.val();
            console.log("SITE: ", site);
            site.key = data.key;
            vm.sites.push(site);
              $scope.$apply();
        });
    }

    firebaseService.auth().onAuthStateChanged(function(user) {
        if (user) {
            getEventSites();

        } else {

        }
      });
}
