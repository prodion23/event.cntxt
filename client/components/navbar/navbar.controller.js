'use strict';

angular.module('angularAppTemplateApp')
  .controller('NavbarCtrl', ['$state', 'firebaseService','$scope',NavbarCtrl]);

  function NavbarCtrl($state, firebaseService, $scope){
      var vm = this;
      vm.menu = [];

      vm.isCollapsed = true;

      if($state.current.url === "/dashboard") {
        vm.isDashboard = true;
      } else {
        vm.isDashboard = false;
      }

      console.log(vm.isDashboard);

      if(vm.currentUser === null)
        vm.isLoggedIn = false;
      else {
        vm.isLoggedIn = true;

        }

      vm.logout = logout;
      //vm.isActive = isActive;

      function logout(){
          firebaseService.auth().signOut().then(function() {
            $state.go("login");
          }, function(error) {
            console.log("ERROR LOGGING OUT");
          });
      }

      firebaseService.auth().onAuthStateChanged(function(user) {
          if (user) {
             vm.isLoggedIn = true;
             vm.email = user.email;
              $scope.$apply();
          } else {
            vm.isLoggedIn = false;
          }

        });

  }
