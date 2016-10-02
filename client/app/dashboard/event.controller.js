'use strict'
angular.module('app.dashboard')
.controller('EventCtrl', ['$stateParams', 'firebaseService', '$scope', EventCtrl]);

function EventCtrl($stateParams, firebaseService, $scope){
    var vm = this;
    vm.event = {};

    firebaseService.database().ref('events/' + $stateParams.eventId).on('value', function(data){
     console.log("DATA: ", data.val());
     var event = data.val();
     var key = data.key;
     vm.event.key = data.val();
     vm.eventName = event.name;
     vm.eventBeacon = event.beacon;
     vm.eventDateTime = event.datetime;
     console.log("NAME: ", vm.eventName);
     });


    console.log($stateParams.eventId);

}
