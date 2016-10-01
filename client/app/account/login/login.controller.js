'use strict';

angular.module('app.login')
  .controller('LoginCtrl', ['Auth', '$location', '$window','$firebase','firebaseService', LoginCtrl]);

    function LoginCtrl(Auth, $location, $window, $firebase, firebaseService){
        var vm = this;
        firebaseService.auth().createUserWithEmailAndPassword('$scope.email@asdfasfd.com',' $scope.password').catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		});

        vm.user = {};
        vm.errors = {};

        vm.login = login;
        vm.loginOauth = loginOauth;

        function login(form){
            vm.submitted = true;

            if(form.$valid) {
              Auth.login({
                email: vm.user.email,
                password: vm.user.password
              })
              .then( function() {
                // Logged in, redirect to home
                $location.path('/');
              })
              .catch( function(err) {
                vm.errors.other = err.message;
              });
            }
        }

        function loginOauth(provider){
              $window.location.href = '/auth/' + provider;
        }

    }
