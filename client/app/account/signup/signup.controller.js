'use strict';

angular.module('app.signup')
  .controller('SignupCtrl',['Auth', '$location', '$window', SignupCtrl]);

  function SignupCtrl(Auth, $location, $window){
      var vm = this;
      vm.user = {};
      vm.errors = {};

      vm.register = register;
      vm.loginOauth = loginOauth;

      function register(form){
          vm.submitted = true;
          if(form.$valid) {
            Auth.createUser({
              name: vm.user.name,
              email: vm.user.email,
              password: vm.user.password
            })
            .then( function() {
              // Account created, redirect to home
              $location.path('/');
            })
            .catch( function(err) {
              err = err.data;
              vm.errors = {};

              // Update validity of form fields that match the sql errors
              angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('sql', false);
                vm.errors[field] = error.message;
              });
            });
          }
      }

      function loginOauth(provider){
           $window.location.href = '/auth/' + provider;
      }

  }
