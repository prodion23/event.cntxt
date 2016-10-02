'use strict';
angular.module('app.user-registration')
.controller('UserRegistrationCtrl', ['$stateParams','$state','firebaseService',UserRegistrationCtrl]);

function UserRegistrationCtrl($stateParams,$state, firebaseService){
    var vm = this;
    vm.eventKey = $stateParams.eventKey;
    vm.registration = {};
    vm.submit = submit;

    function submit(form){
        if(form.$valid){
            firebaseService.database().ref('registration/').push({
                event: vm.eventKey,
                name: vm.registration.name,
                email: vm.registration.email,
                phone: vm.registration.phone
              });

              $state.go('user-registration-success');
        }
    }
}
