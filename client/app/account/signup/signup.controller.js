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
          if(form.$valid) {
           firebaseService.auth().createUserWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
          		  var errorCode = error.code;
          		  var errorMessage = error.message;
          	});

          	var user = firebaseService.auth().currentUser;
          	if(user){
          	  $state.go('dashboard');
          	}
          }
      }

      function loginOauth(provider){
           $window.location.href = '/auth/' + provider;
      }

  }
