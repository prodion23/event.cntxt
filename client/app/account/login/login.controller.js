'use strict';

angular.module('app.login')
  .controller('LoginCtrl', ['$state','firebaseService', LoginCtrl]);

    function LoginCtrl($state, firebaseService){
        var vm = this;


        vm.user = {};
        vm.errors = {};

        vm.login = login;

        function login(form){
            vm.submitted = true;
            if(form.$valid) {
                firebaseService.auth().signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
		          var errorCode = error.code;
        		  var errorMessage = error.message;
        		});
                var user = firebaseService.auth().currentUser;
                if(user){
                    $state.go('dashboard');
                }
            }
        }

    }
