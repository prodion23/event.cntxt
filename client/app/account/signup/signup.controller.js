'use strict';

angular.module('app.signup')
  .controller('SignupCtrl',['$location', '$state','firebaseService', SignupCtrl]);

  function SignupCtrl($location, $state, firebaseService){
      var vm = this;
      vm.user = {};
      vm.errors = {};

      vm.register = register;
      vm.loginOauth = loginOauth;

      function register(form){
          vm.submitted = true;
          console.log('form', form.$valid);
          if(form.$valid && vm.user.password === vm.user.passwordConfirm) {
           firebaseService.auth().createUserWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
          		  var errorCode = error.code;
          		  var errorMessage = error.message;
          	});
        }
    }

      firebaseService.auth().onAuthStateChanged(function(user) {
          if (user) {
              $state.go('dashboard');
          } else {
            // No user is signed in.
          }
        });

      function loginOauth(provider){
           $window.location.href = '/auth/' + provider;
      }

  }
