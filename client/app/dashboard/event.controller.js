'use strict'
angular.module('app.dashboard')
.controller('EventCtrl', ['$stateParams', 'firebaseService', '$scope', '$uibModal', EventCtrl]);

function EventCtrl($stateParams, firebaseService, $scope, $uibModal){
    var vm = this;
    vm.sites = [];
    vm.checkIns = [];
    vm.checkInCount = 0;
    vm.eventKey = $stateParams.eventId;
    vm.openAddSiteModal = openAddSiteModal;
    vm.getEventSites = getEventSites;
    vm.getCheckInCount = getCheckInCount;
    vm.getTimes = getTimes;
    vm.earlyTime = "02 10 2016, 00:00";
    vm.latestTime = "02 10 2016, 13:23";

    firebaseService.database().ref('events/' + vm.eventKey).on('value', function(data){
         var event = data.val();
         vm.eventName = event.name;
         vm.eventBeacon = event.beacon;
         vm.eventLocation = event.address;
         vm.eventDateTime = event.datetime;
    });

    function getCheckInCount() {
      firebaseService.database().ref('checkIns').orderByChild("event").startAt(vm.eventKey).endAt(vm.eventKey).on('child_added', function(data){
                var checkIn = data.val();
                vm.checkInCount++;
                $scope.$apply();
      });

    }

    function getTimes() {
        console.log("CHECKING TIMES");
      firebaseService.database().ref('checkIns').orderByChild("event").startAt(vm.eventKey).endAt(vm.eventKey).limitToFirst(1).on('child_added', function(data){
                var checkIn = data.val();
                vm.earlyTime = checkIn.time;
      });

      firebaseService.database().ref('checkIns').orderByChild("event").limitToLast(1).on('child_added', function(data){
                var checkIn = data.val();
                vm.earlyTime = checkIn.time;
                $scope.$apply();
      });

    }

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
            getCheckInCount();
            getTimes();

        } else {

        }
      });
}
